import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Cheese from '../assets/images/Cheese.jpg'; // Placeholder image if needed
import GreyHeart from '../assets/images/heart.png';
import RedHeart from '../assets/images/redheart.png';
import {Rating} from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {ToastProvider} from 'react-native-toast-message';
import NoImage from '../assets/images/Noproduct.jpg';
import axios from 'axios';

const ViewProducts = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {product} = route.params;
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          'https://lunarsenterprises.com:6009/fishapp/view-product',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({p_id: product.p_id}),
          },
        );
        const data = await response.json();
        if (data.result) {
          const productData = data.list[0];
          setProductDetails(productData);
          setSimilarProducts(data.similar);

          // Check AsyncStorage for favorite status
          const storedFavorite = await AsyncStorage.getItem(
            `favorite_${productData.p_id}`,
          );
          setIsFavorite(storedFavorite === '1' || productData.fav === 1);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [product.p_id]);

  const handleQuantityChange = type => {
    setQuantity(prev =>
      type === 'increase' ? prev + 1 : prev > 1 ? prev - 1 : prev,
    );
  };

  const toggleDescription = () => {
    setIsExpanded(prev => !prev);
  };

  const handleAddToCart = async () => {
    const userId = await AsyncStorage.getItem('u_id');

    try {
      const response = await fetch(
        'https://lunarsenterprises.com:6009/fishapp/add/cart',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            u_id: userId,
            p_id: productDetails.p_id,
            quantity: quantity,
          }),
        },
      );
      const data = await response.json();

      if (data.result) {
        navigation.navigate('Cart', {
          quantity: quantity,
          p_id: productDetails.p_id,
          u_id: userId,
        });

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: data.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add product to cart',
      });
    }
  };

  const toggleFavorite = async () => {
    const storedUserId = await AsyncStorage.getItem('u_id');
    const favValue = isFavorite ? 0 : 1;

    try {
      setIsFavorite(prev => !prev);
      const Dataz = await AsyncStorage.setItem(
        `favorite_${productDetails.p_id}`,
        favValue.toString(),
      );

      const response = await axios.post(
        'https://lunarsenterprises.com:6009/fishapp/add/fav',
        {
          fav: favValue,
          user_id: storedUserId,
          p_id: productDetails.p_id,
        },
      );

      if (!response.data.result) {
        setIsFavorite(prev => !prev); // Revert on error
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.data.message || 'Failed to update favorite status.',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: response.data.message,
        });
      }
    } catch (error) {
      setIsFavorite(prev => !prev); // Revert on error
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Could not update favorite status. Please try again.',
      });
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#213E60" style={styles.loader} />
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image
          source={
            productDetails.p_image
              ? {
                  uri: `https://lunarsenterprises.com:6009/${productDetails.p_image}`,
                }
              : NoImage
          }
          style={styles.productImage}
        />
        <TouchableOpacity onPress={toggleFavorite} style={styles.heartIcon}>
          <Image
            source={isFavorite ? RedHeart : GreyHeart}
            style={styles.heartImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{productDetails.p_name}</Text>
      </View>

      <View style={styles.priceDescriptionContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>
            Rs. {productDetails.p_orgianl_price}
          </Text>
          <Text style={styles.discountedPrice}>
            Rs. {productDetails.p_discount_price.toFixed(2)}
          </Text>
        </View>
        <Text style={styles.productDescription}>
          {isExpanded
            ? productDetails.p_description
            : productDetails.p_description.slice(0, 100) + '...'}
        </Text>
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.seeMoreText}>
            {isExpanded ? 'See Less' : 'See More'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quantityCartContainer}>
        <View style={styles.quantityCard}>
          <View style={styles.quantitySelector}>
            <TouchableOpacity onPress={() => handleQuantityChange('decrease')}>
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => handleQuantityChange('increase')}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.similarProductContainer}>
        <Text style={styles.similarProductTitle}>Similar Products</Text>
      </View>

      {similarProducts.length === 0 ? (
        <Text style={styles.noItemsText}>No items in cart</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.similarProducts}>
          {similarProducts?.map((product, index) => (
            <View key={index} style={styles.similarProductItem}>
              <Image
                source={{
                  uri: `https://lunarsenterprises.com:6009/${product.p_image}`,
                }}
                style={styles.similarProductImage}
              />
              <Text style={styles.similarProductName}>{product.p_name}</Text>
              <Text style={styles.similarProductPrice}>
                Rs. {product.p_discount_price.toFixed(2)}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 20,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'center',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  heartImage: {
    width: 30,
    height: 30,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  productTitle: {
    fontSize: 24,
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: '#000',
  },
  priceDescriptionContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#808080',
    marginRight: 10,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'serif',
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'serif',
    color: '#454545',
  },
  productDescription: {
    marginVertical: 10,
    color: '#808080',
    fontFamily: 'serif',
    fontSize: 15,
  },
  seeMoreText: {
    color: '#213E60',
  },
  quantityCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  quantityCard: {
    backgroundColor: '#F3F3F3',
    borderRadius: 5,
    padding: 5,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  counterButton: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#213E60',
    paddingHorizontal: 10,
    fontFamily: 'serif',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#000',
  },
  addToCartButton: {
    backgroundColor: '#213E60',
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  similarProductContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  similarProductTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#000',
  },
  similarProducts: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  similarProductItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  similarProductImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 60,
  },
  similarProductName: {
    fontSize: 13,
    // fontWeight: "bold",
    tintColor: '#000',
    marginTop: 5,
    fontFamily: 'serif',

    color: '#000',
    textAlign: 'center',
  },
  similarProductPrice: {
    fontSize: 14,
    color: '#808080',
    fontFamily: 'serif',
  },
  noItemsText: {
    textAlign: 'center',
    color: '#808080',
    marginTop: 20,
    fontFamily: 'serif',
    fontSize: 14,
  },
});

export default ViewProducts;

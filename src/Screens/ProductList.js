import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import NoImage from '../assets/images/Noproduct.jpg';

const ProductList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {categoryId} = route.params;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://lunarsenterprises.com:6009/fishapp/list/products',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({c_id: categoryId}),
          },
        );
        const data = await response.json();
        if (data.result && data.list) {
          const productList = data.list[0][Object.keys(data.list[0])[0]] || [];
          setProducts(productList);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ViewProducts', {product: item})}>
      <Image
        source={
          item.p_image
            ? {uri: `https://lunarsenterprises.com:6009/${item.p_image}`}
            : NoImage
        }
        style={styles.image}
      />
      <Text style={styles.name}>{item.p_name}</Text>
      <Text style={styles.oldPrice}>Rs. {item.p_orgianl_price}</Text>
      <Text style={styles.price}>
        Rs. {item.p_discount_price ? item.p_discount_price.toFixed(2) : 'N/A'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : products.length === 0 ? (
        <Text style={styles.noProductsText}>No Products Available</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.p_id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    elevation: 2,
    padding: 16,
    marginBottom: 20,
    marginHorizontal: 8,
    alignItems: 'center',
    width: '45%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontFamily: 'serif',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  oldPrice: {
    fontSize: 14,
    fontFamily: 'serif',
    textDecorationLine: 'line-through',
    color: '#a5a5a5',
    marginBottom: 2,
  },
  price: {
    fontSize: 18,
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: '#000',
  },
  noProductsText: {
    fontSize: 18,
    fontFamily: 'serif',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
});

export default ProductList;

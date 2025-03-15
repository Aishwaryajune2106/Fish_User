import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import NoImage from '../assets/images/Noproduct.jpg';
import RedHeartIcon from '../assets/images/redheart.png';
import HeartIcon from '../assets/images/heart.png';

const API_URL = 'https://lunarsenterprises.com:6009/fishapp/list/fav';
const IMAGE_BASE_URL = 'https://lunarsenterprises.com'; // Adjust this if needed

const Favourites = () => {
  const [likedItems, setLikedItems] = useState({});
  const [foodItems, setFoodItems] = useState([]);

  // Fetch favorite items from API
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: 6}),
      });
      const result = await response.json();
      if (result.result) {
        const items = result?.data?.map(item => ({
          id: item.p_id.toString(),
          name: item.p_name,
          price: item.p_discount_price,
          oldPrice: item.p_orgianl_price,
          image: `https://lunarsenterprises.com:6009/${item.p_image}`, // Set full URL for images
        }));
        setFoodItems(items);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            item.image && typeof item.image === 'string' ? item.image : NoImage,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.oldPrice}>${item.oldPrice}</Text>
      <Text style={styles.price}>${parseFloat(item.price).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={foodItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
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
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#213E60',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 6,
    elevation: 3,
  },
  heartImage: {width: 20, height: 20},
});

export default Favourites;

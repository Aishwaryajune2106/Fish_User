import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Veg from "../assets/images/Veg.jpg";
import Banner from "../assets/images/banner.jpeg";
import HeartIcon from "../assets/images/heart.png";
import NoImage from "../assets/images/Noproduct.jpg";
import RedHeartIcon from "../assets/images/redheart.png";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [likedItems, setLikedItems] = useState({});
  const [categories, setCategories] = useState([]);``
  const [productCategories, setProductCategories] = useState({});

  useEffect(() => {
    if (isFocused) {
      const fetchCategories = async () => {
        try {
          const response = await axios.post(
            "https://lunarsenterprises.com:6014/ajwa/list/category"
          );
          if (response.data.result) {
            setCategories(response.data.list);
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

      const fetchProducts = async () => {
        try {
          const response = await axios.post(
            "https://lunarsenterprises.com:6014/ajwa/list/products",
            {}
          );
          if (response.data.result) {
            const categoryProducts = {};
            response.data.list.forEach((item) => {
              Object.keys(item).forEach((key) => {
                if (item[key].length > 0) {
                  categoryProducts[key] = item[key].slice(0, 2); // Limit to first 2 items in each category
                }
              });
            });
            setProductCategories(categoryProducts);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchCategories();
      fetchProducts();
    }
  }, [isFocused]);

  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        {/* <TextInput
          placeholder="Search keywords..."
          style={styles.searchInput}
        /> */}
      </View>

      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <Image source={Banner} style={styles.bannerImage} />
      </View>

      {/* Categories Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Category")}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Category", { categoryId: item.c_id })
            }
            style={styles.categoryContainer}
          >
            <Image
              source={
                item.c_image
                  ? {
                      uri: `https://lunarsenterprises.com:6014/${item.c_image}`,
                    }
                  : NoImage
              }
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{item.c_name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.c_id.toString()}
        showsHorizontalScrollIndicator={false}
      />

   
      {/* Dynamic Product Sections */}
      {Object.keys(productCategories)?.map((category, index) => (
        <View key={index}>
          <View style={styles.sectionHeader}>
            <Text style={styles.subsectionTitle}>{category}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Category", { categoryId: category })
              }
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productContainer}>
            {productCategories[category]?.map((product) => (
              <View key={product.p_id} style={styles.productCard}>
                <Image
                  source={
                    product.p_image
                      ? {
                          uri: `https://lunarsenterprises.com:6014/${product.p_image}`,
                        }
                      : NoImage
                  }
                  style={styles.productImage}
                />
                <Text style={styles.productName}>{product.p_name}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.oldPrice}>
                    Rs. {product.p_orgianl_price}
                  </Text>
                  <Text style={styles.newPrice}>
                    Rs. {product.p_discount_price}
                  </Text>
                </View>
                {/* <TouchableOpacity
                  onPress={() => toggleLike(product.p_id)}
                  style={styles.heartButton}
                >
                  <Image
                    source={likedItems[product.p_id] ? RedHeartIcon : HeartIcon}
                    style={styles.heartImage}
                  />
                </TouchableOpacity> */}
              </View>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff" },
  spacer: { height: 50 },
  searchContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  searchInput: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  bannerContainer: { marginVertical: 16, alignItems: "center" },
  bannerImage: {
    width: "90%",
    height: 160,
    borderRadius: 10,
    resizeMode: "cover",
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#333",
    fontFamily: "serif",
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#333",
    fontFamily: "serif",
    fontWeight: "600",
  },
  seeAll: { fontSize: 14, color: "#007BFF", fontFamily: "serif" },
  categoryContainer: { alignItems: "center", marginHorizontal: 8, padding: 8 },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 30,
    marginBottom: 8,
    elevation: 2,
  },
  categoryText: {
    fontSize: 13,
    color: "#555",
    fontFamily: "serif",
    marginTop: -3,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
    fontFamily: "serif",
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
    color: "#999",
    fontFamily: "serif",
    marginRight: 8,
  },
  newPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily: "serif",
  },
  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 6,
    elevation: 3,
  },
  heartImage: { width: 20, height: 20 },
});

export default Home;

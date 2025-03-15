import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import NoImage from "../assets/images/Noproduct.jpg";

const Category = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(
          "https://lunarsenterprises.com:6009/fishapp/list/category",
          {}
        );
        if (response.data.result) {
          setCategories(response.data.list);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCategories();
  }, []);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() =>
        navigation.navigate("ProductList", { categoryId: item.c_id })
      }
    >
      <Image
        source={
          item.c_image
            ? { uri: `https://lunarsenterprises.com:6009/${item.c_image}` }
            : NoImage
        }
        style={styles.categoryImage}
      />
      <Text style={styles.categoryText}>{item.c_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={styles.loader} />
      ) : categories.length === 0 ? (
        <Text style={styles.noCategoriesText}>No Categories Available</Text>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.c_id.toString()}
          numColumns={3}
          contentContainerStyle={styles.categoryList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
    flex: 1, // Ensures full height of the screen
    justifyContent: "center", // Center loader and message vertically
  },
  loader: {
    alignSelf: "center",
  },
  noCategoriesText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#333",
    fontFamily: "serif",
  },
  categoryList: {
    paddingBottom: 20,
  },
  categoryItem: {
    width: "28%",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "serif",
    color: "#333",
    textAlign: "center",
  },
});

export default Category;

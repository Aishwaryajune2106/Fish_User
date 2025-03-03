import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import AjwaLogo from "../assets/images/ajwacolorlogo.png"; // Replace with your logo path
import FreshProduce from "../assets/images/freshstore.jpg"; // Replace with your image path
import StoreInterior from "../assets/images/store_interior.jpg"; // Replace with your image path

const Myaddress = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Supermarket Logo */}
      <View style={styles.logoContainer}>
        <Image source={AjwaLogo} style={styles.logo} />
      </View>

      {/* Description Section */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>Welcome to Ajwa Supermarket</Text>
        <Text style={styles.description}>
          At Ajwa Supermarket, we are dedicated to providing you with the finest
          quality products and exceptional customer service. Our supermarket is
          your one-stop shop for fresh produce, groceries, household essentials,
          and much more. We believe in serving our community with the best
          products at affordable prices.
        </Text>

        <Text style={styles.subtitle}>Our Vision</Text>
        <Text style={styles.description}>
          To be the leading supermarket in the region, known for our quality,
          variety, and customer satisfaction. We aim to create a shopping
          experience that brings joy and convenience to our customers' lives.
        </Text>

        <Text style={styles.subtitle}>Our Commitment</Text>
        <Text style={styles.description}>
          We are committed to sourcing the freshest products and offering a wide
          range of items to cater to your everyday needs. Your satisfaction is
          our priority!
        </Text>
      </View>

      {/* Image Gallery */}
      <View style={styles.imageGallery}>
        <Image source={FreshProduce} style={styles.image} />
        <Image source={StoreInterior} style={styles.image} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
    // paddingBottom:100
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 90,
    resizeMode: "contain",
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2B2B2B",
    textAlign: "center",
    fontFamily: "serif",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2B2B2B",
    marginTop: 20,
    fontFamily: "serif",
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginTop: 10,
    fontFamily: "serif",
  },
  imageGallery: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 20,
  },
  image: {
    width: "48%",
    height: 200,
    borderRadius: 10,
    marginBottom: 100,
  },
});

export default Myaddress;

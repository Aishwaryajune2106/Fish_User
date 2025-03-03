import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

// Import your icons from assets
import Backarrow from "../assets/images/backarrow.png"; // Update the path based on your folder structure
import CartIcon from "../assets/images/cartimg.png"; // Update the path for your cart icon

const CartHeader = ({ title, navigation, totalItems }) => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={Backarrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          style={styles.cartButton}
        >
          <View style={styles.cartIconContainer}>
            <Image source={CartIcon} style={styles.cartIcon} />
            {totalItems > 0 && (
              <View style={styles.itemCountContainer}>
                <Text style={styles.itemCountText}>{totalItems}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  
  const styles = StyleSheet.create({
    header: {
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      backgroundColor: "#fff",
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      justifyContent: "space-between",
    },
    backButton: {
      marginRight: 16,
    },
    backIcon: {
      width: 24,
      height: 24,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      fontFamily: "serif",
    },
    cartButton: {
      marginLeft: 16,
    },
    cartIcon: {
      width: 24,
      height: 24,
    },
    cartIconContainer: {
      position: "relative",
    },
    itemCountContainer: {
      position: "absolute",
      right: -5,
      top: -5,
      backgroundColor: "#FF0000",
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    itemCountText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "bold",
    },
  });
  
  export default CartHeader;

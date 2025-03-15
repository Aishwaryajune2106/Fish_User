import React, { useState, useEffect, useCallback } from "react";

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Trash from "../assets/images/trash.png";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoImage from "../assets/images/Noproduct.jpg";
import { useAppContext } from "../Context/AppContext";


const Cart = () => {
  const navigation = useNavigation();
  const { state, setState } = useAppContext(); // Access context state

  
  const [cartItems, setCartItems] = useState([]);
  const deliveryFee = 40;

  useFocusEffect(
    useCallback(() => {
      const fetchCartItems = async () => {
        try {
          const userId = await AsyncStorage.getItem("u_id");
          const response = await fetch(
            "https://lunarsenterprises.com:6009/fishapp/list/cart",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ u_id: userId }),
            }
          );
          const data = await response.json();
          if (data.result) {
            setCartItems(data.list);
          } else {
            console.error("Failed to retrieve cart items:", data.message);
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };

      fetchCartItems();
    }, [])
  );

  // Update subtotal and context state whenever cartItems changes
  useEffect(() => {
    const subTotal = cartItems.reduce(
      (sum, item) => sum + item.p_discount_price * item.ct_quantity,
      0
    );
    const totalPrice = subTotal + deliveryFee;

    // Update context with new values
    setState({
      ...state,
      quantity: cartItems.reduce((sum, item) => sum + item.ct_quantity, 0),
      subTotal,
      deliveryFee,
      totalPrice,
      products: cartItems.map((item) => ({
        name: item.p_name,
        quantity: item.ct_quantity,
        price: item.p_discount_price.toFixed(2),
        id : item.p_id
      })),
    });
  }, [cartItems, setState]);

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.ct_id === id
          ? { ...item, ct_quantity: item.ct_quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.ct_id === id && item.ct_quantity > 1
          ? { ...item, ct_quantity: item.ct_quantity - 1 }
          : item
      )
    );
  };

  const DeleteCartItem = async (id) => {
    try {
      const response = await fetch(
        "https://lunarsenterprises.com:6009/fishapp/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ct_id: id }),
        }
      );
      const data = await response.json();
      if (data.result) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.ct_id !== id)
        );
      } else {
        console.error("Failed to delete cart item:", data.message);
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={
          item.p_image
            ? { uri: `https://lunarsenterprises.com:6009/${item.p_image}` }
            : NoImage
        }
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.p_name}</Text>
        <Text style={styles.price}>Rs. {item.p_discount_price.toFixed(2)}</Text>
        <View style={styles.quantitySelector}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.ct_id)}>
            <Text style={styles.counterButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.ct_quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.ct_id)}>
            <Text style={styles.counterButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => DeleteCartItem(item.ct_id)}>
        <Image source={Trash} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.ct_id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.footer}>
        <View style={styles.row}>
          <Text style={styles.label}>Sub-total</Text>
          <Text style={styles.value}>Rs. {state.subTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Delivery-fee</Text>
          <Text style={styles.value}>Rs. {state.deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total-Price</Text>
          <Text style={styles.totalValue}>
            Rs. {state.totalPrice.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() =>
            navigation.navigate("Address", {
              quantity: state.quantity,
              subTotal: state.subTotal,
              deliveryFee: state.deliveryFee,
              totalPrice: state.totalPrice,
              products: state.products,
            })
          }
        >
          <Text style={styles.checkoutText}>Check out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  listContainer: { padding: 16, paddingBottom: "50%" },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  image: { width: 60, height: 60, borderRadius: 10 },
  details: { flex: 1, marginLeft: 16 },
  name: { fontSize: 16, fontWeight: "600", color: "#333", fontFamily: "serif" },
  price: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginVertical: 4,
    fontFamily: "serif",
  },
  quantitySelector: { flexDirection: "row", alignItems: "center" },
  counterButton: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#213E60",
    backgroundColor: "#F0F0F0",
    fontFamily: "serif",
    paddingHorizontal: 10,
  },
  quantityText: { fontSize: 20, marginHorizontal: 10, fontFamily: "serif" },
  deleteIcon: { width: 20, height: 20 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 65,
    backgroundColor: "#FFF",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: { fontSize: 14, color: "#888", fontFamily: "serif" },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    fontFamily: "serif",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "serif",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "serif",
  },
  checkoutButton: {
    backgroundColor: "#213E60",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },
  checkoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "serif",
  },
});

export default Cart;

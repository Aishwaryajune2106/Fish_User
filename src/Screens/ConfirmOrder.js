import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import Location from "../assets/images/location.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../Context/AppContext";

const ConfirmOrder = () => {
  const navigation = useNavigation();
  const { state } = useAppContext(); // Accessing context state

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");
  const [modalVisible, setModalVisible] = useState(false);
  const [orderStatus, setOrderStatus] = useState("success");

  const { deliveryFee, products, subTotal, totalPrice } = state;

  const handleConfirmOrder = async () => {
    const username = await AsyncStorage.getItem("name");
    const usermobile = await AsyncStorage.getItem("mobile");
    const userId = await AsyncStorage.getItem("u_id");

    const orderData = {
      amount: totalPrice,
      payment_method:
        selectedPaymentMethod === "COD" ? "cash on delivery" : "online",
      u_id: userId,
      user_name: username,
      user_email: "aishwaryalunar@gmail.com",
      user_mobile_no: usermobile,
      user_address: state.selectedAddress?.address,
      user_city: state.selectedAddress?.city,
      user_zipcode: state.selectedAddress?.pincode,
      product_details: products?.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
      })),
    };
   

    try {
      const response = await axios.post(
        "https://lunarsenterprises.com:6014/ajwa/add/order",
        orderData
      );
      const { result } = response.data;

      if (result) {
        setOrderStatus("success");
      } else {
        setOrderStatus("fail");
      }
      setModalVisible(true);
    } catch (error) {
      setOrderStatus("fail");
      setModalVisible(true);
      console.error("Order confirmation error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {products?.map((item, index) => (
          <View key={index} style={styles.productContainer}>
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>
                ₹{item.price} x {item.quantity}
              </Text>
            </View>
            <Text style={styles.totalItemPrice}>
              ₹{(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}

        <View style={styles.priceSummary}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Charge</Text>
            <Text style={styles.priceValue}>₹{deliveryFee}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Total Price</Text>
            <Text style={styles.totalPrice}>₹{totalPrice}</Text>
          </View>
        </View>

        <View style={styles.addressContainer}>
          <Image source={Location} style={styles.locationIcon} />
          <Text style={styles.addressText}>
            Deliver to: {state.selectedAddress?.address},{" "}
            {state.selectedAddress?.city} - {state.selectedAddress?.pincode}
          </Text>
        </View>

        <Text style={styles.paymentTitle}>Payment Method</Text>
        <RadioButton.Group
          onValueChange={(value) => setSelectedPaymentMethod(value)}
          value={selectedPaymentMethod}
        >
          <View style={styles.radioButtonContainer}>
            <RadioButton value="COD" color="#213E60" />
            <Text style={styles.radioButtonText}>Cash On Delivery</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton value="online" color="#213E60" />
            <Text style={styles.radioButtonText}>Online Payment</Text>
          </View>
        </RadioButton.Group>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
        >
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>
        <View style={{ marginBottom: 80 }}></View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              {orderStatus === "success"
                ? "Order Successful!"
                : "Order Failed!"}
            </Text>
            <Text style={styles.modalMessage}>
              {orderStatus === "success"
                ? "Your order has been confirmed successfully. Thank you for shopping with us!"
                : "There was an error confirming your order. Please try again later."}
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                // if (orderStatus === 'success') {
                //   navigation.navigate('HomeScreen');
                // }
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f7f8fa",
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    fontFamily: "serif",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: "serif",
    color: "#333",
    fontWeight: "500",
  },
  totalItemPrice: {
    fontSize: 18,
    fontFamily: "serif",
    fontWeight: "700",
    color: "#333",
  },
  priceSummary: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  priceLabel: {
    fontSize: 16,
    fontFamily: "serif",
    color: "#333",
  },
  priceValue: {
    fontSize: 16,
    fontFamily: "serif",
    color: "#333",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "serif",
    color: "#213E60",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
  },
  addressText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "serif",
    marginLeft: 8,
  },
  paymentTitle: {
    fontSize: 18,
    fontFamily: "serif",
    fontWeight: "600",
    color: "#333",
    marginVertical: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButtonText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "serif",
    marginLeft: 8,
  },
  confirmButton: {
    backgroundColor: "#213E60",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "serif",
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    fontFamily: "serif",
    color: "#333",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 16,
    fontFamily: "serif",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#213E60",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  noteInput: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
    marginBottom: 20,
  },
});

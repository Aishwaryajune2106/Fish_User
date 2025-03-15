import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Edit from "../assets/images/edit.png"; // Path to edit icon
import Trash from "../assets/images/trash.png"; // Path to trash icon
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useAppContext } from "../Context/AppContext";

const Address = ({ route }) => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [currentAddress, setCurrentAddress] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    zipcode: "",
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { state, setState } = useAppContext();
 
  
  
 

  // Fetch addresses
  const fetchAddresses = async () => {
    const userId = await AsyncStorage.getItem("u_id");
    

    try {
      const response = await fetch(
        "https://lunarsenterprises.com:6009/fishapp/list/address",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ u_id: userId }),
        }
      );
      const data = await response.json();
      

      if (data.result) {
        const formattedAddresses = data?.list?.map((item) => ({
          id: item.ua_id,
          name: item.ua_name,
          email: item.ua_email,
          address: item.ua_address,
          pincode: item.ua_zip_code.toString(),
          city: item.ua_city,
          phone: item.ua_mobile.toString(),
        }));
        setAddresses(formattedAddresses);

        if (formattedAddresses.length > 0) {
          setSelectedAddressId(formattedAddresses[0].id);
          setState((prevState) => ({
            ...prevState,
            selectedAddress: formattedAddresses[0],
          }));
        }
      } else {
        console.log("Failed to retrieve data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // Fetch addresses on focus
  useFocusEffect(
    React.useCallback(() => {
      fetchAddresses();
    }, [])
  );

  const handleEditToggle = (address) => {
    setIsEditing(isEditing ? null : address.id);
    setCurrentAddress({
      name: address.name,
      email: address.email,
      mobile: address.phone,
      address: address.address,
      city: address.city,
      zipcode: address.pincode,
    });
  };

  const handleUpdate = async (id) => {
    

    try {
      const response = await fetch(
        "https://lunarsenterprises.com:6009/fishapp/edit/address",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ua_id: id, ...currentAddress }),
        }
      );
      const data = await response.json();

      if (data.result) {
        const updatedAddresses = addresses?.map((addr) =>
          addr.id === id ? { ...addr, ...currentAddress } : addr
        );
        setAddresses(updatedAddresses);
        fetchAddresses();
        Toast.show({
          text1: "Address Updated",
          text2: data.message,
          type: "success",
        });
      } else {
        console.log("Failed to update address:", data.message);
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
    setIsEditing(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "https://lunarsenterprises.com:6009/fishapp/delete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ua_id: id }),
        }
      );
      const data = await response.json();

      if (data.result) {
        setAddresses(addresses.filter((address) => address.id !== id));
        Toast.show({
          text1: "Address Deleted",
          text2: "Your address has been successfully deleted!",
          type: "success",
        });
        if (selectedAddressId === id) {
          setSelectedAddressId(addresses.length > 1 ? addresses[1].id : null);
          setState((prevState) => ({
            ...prevState,
            selectedAddress: addresses.length > 1 ? addresses[1] : null,
          }));
        }
      } else {
        console.log("Failed to delete address:", data.message);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSelectAddress = (id) => {
    const selectedAddress = addresses.find((address) => address.id === id);
    setSelectedAddressId(id);
    setState((prevState) => ({
      ...prevState,
      selectedAddress,
    }));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: "auto" }}
    >
      {addresses?.map((address) => (
        <View key={address.id} style={styles.addressContainer}>
          <RadioButton
            value={address.id}
            status={selectedAddressId === address.id ? "checked" : "unchecked"}
            onPress={() => handleSelectAddress(address.id)}
          />
          <View style={styles.addressDetails}>
            {isEditing === address.id ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={"#333333"}
                  value={currentAddress.address}
                  onChangeText={(text) =>
                    setCurrentAddress({ ...currentAddress, address: text })
                  }
                  placeholder="Enter your address"
                />
                <TextInput
                  style={styles.input}
                  placeholderTextColor={"#333333"}
                  value={currentAddress.zipcode}
                  onChangeText={(text) =>
                    setCurrentAddress({ ...currentAddress, zipcode: text })
                  }
                  placeholder="Enter your pincode"
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholderTextColor={"#333333"}
                  value={currentAddress.city}
                  onChangeText={(text) =>
                    setCurrentAddress({ ...currentAddress, city: text })
                  }
                  placeholder="Enter your city"
                />
                <TextInput
                  style={styles.input}
                  placeholderTextColor={"#333333"}
                  value={currentAddress.mobile}
                  onChangeText={(text) =>
                    setCurrentAddress({ ...currentAddress, mobile: text })
                  }
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
                <TouchableOpacity
                  onPress={() => handleUpdate(address.id)}
                  style={styles.updateButton}
                >
                  <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.addressText}>Name: {address.name}</Text>
                <Text style={styles.addressText}>
                  Address: {address.address}
                </Text>
                <Text style={styles.addressText}>
                  Pincode: {address.pincode}
                </Text>
                <Text style={styles.addressText}>City: {address.city}</Text>
                <Text style={styles.addressText}>Phone: {address.phone}</Text>
                <TouchableOpacity
                  onPress={() => handleEditToggle(address)}
                  style={styles.editButton}
                >
                  <Image source={Edit} style={styles.editIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(address.id)}
                  style={styles.deleteButton}
                >
                  <Image source={Trash} style={styles.trashIcon} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addNewButton}
        onPress={() => navigation.navigate("NewAddress")}
      >
        <Text style={styles.addNewButtonText}>+ Add New Address</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.placeorderButton}
        onPress={() =>
          navigation.navigate("ConfirmOrder", {
            quantity: state.quantity, // Use state from context
            subTotal: state.subTotal,
            deliveryFee: state.deliveryFee,
            totalPrice: state.totalPrice,
            products: state.products,
            selectedAddress: state.selectedAddress, // Pass selected address from context
          })
        }
      >
        <Text style={styles.placeorderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 15,
  },
  addressDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addressText: {
    fontSize: 16,
    fontFamily: "serif",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  updateButton: {
    backgroundColor: "#213E60",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  editButton: {
    position: "absolute",
    right: 40,
    top: 15,
  },
  deleteButton: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  trashIcon: {
    width: 20,
    height: 20,
  },
  addNewButton: {
    backgroundColor: "#888",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  addNewButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  placeorderButton: {
    backgroundColor: "#213E60",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 10,
  },
  placeorderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "serif",
  },
});

export default Address;

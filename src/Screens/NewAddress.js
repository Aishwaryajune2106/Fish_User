import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message"; 

const NewAddress = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
  });
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    if (field === "phone" && value.length > 15) return;
    if (field === "phone" || field === "zipCode") {
      if (isNaN(value)) return;
    }
    setForm({
      ...form,
      [field]: value,
    });
    setErrors({
      ...errors,
      [field]: "", // Clear error as user types
    });
  };

  const validateForm = () => {
    const { name, email, phone, address, zipCode, city } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    if (!phone) newErrors.phone = "Phone number is required";
    else if (phone.length < 8)
      newErrors.phone = "Phone number must be at least 8 digits";
    if (!address) newErrors.address = "Address is required";
    if (!zipCode) newErrors.zipCode = "Zip code is required";
    else if (zipCode.length < 4)
      newErrors.zipCode = "Zip code must be at least 4 digits";
    if (!city) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //................Add Address Api..................//

  const handleNext = async () => {
    const userId = await AsyncStorage.getItem("u_id");
    if (validateForm()) {
      const addressData = {
        u_id: userId,
        name: form.name,
        email: form.email,
        mobile: form.phone,
        address: form.address,
        city: form.city,
        zipcode: form.zipCode,
      };

      try {
        const response = await fetch(
          "https://lunarsenterprises.com:6014/ajwa/add/address",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(addressData),
          }
        );

        const result = await response.json();

        if (result.result) {
          
          // Show success toast message
          Toast.show({
            text1: "Success",
            text2: result.message,
            type: "success",
          });
          // Navigate to the account page after successful address addition
          navigation.navigate("Address");
        } else {
         
          // Show error toast message
          Toast.show({
            text1: "Error",
            text2: result.message,
            type: "error",
          });
        }
      } catch (error) {
       
        // Show error toast message
        Toast.show({
          text1: "Error",
          text2: "An error occurred while adding the address.",
          type: "error",
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Form Fields */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(value) => handleChange("name", value)}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={form.phone}
        onChangeText={(value) => handleChange("phone", value)}
        keyboardType="phone-pad"
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={form.address}
        onChangeText={(value) => handleChange("address", value)}
      />
      {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        value={form.zipCode}
        onChangeText={(value) => handleChange("zipCode", value)}
        keyboardType="numeric"
      />
      {errors.zipCode && <Text style={styles.errorText}>{errors.zipCode}</Text>}

      <TextInput
        style={styles.input}
        placeholder="City"
        value={form.city}
        onChangeText={(value) => handleChange("city", value)}
      />
      {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Toast component to display messages */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    padding: 20,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    borderColor: "#E5E5E5",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#213E60",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default NewAddress;

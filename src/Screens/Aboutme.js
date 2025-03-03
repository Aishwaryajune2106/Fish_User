import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Edit from "../assets/images/edit.png"; // Edit icon image
import axios from "axios";
import Toast from "react-native-toast-message";

const AboutMe = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedName = await AsyncStorage.getItem("name");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedPhone = await AsyncStorage.getItem("phone");

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedPhone) setPhone(storedPhone);
      } catch (error) {
        console.error("Failed to load data from AsyncStorage:", error);
      }
    };

    loadData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  //...............Update Api.................//

  const handleUpdate = async () => {
    const storedUserId = await AsyncStorage.getItem("u_id");

    if (!storedUserId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User ID not found. Please log in again.",
      });
      return;
    }

    const u_id = storedUserId;

    // Create FormData and append fields
    const formData = new FormData();
    formData.append("u_id", u_id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", phone);

   

    try {
      const response = await axios.post(
        "https://lunarsenterprises.com:6014/ajwa/edit/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

    

      if (response.data.result) {
        await AsyncStorage.setItem("name", name);
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("phone", phone);

        Toast.show({
          type: "success",
          text1: "Success",
          text2: response.data.message,
        });
        setIsEditing(false);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error Name:", error.name);
      console.error("Error Message:", error.message);
      console.error("Error Stack:", error.stack);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Network request failed. Please check your internet connection or try again later.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Phone"
            />
            <TouchableOpacity
              onPress={handleUpdate}
              style={styles.updateButton}
            >
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
            <Text style={styles.phone}>{phone}</Text>
          </>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoHeader}>Contact Information</Text>
        <View style={styles.contactRow}>
          <View style={styles.contactInfo}>
            <Text style={styles.infoText}>Email: {email}</Text>
            <Text style={styles.infoText}>Phone: {phone}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleEditToggle} style={styles.editIcon}>
          <Image source={Edit} style={styles.editImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Thank you for visiting my profile!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 30,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A1A",
    fontFamily: "serif",
  },
  email: {
    fontSize: 16,
    color: "#A0A0A0",
    fontFamily: "serif",
  },
  phone: {
    fontSize: 16,
    color: "#A0A0A0",
    marginBottom: 20,
    fontFamily: "serif",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: "serif",
  },
  updateButton: {
    backgroundColor: "#213E60",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  infoContainer: {
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  editImage: {
    width: 24,
    height: 24,
  },
  infoHeader: {
    fontSize: 18,
    fontFamily: "serif",
    fontWeight: "bold",
    color: "#213E60",
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  contactInfo: {
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#1A1A1A",
    fontFamily: "serif",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#A0A0A0",
    fontFamily: "serif",
  },
  editIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});

export default AboutMe;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import Profile from "../assets/images/profile.png";
import OrdersImage from "../assets/images/orders.png";
import Favorites from "../assets/images/blueheart.png";
import AddressImage from "../assets/images/location.png";
import NotificationsImage from "../assets/images/notify.png";
import SignOutImage from "../assets/images/logout.png";
import Rightarrow from "../assets/images/rightarrow.png";
import Terms from "../assets/images/terms.png";
import Aboutus from "../assets/images/aboutus.png";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchUserData = async () => {
      const storedName = await AsyncStorage.getItem("name");
      const storedEmail = await AsyncStorage.getItem("email");
      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.clear(); // Clear AsyncStorage
      setIsLoggedIn(false); // Update the logged-in state
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error during sign out:", error);
      // Optionally show an error message to the user
    }
  };
  

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header Section */}
      <View style={styles.header}>
        <Image style={styles.profileImage} source={Profile} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* Menu Section */}
      <View style={styles.menuSection}>
        <MenuItem
          image={Profile}
          label="About Me"
          onPress={() => navigation.navigate("Aboutme")}
        />
        <MenuItem
          image={OrdersImage}
          label="My Orders"
          onPress={() => navigation.navigate("OrderList")}
        />
        <MenuItem
          image={Favorites}
          label="My Favorites"
          onPress={() => navigation.navigate("Favourites")}
        />
        <MenuItem
          image={Terms}
          label="Terms & Condition"
          onPress={() => navigation.navigate("Notification")}
        />
        <MenuItem
          image={Aboutus}
          label="About Us"
          onPress={() => navigation.navigate("Myaddress")}
        />

        <MenuItem
          image={SignOutImage}
          label="Sign Out"
          onPress={() => setModalVisible(true)} // Show modal on press
        />
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              Are you sure you want to Logout?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleSignOut}
              >
                <Text style={styles.buttonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// Menu Item Component for reusability with images
const MenuItem = ({ image, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Image source={image} style={styles.menuItemImage} />
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      <Image source={Rightarrow} style={styles.chevronImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#FFFFFF",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#213E60",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#1A1A1A",
    fontFamily: "serif",
  },
  email: {
    fontSize: 16,
    color: "#A0A0A0",
    fontFamily: "serif",
  },
  menuSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  chevronImage: {
    width: 24,
    height: 24,
    tintColor: "#B0B0B0",
  },
  menuLabel: {
    fontSize: 16,
    marginLeft: 15,
    color: "#1A1A1A",
    fontFamily: "serif",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: "45%",
  },
  buttonConfirm: {
    backgroundColor: "#213E60",
  },
  buttonCancel: {
    backgroundColor: "#888",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Account;

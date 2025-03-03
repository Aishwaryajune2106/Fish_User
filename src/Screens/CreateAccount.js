import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import Toast from 'react-native-toast-message'; // Import Toast
import AccountImg from "../assets/images/account.jpg";
import EyeOpenImg from "../assets/images/eye.png";
import EyeClosedImg from "../assets/images/hiddeneye.png";
import { useNavigation } from "@react-navigation/native";

export default function CreateAccount() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // State for Name
  const [email, setEmail] = useState(""); // State for Email

  // Function to handle signup
  const handleSignup = async () => {
    if (!name || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: 'Please ensure all fields are filled.',
      });
      return;
    }

    try {
      const response = await axios.post("https://lunarsenterprises.com:6014/ajwa/user/register", {
        name,
        email,
        password,
      });

      if (response.data.result) {
        Toast.show({
          type: 'success',
          text1: 'Registration Successful',
          text2: response.data.message,
        });
        navigation.navigate("LoginScreen");
      } else {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: response.data.message || 'An error occurred.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <ImageBackground source={AccountImg} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome</Text>

        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Create an Account</Text>
          <Text style={styles.subHeaderText}>Quickly create your account</Text>

          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName} 
          />
          <TextInput
            placeholder="Email Address"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail} 
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={showPassword ? EyeOpenImg : EyeClosedImg}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
          >
            <Text style={styles.signupButtonText}>Signup</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.loginLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast /> 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: "serif",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 1,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  headerText: {
    fontSize: 22,
    fontFamily: "serif",
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 15,
    color: "#666666",
    marginBottom: 25,
    textAlign: "center",
    fontFamily: "serif",
  },
  input: {
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#333333",
    fontFamily: "serif",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
    paddingVertical: 15,
    fontFamily: "serif",
  },
  eyeIcon: {
    width: 27,
    height: 27,
    marginLeft: 10,
  },
  signupButton: {
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#213E60",
    backgroundColor: "#213E60",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  signupButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "serif",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#213E60",
    fontFamily: "serif",
  },
  loginLink: {
    fontSize: 14,
    color: "#213E60",
    fontFamily: "serif",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

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
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginPage from "../assets/images/loginpage.jpg";
import EyeOpenImg from "../assets/images/eye.png"
import EyeClosedImg from "../assets/images/hiddeneye.png";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Toast from "react-native-toast-message"; // Import the Toast library

export default function Login({ setIsLoggedIn }) {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //................LOGIN API.....................//

  const handleLogin = async () => {
    if (email && password) {
      
  
      try {
        const response = await axios.post(
          "https://lunarsenterprises.com:6014/ajwa/login",
          {
            email,
            password,
            role:'user'
          }
        );
       
        const { result, message, u_id, user_token, name, mobile } = response.data; // Destructure 'mobile' from response
        
  
        if (result) {
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("u_id", u_id.toString());
          await AsyncStorage.setItem("user_token", user_token);
          await AsyncStorage.setItem("name", name); // Store the name in AsyncStorage
          await AsyncStorage.setItem("mobile", mobile.toString()); // Store the mobile number in AsyncStorage
          setIsLoggedIn(true);
          Toast.show({
            type: "success",
            text1: "Login Successful",
            text2: message,
          });
          navigation.navigate("Home");
        } else {
          setErrorMessage("Login failed: Invalid credentials");
          Toast.show({
            type: "error",
            text1: "Login Failed",
            text2: "Invalid credentials. Please try again.",
          });
        }
      } catch (error) {
       
        setErrorMessage("An error occurred during login. Please try again.");
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "An error occurred during login. Please try again.",
        });
      }
    } else {
      setErrorMessage("Please enter valid email and password.");
      Toast.show({
        type: "error",
        text1: "Input Error",
        text2: "Please enter valid email and password.",
      });
    }
  };
  

  return (
    <ImageBackground source={LoginPage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Secure Login</Text>
          <Text style={styles.subHeaderText}>
            Welcome Back! Please Log In to Continue
          </Text>
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

          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            disabled={!email || !password}
            onPress={handleLogin}
          >
            <Text style={styles.signupButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.accountContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateAccountScreen")}
            >
              <Text style={styles.createAccountText}>Create Account!</Text>
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
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "serif",
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
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#333333",
    marginBottom: 5,
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 15,
    color: "#666666",
    marginBottom: 25,
    fontFamily: "serif",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#333333",
    marginBottom: 15,
    fontFamily: "serif",
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
    fontFamily: "serif",
    paddingVertical: 15,
  },
  eyeIcon: {
    width: 27,
    height: 27,
    marginLeft: 10,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#213E60",
    fontSize: 14,
    fontFamily: "serif",
    fontWeight: "bold",
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
  accountContainer: {
    alignItems: "flex-end",
    top: 5,
  },
  createAccountText: {
    color: "#213E60",
    fontSize: 14,
    fontFamily: "serif",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
});

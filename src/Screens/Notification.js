import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Notification = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.text}>
          Welcome to Ajwa Supermarket! Please read these terms and conditions
          carefully before using our services. By accessing or using our
          services, you agree to be bound by these terms.
        </Text>
        <Text style={styles.subTitle}>1. Introduction</Text>
        <Text style={styles.text}>
          These Terms apply to all visitors, users, and others who wish to
          access or use the service.
        </Text>
        <Text style={styles.subTitle}>2. Services</Text>
        <Text style={styles.text}>
          Ajwa Supermarket offers a variety of products including groceries,
          household items, and personal care products.
        </Text>
        <Text style={styles.subTitle}>3. User Responsibilities</Text>
        <Text style={styles.text}>
          Users are responsible for maintaining the confidentiality of their
          account information and for all activities that occur under their
          account.
        </Text>
        <Text style={styles.subTitle}>4. Product Availability</Text>
        <Text style={styles.text}>
          All products are subject to availability. Ajwa Supermarket reserves
          the right to limit the quantities of any products or services that we
          offer.
        </Text>
        <Text style={styles.subTitle}>5. Payment</Text>
        <Text style={styles.text}>
          Payment must be made at the time of purchase. We accept various forms
          of payment, including credit cards and cash.
        </Text>
        <Text style={styles.subTitle}>6. Modifications</Text>
        <Text style={styles.text}>
          Ajwa Supermarket reserves the right to modify these terms at any time.
          Users will be notified of any changes.
        </Text>
        <Text style={styles.subTitle}>7. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions about these terms, please contact us at
          support@ajwasupermarket.com.
        </Text>
        <Text style={styles.text}>
          Thank you for choosing Ajwa Supermarket!
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 50,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1A1A1A",
    fontFamily: "serif",
  },
  scrollView: {
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    color: "#1A1A1A",
    fontFamily: "serif",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 5,
    color: "#1A1A1A",
    fontFamily: "serif",
  },
});

export default Notification;

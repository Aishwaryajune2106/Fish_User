import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://lunarsenterprises.com:6014/ajwa/list/order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ u_id: 6 }),
          }
        );
        const data = await response.json();
        if (data.result && data.list) {
          const formattedOrders = data.list.map((order) => ({
            id: order.od_id.toString(),
            status:
              order.od_delivery_status.charAt(0).toUpperCase() +
              order.od_delivery_status.slice(1),
            item: `Order #${order.od_id}`,
            date: new Date(order.od_created_at).toLocaleDateString(),
          }));
          setOrders(formattedOrders);
        } else {
          console.log("No orders found");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.orderItem}>
        <Text style={styles.orderItemText}>Item: {item.item}</Text>
        <Text style={styles.orderDateText}>Date: {item.date}</Text>
        <Text style={[styles.orderStatusText, getStatusStyle(item.status)]}>
          Status: {item.status}
        </Text>
      </TouchableOpacity>
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return styles.delivered;
      case "Cancelled":
        return styles.cancelled;
      case "Pending":
        return styles.pending;
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
       <View style={{marginBottom: 80}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  orderItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  orderItemText: {
    fontSize: 18,
    fontFamily: "serif",
  },
  orderDateText: {
    fontSize: 14,
    color: "#777",
    fontFamily: "serif",
  },
  orderStatusText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    fontFamily: "serif",
  },
  delivered: {
    color: "#28a745", // Green
  },
  cancelled: {
    color: "#dc3545", // Red
  },
  pending: {
    color: "#ffc107", // Yellow
  },
});

export default OrderList;

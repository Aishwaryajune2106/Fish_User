// AppContext.js
import React, { createContext, useContext, useState } from "react";

// Create the Context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    quantity: 0,
    subTotal: 0,
    deliveryFee: 0,
    totalPrice: 0,
    products: [],
    selectedAddress: null, // Initialize selectedAddress in context
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);
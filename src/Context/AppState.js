// AppState.js import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, createContext, useEffect } from "react";

export const AppContext = createContext();
const AppState = ({ children }) => {
  const [appState, setAppState] = useState(/* Your initial state here */);
  const [token, setToken] = useState({});
  const [isloading, setisloading] = useState(false);

  //   const [shopdetails, setShopdetails] = useState(
  //     AsyncStorage.getItem("shopdetails")
  //   );
  //   const [bankDetails, setBankDetails] = useState(
  //     AsyncStorage.getItem("bankDetails")
  //   );
  //   const [procheck, setProcheck] = useState(null);
  //   const [loggedInuserData, setloggedInuserData] = useState([]);
  // const [pro, setPropic] = useState()
  // Provide any functions or values you want to make available through the context.
  //   const [isloading, setisloading] = useState(false);
  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = async () => {
    let authtoken = await AsyncStorage.getItem("user_token");

    setToken(authtoken);
    setisloading(true);
  };
  const updateUser = (pic) => {
    setPropic({ pic });
  };
  console.log("token-----", token);

  return (
    //   isloading&&
    isloading && (
      <AppContext.Provider
        value={{
          // appState,
          // setAppState,
          token,
          setToken,
          // shopdetails,
          // setShopdetails,
          // bankDetails,
          // setBankDetails,
          // loggedInuserData,
          // setloggedInuserData,
          // pro,
          // setPropic,
          // procheck,setProcheck,
          // homecheck,
          // sethomecheck,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  );
};
export default AppState;

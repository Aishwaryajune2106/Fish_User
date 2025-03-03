import React from 'react';
import 'react-native-gesture-handler'; // Ensure this is at the top
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes/Routes'; // Make sure the path is correct
import CreateAccount from './src/Screens/CreateAccount';
import Login from './src/Screens/Login';
import ForgotPassword from './src/Screens/ForgotPassword';
import Toast, { ToastProvider } from 'react-native-toast-message';
import { AppProvider } from './src/Context/AppContext';

const App = () => {
  return (
    <AppProvider>
    <NavigationContainer>
      <Routes/>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
    </AppProvider>
  );
};

export default App;

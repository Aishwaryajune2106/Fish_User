import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native';
import Home from '../Screens/Home';
import Category from '../Screens/Category';
import Favourites from '../Screens/Favourites';
import ProductList from '../Screens/ProductList';
import Header from '../Component/Header';

import HeartInactive from '../assets/images/heart.png';
import Heart from '../assets/images/heartwhite.png';
import Categoryimg from '../assets/images/category1.png';
import CategoryimgInactive from '../assets/images/category.png';
import Homeimg from '../assets/images/home.png';

import Userwhite from '../assets/images/userwhite.png';
import User from '../assets/images/user.png';

import Cartwhite from '../assets/images/cartwhite.png';
import Cartgrey from '../assets/images/cartgrey.png';

import HomeimgInactive from '../assets/images/homewhite.png';
import ViewProducts from '../Screens/ViewProducts';
import Cart from '../Screens/Cart';
import CartHeader from '../Component/CartHeader';
import Address from '../Screens/Address';
import Account from '../Screens/Account';
import OrderList from '../Screens/OrderList';
import Aboutme from '../Screens/Aboutme';
import Myaddress from '../Screens/Myaddress';
import Notification from '../Screens/Notification';
import Login from '../Screens/Login';
import CreateAccount from '../Screens/CreateAccount';
import NewAddress from '../Screens/NewAddress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmOrder from '../Screens/ConfirmOrder';
import ForgotPassword from '../Screens/ForgotPassword';

const HomeStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const CartStack = createStackNavigator();
const AccountStack = createStackNavigator();
const AuthStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="LoginScreen"
        component={Login}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="CreateAccountScreen"
        component={CreateAccount}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ForgotScreen"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ProductList"
        component={ProductList}
        options={({navigation}) => ({
          header: () => <Header title="Products" navigation={navigation} />,
        })}
      />
      <HomeStack.Screen
        name="ViewProducts"
        component={ViewProducts}
        options={({navigation}) => ({
          header: () => (
            <CartHeader title="Product Details" navigation={navigation} />
          ),
        })}
      />
      <HomeStack.Screen
        name="Address"
        component={Address}
        options={({navigation}) => ({
          header: () => (
            <Header title="Shipping Address" navigation={navigation} />
          ),
        })}
      />
      <HomeStack.Screen
        name="NewAddress"
        component={NewAddress}
        options={({navigation}) => ({
          header: () => <Header title="New Address" navigation={navigation} />,
        })}
      />

      <HomeStack.Screen
        name="OrderList"
        component={OrderList}
        options={({navigation}) => ({
          header: () => <Header title="Orders" navigation={navigation} />,
        })}
      />
      <HomeStack.Screen
        name="Aboutme"
        component={Aboutme}
        options={({navigation}) => ({
          header: () => <Header title="About Me" navigation={navigation} />,
        })}
      />

      <HomeStack.Screen
        name="Favourites"
        component={Favourites}
        options={({navigation}) => ({
          header: () => <Header title="Favourites" navigation={navigation} />,
        })}
      />

      <HomeStack.Screen
        name="Myaddress"
        component={Myaddress}
        options={({navigation}) => ({
          header: () => <Header title="About Us" navigation={navigation} />,
        })}
      />
      <HomeStack.Screen
        name="ConfirmOrder"
        component={ConfirmOrder}
        options={({navigation}) => ({
          header: () => (
            <Header title="Order Summary" navigation={navigation} />
          ),
        })}
      />

      <HomeStack.Screen
        name="Notification"
        component={Notification}
        options={({navigation}) => ({
          header: () => (
            <Header title="Terms & Conditions" navigation={navigation} />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
}

function CategoryStackScreen() {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen
        name="CategoryScreen"
        component={Category}
        options={({navigation}) => ({
          header: () => <Header title="Category" navigation={navigation} />,
        })}
      />
      <CategoryStack.Screen
        name="ProductList"
        component={ProductList}
        options={({navigation}) => ({
          header: () => <Header title="Product List" navigation={navigation} />,
        })}
      />
      <CategoryStack.Screen
        name="Cart"
        component={Cart}
        options={({navigation}) => ({
          header: () => <Header title="Cart" navigation={navigation} />,
        })}
      />
      <CategoryStack.Screen
        name="ViewProducts"
        component={ViewProducts}
        options={({navigation}) => ({
          header: () => (
            <Header title="Product Details" navigation={navigation} />
          ),
        })}
      />
      <CategoryStack.Screen
        name="Address"
        component={Address}
        options={({navigation}) => ({
          header: () => (
            <Header title="Shipping Address" navigation={navigation} />
          ),
        })}
      />
      <CategoryStack.Screen
        name="NewAddress"
        component={NewAddress}
        options={({navigation}) => ({
          header: () => <Header title="New Address" navigation={navigation} />,
        })}
      />
      <CategoryStack.Screen
        name="OrderList"
        component={OrderList}
        options={({navigation}) => ({
          header: () => <Header title="Orders" navigation={navigation} />,
        })}
      />
      <CategoryStack.Screen
        name="Myaddress"
        component={Myaddress}
        options={({navigation}) => ({
          header: () => <Header title="About Us" navigation={navigation} />,
        })}
      />
      <CategoryStack.Screen
        name="ConfirmOrder"
        component={ConfirmOrder}
        options={({navigation}) => ({
          header: () => (
            <Header title="Order Summary" navigation={navigation} />
          ),
        })}
      />
      <CategoryStack.Screen
        name="CartScreen"
        component={Cart}
        options={({navigation}) => ({
          header: () => <Header title="Cart" navigation={navigation} />,
        })}
      />
      <CategoryStack.Screen
        name="ForgotScreen"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
    </CategoryStack.Navigator>
  );
}

function CartStackScreen() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="CartScreen"
        component={Cart}
        options={({navigation}) => ({
          header: () => <Header title="Cart" navigation={navigation} />,
        })}
      />
      <CartStack.Screen
        name="Address"
        component={Address}
        options={({navigation}) => ({
          header: () => (
            <Header title="Shipping Address" navigation={navigation} />
          ),
        })}
      />
      <CartStack.Screen
        name="NewAddress"
        component={NewAddress}
        options={({navigation}) => ({
          header: () => <Header title="New Address" navigation={navigation} />,
        })}
      />
      <CartStack.Screen
        name="OrderList"
        component={OrderList}
        options={({navigation}) => ({
          header: () => <Header title="Orders" navigation={navigation} />,
        })}
      />
      <CartStack.Screen
        name="Myaddress"
        component={Myaddress}
        options={({navigation}) => ({
          header: () => <Header title="About Us" navigation={navigation} />,
        })}
      />
      <CartStack.Screen
        name="ConfirmOrder"
        component={ConfirmOrder}
        options={({navigation}) => ({
          header: () => (
            <Header title="Order Summary" navigation={navigation} />
          ),
        })}
      />
      <CartStack.Screen
        name="ForgotScreen"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
    </CartStack.Navigator>
  );
}

// Account stack for the new "Account" tab
function AccountStackScreen({setIsLoggedIn}) {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="AccountScreen"
        component={props => (
          <Account {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
        options={{headerShown: false}}
      />
      <AccountStack.Screen
        name="Aboutme"
        component={Aboutme}
        options={({navigation}) => ({
          header: () => <Header title="About Me" navigation={navigation} />,
        })}
      />

      <AccountStack.Screen
        name="Favourites"
        component={Favourites}
        options={({navigation}) => ({
          header: () => <Header title="Favourites" navigation={navigation} />,
        })}
      />

      <AccountStack.Screen
        name="OrderList"
        component={OrderList}
        options={({navigation}) => ({
          header: () => <Header title="Orders" navigation={navigation} />,
        })}
      />
      <AccountStack.Screen
        name="Notification"
        component={Notification}
        options={({navigation}) => ({
          header: () => (
            <Header title="Terms & Conditions" navigation={navigation} />
          ),
        })}
      />
      <AccountStack.Screen
        name="Myaddress"
        component={Myaddress}
        options={({navigation}) => ({
          header: () => <Header title="About Us" navigation={navigation} />,
        })}
      />
      <AccountStack.Screen
        name="ForgotScreen"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
    </AccountStack.Navigator>
  );
}

//..................AuthStack....................//

function AuthStackScreen({setIsLoggedIn}) {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="LoginScreen"
        component={props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="CreateAccountScreen"
        component={CreateAccount}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ForgotScreen"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialRoute, setInitialRoute] = useState('LoginScreen');

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('user_token');
        if (token) {
          setIsLoggedIn(true);
          setInitialRoute('Home');
        } else {
          setIsLoggedIn(false);
          setInitialRoute('LoginScreen');
        }
      } catch (error) {
        console.error('Failed to load token.', error);
      }
    };

    checkToken();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <BottomTab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#808080',
            tabBarStyle: {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              elevation: 0,
              backgroundColor: '#213E60',
              borderTopWidth: 0,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: 'serif',
              marginBottom: 10,
            },
            tabBarItemStyle: {
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}>
          <BottomTab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({focused, size}) => (
                <Image
                  source={focused ? Homeimg : HomeimgInactive}
                  style={{
                    width: size,
                    height: size,
                    tintColor: focused ? '#FFFFFF' : '#808080',
                  }}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="Category"
            component={CategoryStackScreen}
            options={{
              tabBarLabel: 'Category',
              tabBarIcon: ({focused, size}) => (
                <Image
                  source={focused ? Categoryimg : CategoryimgInactive}
                  style={{
                    width: size,
                    height: size,
                    tintColor: focused ? '#FFFFFF' : '#808080',
                  }}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="Cart"
            component={CartStackScreen}
            options={{
              tabBarLabel: 'Cart',
              tabBarIcon: ({focused, size}) => (
                <Image
                  source={focused ? Cartwhite : Cartgrey}
                  style={{
                    width: size,
                    height: size,
                    tintColor: focused ? '#FFFFFF' : '#808080',
                  }}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="Account"
            component={props => (
              <AccountStackScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
            options={{
              tabBarLabel: 'Account',
              tabBarIcon: ({focused, size}) => (
                <Image
                  source={focused ? Userwhite : User}
                  style={{
                    width: size,
                    height: size,
                    tintColor: focused ? '#FFFFFF' : '#808080',
                  }}
                />
              ),
            }}
          />
        </BottomTab.Navigator>
      ) : (
        <AuthStackScreen setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default Routes;

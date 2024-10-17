// MainNavigator.js
import 'react-native-url-polyfill/auto';
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import StartScreen from '../start/StartScreen';
import HowitWorks from '../start/HowitWorks';
import Bottomsheet from '../Screens/Nav/Bottomsheet';

const Stack = createStackNavigator();

const config = {
  screens: {
    Post: {
      path: 'post/:postId',
      parse: {
        postId: postId => `${postId}`,
      },
    },
  },
};

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await EncryptedStorage.getItem('secrets_login_safeminds');
      if (token) {
        setIsLoggedIn(true);
      }
      setLoading(false);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
   
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    // await EncryptedStorage.setItem('secrets_login_gym', 'some-token');
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await EncryptedStorage.removeItem('secrets_login_gym');
    setIsLoggedIn(false);
  };

  if (loading) {
    // You can return a loading screen or spinner here
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.50)'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            alignContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10%',
            }}>
            {/* <Image style={{ width: 80, height: 60 }} source={require('../../assets/images/Gym_vibe_tran.png')}></Image> */}
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              flex: 1,
            }}>
            {/* <LottieView style={{ width: '40%', alignItems: 'center', }} source={require('../../assets/jsons/gym_loder_main.json')} autoPlay loop /> */}
            <Text style={{color: '#fff', fontSize: 14, fontWeight: '900'}}>
              Please wait...
            </Text>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '900',
                fontSize: 12,
                marginBottom: 10,
              }}>
              Design and Developed by
            </Text>
            {/* <Image style={{ width: 150, height: 70, }} source={require('../../assets/images/HemoLink_bg.png')}></Image> */}
          </View>
        </View>
        {/* <Text style={{color:'#fff'}}>Loading...</Text> */}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StartScreen"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false, // Hide header if not needed
        }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Bottomsheet">
              {props => <Bottomsheet {...props} handleLogout={handleLogout} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="StartScreen">
              {props => <StartScreen {...props} handleLogin={handleLogin} />}
            </Stack.Screen>

            <Stack.Screen name="HowitWorks">
              {props => <HowitWorks {...props} handleLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Login">
              {props => <Login {...props} handleLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {props => <Register {...props} handleLogin={handleLogin} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;

const styles = StyleSheet.create({});

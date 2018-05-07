import React from 'react'
import { createStackNavigator } from 'react-navigation'
import RegisterScreen from './app/components/RegisterScreen';
import LoginScreen from './app/components/LoginScreen';
import MyAccountScreen from './app/components/MyAccountScreen';
import MapScreen from './app/components/MapScreen';
import SelectDestinationScreen from './app/components/SelectDestinationScreen';

export default createStackNavigator({
  Register: {screen: RegisterScreen},
  Login: {screen: LoginScreen},
  MyAccount: {screen: MyAccountScreen},
  Map: {screen: MapScreen},
  SelectDestination: {screen: SelectDestinationScreen}
}, {
  initialRouteName: 'Login',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
})

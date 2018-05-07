import React from 'react'
import {Text, View} from 'react-native';

export default class MyAccountScreen extends React.Component {

  static navigationOptions = {
    title: 'Mi perfil'
  };

  render() {
    return (
      <View>
        <Text>Mi Perfil</Text>
      </View>
    )
  }
}
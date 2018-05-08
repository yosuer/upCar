import React from 'react'
import {Text, View} from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { };
}

const mapDispatchToProps = (dispatch) => {
  return { };
}

class MyAccountScreen extends React.Component {

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

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountScreen);
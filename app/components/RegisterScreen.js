import React from 'react'
import {Button, StyleSheet, ScrollView, Text, TouchableOpacity, Image, Alert} from 'react-native'
import t from 'tcomb-form-native'
import { connect } from 'react-redux';
import { actions as auth } from "../modules/auth/index"
const { register } = auth;

const Form = t.form.Form

const User = t.struct({
  email: t.String,
  password: t.String,
  confirmPassword: t.String
})

const options = {
  fields: {
    email: {
      label: 'Correo Electronico',
      error: 'Este campo es obligatorio'
    },
    password: {
      label: 'Contraseña',
      error: 'Este campo es obligatorio'
    },
    confirmPassword: {
      label: 'Confirme su contraseña',
      error: 'Este campo es obligatorio'
    }
  }
}

class RegisterScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Registrar',
      headerRight: (
        <TouchableOpacity onPress={() => {navigation.navigate('MyAccount')}}>
          <Image style={{width: 20, height: 20}}
                 source={require('../assets/myaccount.png')}
          />
        </TouchableOpacity>
      )
    };
  };

  handleSubmit = (data) => {
    console.log('value: ', data);
    this.props.register(data, this.onSuccess, this.onError)
  }

  onSuccess(user) {
    console.log(this.props)
    console.log(user)
    this.props.navigation.navigate('Map')
  }

  onError(error) {
    console.log(error)
    Alert.alert('Error al registrar', error.message)
  }

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('item', 'NO-ID');

    return (
      <ScrollView style={styles.container}>
        <Text>Registro {itemId}</Text>
        <Form ref="form" type={User} options={options}/>
        <Button
          title="Registrar"
          onPress={() => this.handleSubmit(this.refs.form.getValue())} />
      </ScrollView>
    )
  }
}

export default connect(null, { register })(RegisterScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 50,
    padding: 20,
  }
})
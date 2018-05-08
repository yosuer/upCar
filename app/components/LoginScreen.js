import React from 'react'
import {Button, StyleSheet, ScrollView, Image, Alert} from 'react-native'
import t from 'tcomb-form-native'
import {connect} from 'react-redux';
import { actions as auth } from "../modules/auth/index"
const {login} = auth;

const Form = t.form.Form

const Credentials = t.struct({
  email: t.String,
  password: t.String
})

const options = {
  fields: {
    email: {
      label: 'Email',
      error: 'Ingrese un email válido'
    },
    password: {
      label: 'Contraseña',
      error: 'Ingrese su contraseña'
    }
  }
}

class LoginScreen extends React.Component {

  static navigationOptions = {
    title: 'Ingresar'
  }

  handleSubmit = (data) => {
    this.props.login(data, this.onSuccess, this.onError)
  }

  onSuccess = ({exists, user}) => {
    console.log(exists)
    console.log(user)
    this.props.navigation.navigate('Map')
  }

  onError(error) {
    console.log(error)
    Alert.alert('Error: ', error.message)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
        <Form ref="form" type={Credentials} options={options}/>
        <Button
          title="Ingresar"
          onPress={() => this.handleSubmit(this.refs.form.getValue())} />
        <Button
          title="No tengo cuenta"
          onPress={() => {this.props.navigation.navigate('Register')}}/>
      </ScrollView>
    )
  }
}

export default connect(null, {login})(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 50,
    padding: 20,
  }
})
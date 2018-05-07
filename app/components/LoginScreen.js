import React from 'react'
import {Button, StyleSheet, ScrollView, Image} from 'react-native'
import t from 'tcomb-form-native'

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

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    title: 'Ingresar'
  };

  handleSubmit = () => {
    const value = this.refs.form.getValue();
    console.log(value);
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
          onPress={this.handleSubmit} />
        <Button
          title="No tengo cuenta"
          onPress={() => {this.props.navigation.navigate('Register')}}/>
        <Button
          title="Mapa"
          onPress={() => {this.props.navigation.navigate('Ver Mapa')}} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 50,
    padding: 20,
  }
})
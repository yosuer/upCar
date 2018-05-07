import React from 'react'
import {Button, StyleSheet, ScrollView, Text, TouchableOpacity, Image} from 'react-native'
import t from 'tcomb-form-native'

const Form = t.form.Form

const User = t.struct({
  name: t.String,
  lastName: t.String,
  email: t.String,
  password: t.String,
  terms: t.Boolean
})

const options = {
  fields: {
    name: {
      label: 'Nombre(s)',
      error: 'Este campo es obligatorio'
    },
    lastName: {
      label: 'Apellido(s)',
      error: 'Este campo es obligatorio'
    },
    email: {
      label: 'Correo Electronico',
      error: 'Este campo es obligatorio'
    },
    password: {
      label: 'Contraseña',
      error: 'Este campo es obligatorio'
    },
    terms: {
      label: 'Acepto los terminos'
    }
  }
}

export default class RegisterScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Registrar',
      headerRight: (
        <TouchableOpacity onPress={() => {navigation.navigate('MyAccount')}}>
          <Image style={{width: 20, height: 20}}
                 source={require('../../assets/myaccount.png')}
          />
        </TouchableOpacity>
      ),
    };
  };

  handleSubmit = () => {
    const value = this.refs.form.getValue();
    console.log('value: ', value);
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
          onPress={this.handleSubmit} />
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
import React from 'react'
import {StyleSheet, Keyboard} from 'react-native'
import {connect} from 'react-redux';
import { actions as auth } from "../modules/auth/index"
import {Button, Col, Container, Content, Form, Toast, Header, Input, Item, Label, Spinner, Text} from 'native-base';
const {login} = auth;

class LoginScreen extends React.Component {

  static navigationOptions = {
    header: () => null
  }

  constructor(props) {
    super(props)
    this.state = {
      email: 'yosuer@gmail.com',
      password: '123456',
      isLoading: false
    }
  }

  handleSubmit = () => {
    this.setState({isLoading: true})
    Keyboard.dismiss()
    const {email, password} = this.state
    if (!email || !password) {
      this.onError('Ingrese su correo y contraseña')
    } else{
      this.props.login({email, password}, this.onSuccess, this.onError)
    }
  }

  onSuccess = ({exists, user}) => {
    if (exists) {
      this.props.navigation.navigate('Map')
    } else {
      this.props.navigation.navigate('CompleteProfile', {user})
    }
    this.setState({isLoading: false})
  }

  onError = (error) => {
    console.log(error)
    this.setState({isLoading: false})
    Toast.show({
      text: error.message || error,
      buttonText: "cerrar",
      position: "bottom",
      type: "danger"
    })
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input placeholder="user@email.com"
                     keyboardType={'email-address'}
                     defaultValue={this.state.email}
                     onSubmitEditing={Keyboard.dismiss}
                     onChangeText={(email) => this.setState({email})}/>
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input placeholder="*********"
                     defaultValue={this.state.password}
                     onSubmitEditing={Keyboard.dismiss}
                     onChangeText={(password) => this.setState({password})}
                     secureTextEntry={true}/>
            </Item>
          </Form>
          <Button rounded success disabled={this.state.isLoading}
                  onPress={this.handleSubmit}>
            <Text>Ingresar</Text>
          </Button>
          <Button rounded disabled={this.state.isLoading}
                  onPress={() => {this.props.navigation.navigate('Register')}}>
            <Text>No tengo cuenta</Text>
          </Button>
          {this.state.isLoading ? <Spinner color='green' /> : null}
        </Content>
      </Container>
    )
  }
}

export default connect(null, {login})(LoginScreen);
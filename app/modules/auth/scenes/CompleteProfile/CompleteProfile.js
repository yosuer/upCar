import React from 'react';
import {Keyboard} from 'react-native'
import {
  Body,
  Button, Container, Content, Form, Header, Icon, Input, Item, Label, Left, Right, Spinner, Text, Title,
  Toast
} from 'native-base';

import {connect} from 'react-redux';
import { actions as auth } from "../../index"
const { createUser } = auth;

class CompleteProfile extends React.Component {

  static navigationOptions = {
    header: () => null
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      userName: ''
    }
  }

  handleSubmit = () => {
    this.setState({isLoading: true})
    const user = this.props.navigation.getParam('user')
    const data = {uid: user.uid, userName: this.state.userName}
    this.props.createUser(data, this.onSuccess, this.onError)
  }

  onSuccess = () => {
    this.setState({isLoading: false})
    this.props.navigation.navigate('Map')
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
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
          <Title>Perfil</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input defaultValue={this.state.userName} onSubmitEditing={Keyboard.dismiss}
                     onChangeText={(userName) => this.setState({userName})}/>
            </Item>
          </Form>
          <Button rounded success disabled={this.state.isLoading}
                  onPress={this.handleSubmit}>
            <Text>Guardar</Text>
          </Button>
          {this.state.isLoading ? <Spinner color="red" /> : null}
        </Content>
      </Container>
    )
  }
}

export default connect(null, { createUser })(CompleteProfile);
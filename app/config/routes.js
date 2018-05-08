import React from 'react'
import { createStackNavigator } from 'react-navigation'
import AppRouterConfigs from './AppRouterConfigs'
import store from '../redux/store'
import { checkLoginStatus } from "../modules/auth/actions";
import Splash from '../components/Splash/Splash';

const createAppNavigator = (loggedIn = false) => {
  return createStackNavigator(AppRouterConfigs.screens, {
    initialRouteName: loggedIn ? 'Map' : 'Login'
  })
}

export default class extends React.Component {

  constructor() {
    super()
    this.state = {
      isReady: false,
      isLoggedIn: false
    }
  }

  componentDidMount() {
    store.dispatch(checkLoginStatus((isLoggedIn) => {
      console.log(isLoggedIn)
      this.setState({isReady: true, isLoggedIn});
    }));
  }

  render() {
    if (!this.state.isReady)
      return <Splash/>

    const AppNavigator = createAppNavigator(this.state.isLoggedIn)
    return (
      <AppNavigator />
    )
  }

}
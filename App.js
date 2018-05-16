import React from "react";
import {AppLoading, Font} from 'expo'
import {Provider} from 'react-redux';
import store from './app/redux/store';
import {createDrawerNavigator} from 'react-navigation'
import AppRouterConfigs from './app/config/AppRouterConfigs';
import {checkLogin, checkLoginStatus} from './app/modules/auth/actions';
import {Root} from 'native-base';
import SideBar from './app/components/SideBar/SideBar';

const createAppNavigator = (loggedIn = false) => {
  return createDrawerNavigator(AppRouterConfigs.screens, {
    initialRouteName: loggedIn ? 'Map' : 'Login',
    contentComponent: props => <SideBar {...props}/>
  })
}

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      isReady: false,
      isLoggedIn: false
    }
  }

  loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })
  }

  componentWillMount = async () => {
    console.ignoredYellowBox = [
      'Setting a timer', 'Remote debugger'
    ]
    await this.loadFonts()
    let _this = this
      store.dispatch(checkLoginStatus((isLoggedIn) => {
      console.log(isLoggedIn)
      _this.setState({isReady: true, isLoggedIn});
    }));
  }

  render() {
    if (!this.state.isReady) {
      console.log(this.state)
      return (
        <AppLoading/>
      )
    } else {
      console.log('isReady')
      const AppNavigator = createAppNavigator(this.state.isLoggedIn)
      return (
        <Provider store={store}>
          <Root>
            <AppNavigator />
          </Root>
        </Provider>
      )
    }
  }

}
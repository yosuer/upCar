import React from 'react'
import { Font, AppLoading } from 'expo';

import {Provider} from 'react-redux';
import store from './app/redux/store';
import Router from './app/config/routes'

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isReady: false,
    }
  }

  _loadAssetsAsync = async () => {
    const fontAssets = cacheFonts([
      {RobotoExtraBold: require('./app/assets/fonts/Roboto-Black.ttf')},
      {RobotoBold: require('./app/assets/fonts/Roboto-Bold.ttf')},
      {RobotoMedium: require('./app/assets/fonts/Roboto-Medium.ttf')},
      {RobotoRegular: require('./app/assets/fonts/Roboto-Regular.ttf')},
      {RobotoLight: require('./app/assets/fonts/Roboto-Light.ttf')}
    ]);

    await Promise.all([...fontAssets]);
  }

  render () {
    if(!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({isReady: true})}
          onError={console.warn}
        />
      )
    }

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
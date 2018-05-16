import RegisterScreen from '../components/RegisterScreen';
import LoginScreen from '../components/LoginScreen';
import MyAccountScreen from '../components/MyAccountScreen';
import MapScreen from '../components/MapScreen';
import SelectDestinationScreen from '../components/SelectDestinationScreen';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';

export default {
  screens: {
    Register: {screen: RegisterScreen},
    Login: {screen: LoginScreen},
    MyAccount: {screen: MyAccountScreen},
    Map: {screen: MapScreen},
    SelectDestination: {screen: SelectDestinationScreen},
    CompleteProfile: {screen: CompleteProfile}
  }
}
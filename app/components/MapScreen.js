import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {Constants, Location, MapView, Permissions} from 'expo';
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
import MapViewDirections from 'react-native-maps-directions';

const ASPECT_RATIO = width / height;
const LATITUDE = -34.594364
const LONGITUDE = -58.430461
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapScreen extends React.Component {

  static navigationOptions = {
    title: 'Mapa'
  };

  constructor(props){
    super(props)
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      location: null
    }
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('No hay permisos')
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location,
      region: {latitude: location.coords.latitude, longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}});
  };

  render() {
    const {location} = this.state
    const { navigation } = this.props
    const destinationName = navigation.getParam('locationName', 'Indique su destino')
    const destCoords = navigation.getParam('locationCoords', null)
    return (
      <View style={styles.container}>
        <MapView
          ref="mapView"
          style={styles.map}
          region={this.state.region}
          showsUserLocation={true}
          loadingEnabled={true}>
          {destCoords ? <MapView.Marker coordinate={{latitude: destCoords.lat, longitude: destCoords.lng}} title="Destino" /> : null}
          {location && destCoords ?
            <MapViewDirections origin={{latitude: location.coords.latitude, longitude: location.coords.longitude}}
                               strokeWidth={5} strokeColor="hotpink"
                               onReady={(result) => this.refs.mapView.fitToCoordinates(result.coordinates, {
                                 edgePadding: {
                                   right: (width / 20),
                                   bottom: (height / 20),
                                   left: (width / 20),
                                   top: (height / 20),
                                 }, animated: true
                               })}
                               destination={{latitude: destCoords.lat, longitude: destCoords.lng}}
                               apikey="AIzaSyBGbI6JP1RoUwaebCw3IyETYhzNnsuvEps"/> : null}
        </MapView>
        <View style={styles.searchBox}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputText} onPress={()=> this.props.navigation.navigate('SelectDestination')}>
              <Ionicons name="md-search" size={26} color="black"/> Origen: Ubicacion Actual
            </Text>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputText} onPress={()=> this.props.navigation.navigate('SelectDestination')}>
              <Ionicons name="md-search" size={26} color="black"/> Destino: {destinationName}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  searchBox:{
    top:0,
    position:"absolute",
    width: '100%'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  inputWrapper:{
    marginLeft:15,
    marginRight:10,
    marginTop:15,
    marginBottom:0,
    backgroundColor:"#fff",
    opacity:0.9,
    borderRadius:7
  },
  inputText: {
    fontSize: 24
  }
});

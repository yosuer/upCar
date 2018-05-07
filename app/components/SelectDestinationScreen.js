import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default class SelectDestinationScreen extends React.Component {

  handleOnPress = (data, details) => {
    const locationName = details.description || details.name
    const locationCoords = details.geometry.location
    this.props.navigation.navigate('Map', {locationName, locationCoords})
  }

  render() {
    const homePlace = { description: 'Casa', geometry: { location: { lat: -34.5927386, lng: -58.4330237 } }};
    const workPlace = { description: 'Trabajo', geometry: { location: { lat: -34.587595, lng: -58.482171 } }};

    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder='Ingrese su destino'
          minLength={3}
          autoFocus={true}
          returnKeyType={'search'}
          listViewDisplayed='auto'
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={this.handleOnPress}
          getDefaultValue={() => ''}
          query={{
            key: 'AIzaSyBGbI6JP1RoUwaebCw3IyETYhzNnsuvEps',
            language: 'es'
          }}
          styles={{
            textInputContainer: {
              width: '100%'
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          GoogleReverseGeocodingQuery={{
          }}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
            types: 'food'
          }}
          predefinedPlaces={[homePlace, workPlace]}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          debounce={200}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  }
})
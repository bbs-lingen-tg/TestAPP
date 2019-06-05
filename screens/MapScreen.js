// Imports von Projekten
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { Backend } from '../utils/Backend';

/**
  export = exportiert
  default = Standard export

  Erstellt eine Klasse Namens "MapScreen" die von "React.Component" erbt.
*/ 
export default class MapScreen extends React.Component {

  static navigationOptions = {
    title: 'Map', // Titel der Navigation
  };

  // Constructor der Klasse
  constructor(props) {
    super(props);

    // Default State
    this.state = {
      location: null,
      errorMessage: 'Waiting..'
    };
  }

  componentWillMount() { 
    // Wird ausgeführt wenn die Seite geladen wird

    this.getLocationAsync(); 
    // Für die Methode aus
  }

  getLocationAsync = async () => { 
    // Methode als Async gekennzeichnet
    // AWAIT heißt das er auf Antwort wartet. Geht nur unter ASYNC!
    let { status } = await Permissions.askAsync(Permissions.LOCATION); 
    // Abfrage ob er die Erlaubnis hat die Location abzufragen.
    
    if (status !== 'granted') { 
      // Wenn der Status nicht angenommen wurde

      this.setState({
        errorMessage: 'Permission to access location was denied' 
        // Fehler Nachricht wird gesetzt.
      });
    }

    let location = await Location.getCurrentPositionAsync({Accuracy: 6}); 
    // Location wird abgefragt.

    Backend.create(location); 
    // Sendet den einen Request an die Rest API

    this.setState({ location });
    // Setzt die Location
  };

  renderMap = () => {
    if(this.state.location !== null) {
      // Wenn die Location nicht null ist, wird die Map gerendert

      return (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

          <MapView.Marker
            coordinate={{latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude}}
            title={"Your Position"}
          />
          <MapView.Marker 
            coordinate={{latitude: 52.5227298, longitude: 7.3146035}}
            title={"Orient Shisha-Store Lingen (Ems)"}
          />
        </MapView>
      );
    }
    // Wenn die Location null ist, wird der Text gerendert
    return (
      <Text style={styles.paragraph}>{this.state.errorMessage}</Text>
    );
  }

  render() {
    // Standard Render der Seite

    return (
      // Return mit dem Content

      <View style={styles.container}>
        {this.renderMap() /* Ruft den Content aus der Funktion ab */}
      </View>
    );
  }
}

// Das Design der App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});

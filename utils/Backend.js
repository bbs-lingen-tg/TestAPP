// Imports
import { Constants } from 'expo';

// Backend URL
const uri = 'http://192.168.108.16:8080/v1';

// Erstellt eine Klasse
const BackendClass = class Backend {

  constructor() {
    this.client = Constants.installationId;
    // Unique ID der Installation
  }

  create(location) {
    // Methode zum posten der Location Daten ans Backend
    
    fetch(`${uri}/location`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client: this.client,
        accuracy: location.coords.accuracy,
        altitude: location.coords.altitude,
        altitudeAccuracy: location.coords.altitudeAccuracy,
        heading: location.coords.heading,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        speed: location.coords.speed,
        timestamp: location.timestamp
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
  }
}

var Backend;

if(Backend === null || Backend == undefined) {
  console.log('Init Backend');
  Backend = new BackendClass();
} else {
  console.log('Cache', Backend)
}

module.exports = {
  Backend
}
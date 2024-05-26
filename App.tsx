import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

import MapView, { Marker } from 'react-native-maps';




const render = (status: Status) => (<h1>{status}</h1>)


export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [transporationMethod, setTransportationMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* Asks for users location */
  const getDeviceLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setLoading(false);
  };

  useEffect(() => {
    getDeviceLocation();
  }, []);


  const markers = [

    {
      latitude: 43.083721 ,
      longitude:-78.925018,
      title: 'Foo Place',
      subtitle: 'test'
    }

  ]

  
  return (
    <View style={styles.container}>
      {
        !loading && location != null && (
            <MapView initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0922
            }}

            
            
            style={styles.map}
            
            >
              <Marker coordinate={{
              latitude: 43.083721,
              longitude: -78.925018,
            }}  
            
            description='test'
            title='test'
            />
            </MapView>

        )
      }

      {
        loading && location == null && (
          <View>
            <Text>Waiting for Location.....</Text>
          </View>
        )
      }

      {
        !loading && location == null && (
          <View>
            <Text>Sorry, you must allow location access</Text>
          </View>
        )
      }
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

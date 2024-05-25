import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

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

  return (

    <View style={styles.container}>
      {
        /* If user allows location */
      !loading && location != null && (
        <View>
          <Text>Location has been found</Text>
          <StatusBar style="auto" />
        </View>
      )
      }


      {
        /* if waiting for user to allow location */
      loading && location == null && (
        <View>
          <Text>Waiting for Location.....</Text>
        </View>
      )
      }


      {
        /* if waiting for user to allow location */
      !loading && !location == null && (
        <View>
          <Text>Sorry you must allow location</Text>
        </View>
      )
      }










    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

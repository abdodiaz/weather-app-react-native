import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './Components/WeatherInfo';
import UnitsPicker from './Components/UnitsPicker';

const WEATHER_API_KEY = 'a894bbe7a75cb44287b1b48377351eb8';
const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';
export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState('metric');
  useEffect(() => {
    load()
  }, [unitSystem]);
  async function load() {
    setCurrentWeather(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Access to location is needed to run this app');
        return

      }
      const location = await Location.getCurrentPositionAsync();
      const weatherUrl = `${WEATHER_API_URL}?lat=${location.coords.latitude}&units=${unitSystem}&lon=${location.coords.longitude}&appid=${WEATHER_API_KEY}`;
      const { latitude, longitude } = location.coords;

      const response = await fetch(weatherUrl);
      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }

    } catch (error) {


      setErrorMessage(error.message);
    }
  }
  if (currentWeather) {
    // const { main: { temp } } = currentWeather;
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
         <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
          <WeatherInfo currentWeather={currentWeather}/>
        </View>

      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
});


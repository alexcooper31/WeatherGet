import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container } from 'native-base';
import { loadAsync } from 'expo-font';

import Cities from './src/Screens/Cities';
import Home from './src/Screens/Home';
import Weather from './src/Screens/Weather';

const Stack = createStackNavigator();

const App = () => {
  const [ready, setReady] = useState<boolean>(false);

  const loadFonts = useCallback(async () => {
    await loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) {
      loadFonts()
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <Container>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen options={{headerShown: false}} name='Home' component={Home} />
          <Stack.Screen options={{headerShown: false}} name='Cities' component={Cities} />
          <Stack.Screen options={{headerShown: false}} name='Weather' component={Weather} />
        </Stack.Navigator>
      </NavigationContainer>
    </Container>
  );
}

export default App;

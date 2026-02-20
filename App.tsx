/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Sigin from './UI/Sigin';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Homescreen from './UI/Home';
import Login from './UI/Login';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        {/* ✅ Screen ka naam 'Login' hona zaroori hai */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Sigin} />
        <Stack.Screen name="Home" component={Homescreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const Stack = createNativeStackNavigator();


export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Sigin from './UI/Sigin';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Homescreen from './UI/Home';
import Login from './UI/Login';

// Stack must be declared before it is used in JSX
const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={Sigin} />
          <Stack.Screen name="Home" component={Homescreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

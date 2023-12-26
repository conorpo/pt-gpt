import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { DefaultTheme, NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

//Initialize Firebase
import _ from './config/firebaseConfig';

//Screens
import ChatScreen from './screens/Chat.js';
import ProfileScreen from './screens/Profile.js';
import LoginScreen from './screens/Login.js';

//User Context
import {MainProvider} from './contexts/Main.js';

const Stack = createNativeStackNavigator();

const DarkTheme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffc904', //UCF Gold
    background: '#222222',
    text: '#ffffff',
    border: '#1a1a1a',
  },
}

const App = () => {
  return (
    <MainProvider>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            // headerBackground: () => (
            //   <Image
            //     style={styles.header}
            //     source={require('./assets/imgs/logos/banner_logo.png')}
            //   />
            // ),
          }}
        >
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen}
            options={{
              headerShown: false,
            }} 

          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MainProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#44d2de',
  },
  header: {
    height: 100,
    width: '100%',
    resizeMode: 'contain',
  }
});

export default App;
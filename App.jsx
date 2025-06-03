/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


// import * as React from 'react';
// import {Home, About, Detail, Bookmark} from './src/screens';
// export default function App() {
//   return <Home />;
// }

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation/Router';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

async function registerAppWithFCM() {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();

  console.log('FCM token', token);
}

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
registerAppWithFCM();
export default function App() {
  return (
    <NavigationContainer>
     <Router/>
    </NavigationContainer>
  );
}

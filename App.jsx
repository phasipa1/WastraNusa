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
export default function App() {
  return (
    <NavigationContainer>
     <Router/>
    </NavigationContainer>
  );
}

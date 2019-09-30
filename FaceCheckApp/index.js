/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import { Provider as PaperProvider } from 'react-native-paper';

export default function Main() {
    return (
      <PaperProvider>
        <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent('FaceCheckApp', () => Main);

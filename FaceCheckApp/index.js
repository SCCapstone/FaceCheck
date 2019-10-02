/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// Uncomment when demoing
// console.disableYellowBox = true;

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#b71c1c',
    accent: '#ffffff',
    // background: '#484848'
  }
};

export default function Main() {
    return (
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent('FaceCheckApp', () => Main);

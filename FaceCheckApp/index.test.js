// index.test.js
/**
 * @format
 */
import App from './src/App';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/redux/app-redux';
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Tester, TestHookStore} from 'cavy';
import studentNavigation from './specs/studentNavigation';
import teacherNavigation from './specs/teacherNavigation';
import signUpSpec from './specs/signUpSpec';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#b71c1c',
    accent: '#ffffff',
    // background: '#484848'
  },
};

const testHookStore = new TestHookStore();

class AppWrapper extends Component {
  render() {
    return (
      //, studentNavigation, teacherNavigation
      <Tester
        specs={[signUpSpec, studentNavigation, teacherNavigation]}
        clearAsyncStorage={true}
        store={testHookStore}
        waitTime={1000}>
        <ReduxProvider store={store}>
          <PaperProvider theme={theme}>
            <App />
          </PaperProvider>
        </ReduxProvider>
      </Tester>
    );
  }
}

// Remember to replace with your app name below!
AppRegistry.registerComponent('FaceCheckApp', () => AppWrapper);

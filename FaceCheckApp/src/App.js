import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
// import the different screens
import Loading from 'FaceCheckApp/src/Loading'
import SignUp from 'FaceCheckApp/src/auth/SignUp'
import Login from 'FaceCheckApp/src/auth/Login'
import Main from 'FaceCheckApp/src/Main'
// create our app's navigation stack
const RootStack = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
)

const App = createAppContainer(RootStack)

export default App

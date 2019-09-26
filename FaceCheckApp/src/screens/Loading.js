// Loading.js
import firebase from 'react-native-firebase'
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
export default class Loading extends React.Component {
   componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      // !! Loading is used to set initial navication
      // TODO: Add future check on logged in user to determin teacher or student
      // login flow
        this.props.navigation.navigate(user ? 'StudentHome' : 'Login')
    })
   }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

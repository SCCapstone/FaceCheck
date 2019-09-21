// Main.js
import firebase from 'react-native-firebase'
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
export default class Main extends React.Component {
    state = { currentUser: null }

    componentDidMount() {
      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
    }

    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

render() {
    const { currentUser } = this.state
    return (
        <View style={styles.container}>
            <Text>
            Hi {currentUser && currentUser.email}!
            </Text>
            <Button title="Logout" onPress={this.signOutUser} />
        </View>
        )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

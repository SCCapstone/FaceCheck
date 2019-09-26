import firebase from 'react-native-firebase'
import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class StudentHomeScreen extends React.Component {
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
          <Text style={styles.text}>Welcome back </Text>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {this.props.navigation.navigate('AddClassScreen')}}>
          <Text style={styles.TouchableOpacityText}>Go To Add A Class</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {this.props.navigation.navigate('QRGeneratorScreen')}}>
          <Text style={styles.TouchableOpacityText}>Go To QR</Text>
        </TouchableOpacity>
        <Text style = {styles.text}>
        Hi {currentUser && currentUser.email}!
        </Text>
        <Button title="Logout" onPress={this.signOutUser} />
        </View>
        )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 40,
  },
  TouchableOpacity: {
    margin: 5,
  },
  TouchableOpacityText: {
    color: 'blue',
    textAlign: 'center'
  }
});

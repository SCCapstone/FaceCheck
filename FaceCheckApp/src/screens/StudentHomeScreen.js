import firebase from 'react-native-firebase'
import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from 'FaceCheckApp/src/assets/styles'

export default class StudentHomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerLeft: (<Button title="Logout" onPress={
      async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
      }
    }/>),
    gesturesEnabled: false,
  };

  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state
    return (
        <View style={styles.container}>
          {/* <Text style = {styles.text}> Hi {currentUser && currentUser.email}! </Text> */}
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {this.props.navigation.navigate('AddClass')}}>
            <Text style={styles.TouchableOpacityText}>Go To Add A Class</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {this.props.navigation.navigate('QRGenerator')}}>
            <Text style={styles.TouchableOpacityText}>Go To QR</Text>
          </TouchableOpacity>
        </View>
        )
  }
}

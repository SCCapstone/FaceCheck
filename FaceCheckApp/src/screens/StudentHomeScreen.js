import firebase from 'react-native-firebase'
import React from 'react';
import { Appbar } from 'react-native-paper';
import { Text, StyleSheet, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from 'FaceCheckApp/src/assets/styles'

export default class StudentHomeScreen extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state
    return (
      <View style = {styles.screen}>
        <Appbar.Header>
          <Appbar.BackAction
            title = 'Logout'
            onPress={() => {firebase.auth().signOut()}}
          />
          <Appbar.Content
            title="Home"
          />
        </Appbar.Header>
        <View style={styles.container}>
          {/* <Text style = {styles.text}> Hi {currentUser && currentUser.email}! </Text> */}
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {this.props.navigation.navigate('AddClass')}}>
            <Text style={styles.TouchableOpacityText}>Go To Add A Class</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {this.props.navigation.navigate('QRGenerator')}}>
            <Text style={styles.TouchableOpacityText}>Go To QR</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

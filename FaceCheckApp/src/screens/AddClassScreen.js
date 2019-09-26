import firebase from 'react-native-firebase'
import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from 'FaceCheckApp/src/assets/styles'

export default class AddClassScreen extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state
    return (
      <View style ={styles.view}>
        {/* TODO: Add Stuff */}
      </View>
    )
  }
}

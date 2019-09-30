import firebase from 'react-native-firebase'
import React from 'react';
import { Appbar } from 'react-native-paper';
import { Text, StyleSheet, View, Button } from 'react-native';

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
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {this.props.navigation.goBack()}}
        />
        <Appbar.Content
          title="Add a Class"
        />
      </Appbar.Header>
    )
  }
}

import firebase from 'react-native-firebase'
import React from 'react'
import { View } from 'react-native'
import { Appbar } from 'react-native-paper'
import QR from 'FaceCheckApp/src/components/QR'
import styles from 'FaceCheckApp/src/assets/styles'

export default class QRGeneratorScreen extends React.Component {
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
            onPress={() => {this.props.navigation.goBack()}}
          />
          <Appbar.Content 
            title="QR"
          />
        </Appbar.Header>
        <View style={styles.centerScreenJust}>
          <QR/>
        </View>
      </View>
    )
  }
}

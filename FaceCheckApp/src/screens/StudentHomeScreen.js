import firebase from 'react-native-firebase'
import React from 'react'
import { FAB, Portal, Appbar } from 'react-native-paper'
import { View, ScrollView } from 'react-native'
import ClassCards from 'FaceCheckApp/src/components/ClassCards.js'
import styles from 'FaceCheckApp/src/assets/styles'

export default class StudentHomeScreen extends React.Component {
  state = { currentUser: null, open: false }

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
        <ScrollView>
          <ClassCards navigation={this.props.navigation}/>
        </ScrollView>
        <Portal>
          <FAB.Group
            open={this.state.open}
            icon={this.state.open ? 'details' : 'class'}
            actions={[
              { icon: 'add', label: 'add a class', onPress: () => {ClassCards.forceUpdate()} }
            ]}
            onStateChange={({ open }) => this.setState({ open })}
          />
          </Portal>
      </View>
    )
  }
}

import firebase from 'react-native-firebase'
import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class AddClassScreen extends React.Component {
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
      <View style ={styles.view}>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {this.props.navigation.navigate('StudentHomeScreen')}}>
          <Text style={styles.TouchableOpacityText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Add A Class</Text>
        <Button title="Logout" onPress={this.signOutUser} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: 40,
    flexDirection: "row",
  },
  text: {
    fontSize: 30,
  },
  TouchableOpacity: {
    margin: 10,
    width: 50,
  },
  TouchableOpacityText: {
    color: 'blue',
  }
});

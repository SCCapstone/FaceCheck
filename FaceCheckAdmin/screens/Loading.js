// Imports 
import Firebase from '../config/Firebase';
import React from 'react';
import {View, Text, ActivityIndicator,  StyleSheet} from 'react-native';

export default class Loading extends React.Component {
  componentDidMount() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Login')
      }
    })
  }

  render() {
    return (
    <View style = { styles.MainContainer }>
      <Text style = { styles.Text } >Loading</Text>
      <ActivityIndicator size="large" color='#7B1D0B'/>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  Text: {
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 13,
    borderColor: 'transparent',
    fontSize: 20,
    paddingBottom: 10,
    color: '#7B1D0B'
  }
})
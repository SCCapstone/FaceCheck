import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

import Firebase from '../config/Firebase'

export default class HomePage extends React.Component {
  render() {
    
      return (
          <View style = {styles.mainContainer}>
            <View style = {styles.container1}>
              <View style = {styles.signout}>
                <TouchableOpacity  
                  style = {styles.sobutton}
                  onPress={() => {
                  Firebase.auth().signOut()
                  }}>
                  <Text style = {styles.sobuttonText}>signout</Text>
                </TouchableOpacity>
              </View> 
            </View>
            <View style = {styles.container2}>
              <Image style = {styles.logo } source={require('../assets/logo.png')} />
            </View>
            <View style = {styles.container3}>
                  <TouchableOpacity style = {styles.button} onPress = {() => this.props.navigation.navigate('AddClass')}>
                      <Text style = {styles.TextStyle}>add class</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style = {styles.button} onPress = {() => this.props.navigation.navigate('AddTeacher')}>
                      <Text style = {styles.TextStyle}>add teacher</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style = {styles.button} onPress = {() => this.props.navigation.navigate('AssignClass')}>
                      <Text style = {styles.TextStyle}>assign class</Text>
                  </TouchableOpacity>

            </View>
          </View>
      )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
      flex: 1,
      backgroundColor: 'white',
  },
  signout: {
      flex: 1,
      alignItems: "flex-end",
      marginRight: 25,
      justifyContent: 'center',
      maxHeight: '8%'
  },
  sobutton: {
      alignItems: 'flex-end',
 
  },
  sobuttonText: {
      fontSize: 20,
      color: 'black'
  },
  container1: {
    flex: 1,
    backgroundColor: '#ebebeb',
    maxHeight: 65,
    justifyContent: 'center'
   
  },
  container2: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 300,
  },
  container3: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
    button: {
      margin: '5%',
      backgroundColor: '#7B1D0B',
      justifyContent: 'center',
      alignItems: 'center',
      width: 230,
      height: 80,
      borderRadius: 15
    },
    TextStyle: {
      color: 'white',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold'
    },
    logo: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 300,
      height: 300,
      marginTop: 130        
  }
})


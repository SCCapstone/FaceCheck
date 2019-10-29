// Imports 
import Firebase from '../config/Firebase';
import React from 'react';
import {View, Text, ActivityIndicator,  StyleSheet} from 'react-native';
import { StackActions } from 'react-navigation';



export default class Loading extends React.Component {
    componentDidMount() {
      Firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.navigation.navigate('HomePage');
        } else {
          StackActions.reset({
            index: 0,
            actions: [this.props.navigation.navigate('Login')],
          });
        }
      });
    }
    render() {
        return (

            
            <View style = { styles.MainContainer }>
                <Text style = { styles.Text } >Loading</Text>
                <ActivityIndicator size="large" color='red'/>
            </View>
        );
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
      borderColor: '#fff',
      fontSize: 20,
      paddingBottom: 10
    },

}); // End of styles
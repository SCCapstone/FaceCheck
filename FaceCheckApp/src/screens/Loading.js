import firebase from 'react-native-firebase';
import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {StackActions} from 'react-navigation';
const db = firebase.firestore();

import styles from 'FaceCheckApp/src/assets/styles';

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            const userType = doc.data().userType;
            if (userType == 'Student') {
              this.props.navigation.navigate('StudentHome');
            } else if (userType == 'Teacher') {
              this.props.navigation.navigate('TeacherHome');
            } else {
              console.log(
                'Unknown User Type. This is a bug and should be reported!',
              );
            }
          });
      } else {
        console.log('In Loading, No User');
        StackActions.reset({
          index: 0,
          actions: [this.props.navigation.navigate('Login')],
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.centerScreenJust}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

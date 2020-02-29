import firebase from 'react-native-firebase';
import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {StackActions} from 'react-navigation';
import firestore from 'react-native-firebase/firestore';

import styles from 'FaceCheckApp/src/assets/styles';

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      // !! Loading is used to set initial navication
      // TODO: Add future check on logged in user to determin teacher or student
      // login flow
      if (user) {
        firestore()
          .collection('users')
          .document(user.uid)
          .get()
          .then(doc => {
            const userType = doc.data().userType;
            switch (userType) {
              case 'Student':
                this.props.navigation.navigate('StudentHome');
              case 'Teacher':
                this.props.navigation.navigate('TeacherHome');
              default:
                console.log('Unknown User Type. This is a bug, please report!');
            }
          });
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
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

import firebase from 'react-native-firebase';
import React from 'react';
import {FAB, Appbar} from 'react-native-paper';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import ClassCards from 'FaceCheckApp/src/components/ClassCards.js';
import styles from 'FaceCheckApp/src/assets/styles';

export default class TeacherHomePageScreen extends React.Component {
  //TODO everything
  state = {currentUser: null, open: false};

  componentDidMount() {
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
  }
  render() {
    const {currentUser} = this.state;
  return (
    <View style={styles.screen}>
        <Appbar.Header>
          <Appbar.BackAction
            title="Logout"
            onPress={() => {
              firebase.auth().signOut();
            }}
          />
          <Appbar.Content title="Teacher Home" />
        </Appbar.Header>
        <ScrollView>
          <ClassCards navigation={this.props.navigation} />
        </ScrollView>
        <TouchableOpacity style={styles.touchable}
        onPress={() => this.props.navigation.navigate('StudentHome')}>
        <Text style={styles.touchable}>Go to Student Home Page </Text>
        </TouchableOpacity>
      </View>
  );

  };
};
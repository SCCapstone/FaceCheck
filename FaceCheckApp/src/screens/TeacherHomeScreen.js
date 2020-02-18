import firebase from 'react-native-firebase';
import React from 'react';
import {FAB, Portal, Appbar} from 'react-native-paper';
import {View, ScrollView} from 'react-native';
import TeacherClassCards from 'FaceCheckApp/src/components/TeacherClassCards.js';
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
          <TeacherClassCards navigation={this.props.navigation} />
        </ScrollView>
        <FAB.Group
          open={this.state.open}
          icon={this.state.open ? 'details' : 'class'}
          actions={[
            {
              icon: 'star',
              label: 'student home page',
              onPress: () => {
                this.props.navigation.navigate('StudentHome');
              },
            },
            {icon: 'add', label: 'add a class', onPress: () => {}},
            {
              icon: 'burst-mode',
              label: 'qr scanner',
              onPress: () => {
                this.props.navigation.navigate('QRScanner');
              },
            },
            {
              icon: 'keyboard-return',
              label: 'log-out',
              onPress: () => {
                firebase.auth().signOut();
              },
            },
          ]}
          
          onStateChange={({open}) => this.setState({open})}
        />
      </View>
    );
  }
}

import firebase from 'react-native-firebase';
import React from 'react';
import {FAB, Portal, Appbar} from 'react-native-paper';
import {View, ScrollView, Button, BackHandler} from 'react-native';
import TeacherClassCards from 'FaceCheckApp/src/components/TeacherClassCards.js';
import styles from 'FaceCheckApp/src/assets/styles';
import {hook, useCavy, wrap} from 'cavy';
import {StackActions} from 'react-navigation';

class TeacherHomePageScreen extends React.Component {
  //TODO everything
  state = {currentUser: null, open: false};

  componentDidMount() {
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    console.log('Back button is pressed');
    return true;
  }
  render() {
    const {currentUser} = this.state;
    return (
      <View style={styles.screen}>
        <Appbar.Header>
          <Button
            //ref={this.props.generateTestHook('Scene.studentHomeBackButton')}
            title="Log Out"
            color="#7B1D0B"
            onPress={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  StackActions.reset({
                    index: 0,
                    actions: [this.props.navigation.navigate('Login')],
                  });
                });
            }}
          />
          <Appbar.Content title="Teacher Home" style={{marginRight: 45}} />
        </Appbar.Header>
        <ScrollView>
          <TeacherClassCards navigation={this.props.navigation} />
        </ScrollView>
        {/* <FAB.Group
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
        /> */}
      </View>
    );
  }
}

export default hook(TeacherHomePageScreen);

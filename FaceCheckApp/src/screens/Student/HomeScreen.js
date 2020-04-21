import firebase from 'react-native-firebase';
import React from 'react';
import {FAB, Portal, Appbar} from 'react-native-paper';
import {View, ScrollView, Button, BackHandler} from 'react-native';
import ClassCards from 'FaceCheckApp/src/components/ClassCards';
import styles from 'FaceCheckApp/src/assets/styles';
import {hook, useCavy, wrap} from 'cavy';
import {StackActions} from 'react-navigation';

//const generateTestHook = useCavy();
//const TestableClassCards = wrap(ClassCards);
//<TestableClassCards ref={generateTestHook('Scene.ClassCard') navigation={this.props.navigation}}/>;

class StudentHomeScreen extends React.Component {
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
    // const count = Object.keys(attendance).reduce((total, key) => { return total + (!attendance[key] || attendance[key].find(s => s.uid === currentUser.uid) ? 0 : 1)}, 0)

    return (
      <View style={styles.screen}>
        <Appbar.Header>
          <Button
            ref={this.props.generateTestHook('Scene.studentHomeBackButton')}
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

          <Appbar.Content title="Student Home" style={{marginRight: 45}} />
        </Appbar.Header>
        <ScrollView>
          {this.state.currentUser && (
            <ClassCards
              navigation={this.props.navigation}
              userId={this.state.currentUser.uid}
            />
          )}
        </ScrollView>
        {/* <FAB.Group
          open={this.state.open}
          icon={this.state.open ? 'details' : 'class'}
          actions={[
            {icon: 'add', label: 'add a class', onPress: () => {}},
            {
              icon: 'code',
              label: 'qr generator',
              onPress: () => {
                this.props.navigation.navigate('QRGenerator');
              },
            },
            {
              icon: 'burst-mode',
              label: 'qr scanner',
              onPress: () => {
                this.props.navigation.navigate('QRScanner');
              },
            },
            {
              icon: 'star',
              label: 'teacher home page',
              onPress: () => {
                this.props.navigation.navigate('TeacherHome');
              },
            },
            {
              icon: 'face',
              label: 'face scanner',
              onPress: () => {
                this.props.navigation.navigate('FaceScanner');
              },
            },
            {
              icon: 'keyboard-tab',
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

export default hook(StudentHomeScreen);

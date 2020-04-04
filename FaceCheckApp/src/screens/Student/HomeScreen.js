import firebase from 'react-native-firebase';
import React from 'react';
import {FAB, Portal, Appbar} from 'react-native-paper';
import {View, ScrollView, Button} from 'react-native';
import ClassCards from 'FaceCheckApp/src/components/ClassCards';
import styles from 'FaceCheckApp/src/assets/styles';
import {hook, useCavy, wrap} from 'cavy';

//const generateTestHook = useCavy();
//const TestableClassCards = wrap(ClassCards);
//<TestableClassCards ref={generateTestHook('Scene.ClassCard') navigation={this.props.navigation}}/>;

class StudentHomeScreen extends React.Component {
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
          <Button
            ref={this.props.generateTestHook('Scene.studentHomeBackButton')}
            title="Log Out"
            color="#EEEEEE"
            onPress={() => {
              firebase.auth().signOut();
            }}
          />

          <Appbar.Content title="Student Home" />
        </Appbar.Header>
        <ScrollView>
          <ClassCards navigation={this.props.navigation} />
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

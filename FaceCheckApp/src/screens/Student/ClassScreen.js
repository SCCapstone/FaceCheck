import firebase from 'react-native-firebase';
import React from 'react';
import {Appbar, Card} from 'react-native-paper';
import {View, BackHandler} from 'react-native';
import QRGenerator from 'FaceCheckApp/src/components/QRGenerator';
import styles from 'FaceCheckApp/src/assets/styles';
import {hook} from 'cavy';
class AddClassScreen extends React.Component {
  state = {currentUser: null};

  componentDidMount() {
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
    BackHandler.addEventListener('backToClasses', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backToClasses', this.handleBackButton);
  }

  handleBackButton() {
    console.log('backToClasses button is pressed');
    return true;
  }

  render() {
    const {currentUser} = this.state;
    var currClass = JSON.parse(this.props.navigation.getParam('currClass'));
    return (
      <View style={styles.screen}>
        <Appbar.Header>
          <Appbar.BackAction
            ref={this.props.generateTestHook('Scene.studentClassBackButton')}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <Appbar.Content title={currClass.className} />
        </Appbar.Header>
        <View style={styles.centerScreenJust}>
          <QRGenerator currClass={currClass} />
        </View>
      </View>
    );
  }
}

export default hook(AddClassScreen);

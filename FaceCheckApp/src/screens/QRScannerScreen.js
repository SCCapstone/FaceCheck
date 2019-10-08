import firebase from 'react-native-firebase';
import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import styles from 'FaceCheckApp/src/assets/styles';
import {RNCamera} from 'react-native-camera';

export default class QRScannerScreen extends React.Component {
  state = {currentUser: null};

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
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <Appbar.Content title="QRScanner" />
        </Appbar.Header>
        <RNCamera 
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
        />
      </View>
    );
  }
}

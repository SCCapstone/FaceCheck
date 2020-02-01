import firebase from 'react-native-firebase';
import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import QRGenerator from 'FaceCheckApp/src/components/QRGenerator';
import styles from 'FaceCheckApp/src/assets/styles';

export default class QRGeneratorScreen extends React.Component {
  state = {currentUser: null};

  componentDidMount() {
    if (process.env.NODE_ENV !== 'test') {
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
    }
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
          <Appbar.Content title="QR" />
        </Appbar.Header>
        <View style={styles.centerScreenJust}>
          <QRGenerator />
        </View>
      </View>
    );
  }
}

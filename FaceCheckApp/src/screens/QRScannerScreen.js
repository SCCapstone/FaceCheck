import firebase from 'react-native-firebase';
import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import QRScanner from 'FaceCheckApp/src/components/QRScanner';
import styles from 'FaceCheckApp/src/assets/styles';

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
        <QRScanner navigation={this.props.navigation}/>
      </View>
    );
  }
}

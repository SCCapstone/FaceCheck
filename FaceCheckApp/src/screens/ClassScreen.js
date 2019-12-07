import firebase from 'react-native-firebase';
import React from 'react';
import {Appbar, Card} from 'react-native-paper';
import {View} from 'react-native';
import styles from 'FaceCheckApp/src/assets/styles';

export default class AddClassScreen extends React.Component {
  state = {currentUser: null};

  componentDidMount() {
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
  }

  render() {
    const {currentUser} = this.state;
    var currClass = JSON.parse(this.props.navigation.getParam('currClass'));
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <Appbar.Content title={currClass.className} />
        </Appbar.Header>
      </View>
    );
  }
}

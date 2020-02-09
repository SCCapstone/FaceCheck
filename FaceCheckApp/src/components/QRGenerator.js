import firebase from 'react-native-firebase';
import React, {Component} from 'react';
import {View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {Surface} from 'react-native-paper';
import {hook, wrap} from 'cavy';

import styles from 'FaceCheckApp/src/assets/styles';

class QRGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {init: true, seconds: 0, uid: null};
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
    const {uid} = firebase.auth().currentUser;
    this.setState({uid});
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({seconds: new Date().getSeconds()});
  }

  shouldComponentUpdate() {
    return (this.state.seconds + 1) % 30 == 0;
  }

  render() {
    const qrData = JSON.stringify({
      uid: this.state.uid,
      totpCode: Math.floor(Math.random() * Math.floor(999999)),
    });
    const TestableFunctionComponent = wrap(QRCode);
    return (
      <View style={styles.centerItem}>
        <Surface style={styles.surface}>
          <TestableFunctionComponent
            ref={this.props.generateTestHook('Scene.QRCode')}
            style={{alignItems: 'center'}}
            value={qrData}
            size={150}
            ecl="Q"
          />
        </Surface>
      </View>
    );
  }
}

export default hook(QRGenerator);
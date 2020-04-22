import firebase from 'react-native-firebase';
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {Surface} from 'react-native-paper';
import {totp} from 'otplib';

import styles from 'FaceCheckApp/src/assets/styles';

export default class QRGenerator extends React.Component {
  constructor(props) {
    super(props);
    const uid = firebase.auth().currentUser.uid;
    this.state = {
      init: true,
      seconds: 0,
      uid: uid,
      secret: undefined,
      userData: {},
      currClass: this.props.currClass,
    };
    const user = firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(doc => {
        const data = doc.data();
        const secret = data.userSecret;
        this.setState({secret: secret, userData: data});
      });
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
    if (process.env.NODE_ENV !== 'test') {
      const {uid} = firebase.auth().currentUser;
      this.setState({uid});
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({seconds: new Date().getSeconds()});
  }

  shouldComponentUpdate(_nextProps, nextState) {
    if (this.state.secret != nextState.secret) {
      return true;
    } else {
      return (this.state.seconds + 1) % 30 == 0;
    }
  }

  render() {
    const token =
      this.state.secret != undefined
        ? totp.generate(this.state.secret)
        : undefined;
    const qrData = {
      uid: this.state.uid,
      token: token,
      teacherUID: this.state.currClass.TeacherUID,
      time: this.state.currClass.Time,
      userName: this.state.userData.email,
    };
    const qrDataString = JSON.stringify(qrData);
    console.log(this.state.currClass);
    return (
      <View style={styles.centerItem}>
        <Surface style={styles.surface}>
          {this.state.secret != undefined ? (
            <QRCode
              style={{alignItems: 'center'}}
              value={qrDataString}
              size={150}
              ecl="Q"
            />
          ) : (
            <ActivityIndicator size="large" />
          )}
        </Surface>
      </View>
    );
  }
}

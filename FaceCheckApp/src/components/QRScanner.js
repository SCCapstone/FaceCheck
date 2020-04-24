import firebase from 'react-native-firebase';
import React from 'react';
import {View} from 'react-native';
import {Dialog, Paragraph, Appbar} from 'react-native-paper';
import {RNCamera} from 'react-native-camera';
import styles from 'FaceCheckApp/src/assets/styles';
import {totp} from 'otplib';
import {debounce} from 'lodash';

export default class QRScanner extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    date = new Date();
    currDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    this.state = {
      focusedScreen: false,
      visible: false,
      currClass: {},
      attendance: undefined,
      currDate: currDate,
      email: '',
    };
    this._barcodeRecognized = debounce(this._barcodeRecognized, 1250, {
      leading: true,
      trailing: false,
    });
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.didFocusListener = navigation.addListener('didFocus', () => {
      this.setState({focusedScreen: true});
    });
    totp.options = {window: [-2, 2]};
  }

  componentWillUnmount() {
    this.didFocusListener && this.didFocusListener.remove();
  }

  _showDialog = () => this.setState({visible: true});

  _hideDialog = () => this.setState({visible: false});

  _updateFirestoreAttendance() {
    var currClass = JSON.parse(this.props.navigation.getParam('currClass'));
    var newAttendance = currClass.Attendance;
    newAttendance[this.state.currDate] = this.state.attendance;
    return firebase
      .firestore()
      .collection('classes')
      .doc(currClass.docID)
      .update({Attendance: newAttendance})
      .then(() => {
        this.props.navigation.goBack();
      });
  }

  _setAttendance(currClass) {
    const currDate = this.state.currDate;
    if (currClass.Attendance[currDate] == undefined) {
      this.setState({attendance: currClass.Students});
    } else {
      this.setState({attendance: currClass.Attendance[currDate]});
    }
  }

  _getStudentIndex = uid => {
    const attendance = this.state.attendance;
    var index = 0;
    for (let i = 0; i < attendance.length; i++) {
      if (uid == attendance[i].uid) {
        index = i;
      }
    }
    return index;
  };

  _logAttendance(uid) {
    studentIndex = this._getStudentIndex(uid);
    var newAttendance = this.state.attendance;
    newAttendance[studentIndex]['present'] = true;
    console.log(newAttendance);
    this.setState({attendance: newAttendance});
  }

  _validateStudent(data) {
    const qrcodeData = JSON.parse(data);
    const uid = qrcodeData.uid;
    const token = qrcodeData.token;
    const teacherUID = qrcodeData.teacherUID;
    const time = qrcodeData.time;
    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(doc => {
        const data = doc.data();
        const secret = data.userSecret;
        const isValid = totp.verify({token, secret});
        var currClass = JSON.parse(this.props.navigation.getParam('currClass'));
        console.log('currClass: ', currClass);
        if (
          isValid &&
          currClass.TeacherUID == teacherUID &&
          currClass.Time == time
        ) {
          if (this.state.attendance == undefined) {
            this._setAttendance(currClass);
          }
          this._logAttendance(uid);
          console.log('valid attendance');
          this.setState({email: data.email});
        } else {
          console.log('invalid attendance');
        }
      });
  }

  _barcodeRecognized(data) {
    if (data !== undefined) {
      this._validateStudent(data);
      this._showDialog();
      setTimeout(() => {
        this._hideDialog();
      }, 2000);
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              this._updateFirestoreAttendance();
            }}
          />
          <Appbar.Content title="QRScanner" />
        </Appbar.Header>
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={{
              flex: 1,
              width: '100%',
            }}
            onBarCodeRead={barcode => {
              this._barcodeRecognized(barcode.data);
            }}
          />
          <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
            <Dialog.Title>{this.state.email}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Logged In</Paragraph>
            </Dialog.Content>
          </Dialog>
        </View>
      </View>
    );
  }
}

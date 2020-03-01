import firebase from 'react-native-firebase';
import React from 'react';
import {View} from 'react-native';
import {Dialog, Paragraph} from 'react-native-paper';
import {RNCamera} from 'react-native-camera';
import styles from 'FaceCheckApp/src/assets/styles';
import {totp} from 'otplib';
import {debounce} from 'lodash';

export default class QRScanner extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      focusedScreen: false,
      visible: false,
      currClass: {},
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
        if (
          isValid &&
          currClass.TeacherUID == teacherUID &&
          currClass.Time == time
        ) {
          console.log('valid attendance');
        } else {
          console.log('invalid attendance');
        }
      });
  }

  _barcodeRecognized(data) {
    if (data !== undefined) {
      // console.log(barcode);
      // this.setState({qrcodeData: data});
      this._validateStudent(data);
      this._showDialog();
      setTimeout(() => {
        this._hideDialog();
      }, 2000);
    }
  }

  render() {
    return (
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
          <Dialog.Title>QRData</Dialog.Title>
          <Dialog.Content>
            <Paragraph></Paragraph>
          </Dialog.Content>
        </Dialog>
      </View>
    );
  }
}

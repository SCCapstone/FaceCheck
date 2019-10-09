import firebase from 'react-native-firebase';
import React from 'react';
import {View} from 'react-native';
import {Dialog, Paragraph} from 'react-native-paper';
import {RNCamera} from 'react-native-camera';
import styles from 'FaceCheckApp/src/assets/styles';

export default class QRScanner extends React.Component {
  state = {
    focusedScreen: false,
    visible: false,
    qrcodeData: '',
    shouldReadBarCode: true,
  };

  constructor(props) {
    super(props);
    this._isMounted = false;
  }

  componentDidMount() {
    const {navigation} = this.props;

    this.didFocusListener = navigation.addListener('didFocus', () => {
      this.setState({focusedScreen: true});
    });
    this._isMounted = true;
  }

  componentWillUnmount() {
    this.didFocusListener && this.didFocusListener.remove();
    this._isMounted = false;
  }

  _showDialog = () => this.setState({visible: true});

  _hideDialog = () => this.setState({visible: false});

  barcodeRecognized = ({barcodes}) => {
    this.setState({shouldReadBarCode: false});
    if (barcodes[0] !== undefined) {
      this.setState({qrcodeData: barcodes[0].data});
      this._showDialog();
      setTimeout(() => {
        this._isMounted && this._hideDialog();
      }, 2000);
    }
    setTimeout(() => {
        this._isMounted && this.setState({shouldReadBarCode: true});
    }, 2000);
  };

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
          onGoogleVisionBarcodesDetected={
            this.state.shouldReadBarCode ? this.barcodeRecognized : null
          }
        />
        <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
          <Dialog.Title>QRData</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{this.state.qrcodeData}</Paragraph>
          </Dialog.Content>
        </Dialog>
      </View>
    );
  }
}

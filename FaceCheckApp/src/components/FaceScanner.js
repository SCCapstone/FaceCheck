import firebase from 'react-native-firebase';
import React from 'react';
import {View} from 'react-native';
import {Dialog, Paragraph} from 'react-native-paper';
import {RNCamera} from 'react-native-camera';
import styles from 'FaceCheckApp/src/assets/styles';

export default class FaceScanner extends React.Component {
  state = {
    focusedScreen: false,
    visible: false,
    facialData: 'nothingrn'
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
          type={RNCamera.Constants.Type.front}
          faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
          onFacesDetected={this._showDialog}
        />
        <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
          <Dialog.Title>Facial Data Recognized</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{this.state.facialData}</Paragraph>
          </Dialog.Content>
        </Dialog>
      </View>
    );
  }
}

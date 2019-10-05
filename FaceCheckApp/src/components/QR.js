import firebase from 'react-native-firebase'
import React from 'react'
import { View } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import { Surface } from 'react-native-paper'

import styles from 'FaceCheckApp/src/assets/styles'

export default class QR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {init: true, seconds: 0}
      }
    
    componentDidMount() {
        this.interval = setInterval(() => {this.tick()}, 1000);
      }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        this.setState({seconds: (new Date().getSeconds())})
    }

    shouldComponentUpdate() {
        return ((this.state.seconds+1)%30 == 0)
    }


  render() {
    time = this.state.seconds.toString()
    return (
        <View style={styles.centerItem}>
          <Surface style={styles.surface}>
            <QRCode style={{alignItems: 'center'}}
              value={time}
              size={150}
              ecl= "Q"
            />
          </Surface>
        </View>
    )
  }
}

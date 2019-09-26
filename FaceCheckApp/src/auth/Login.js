// Login.js
import firebase from 'react-native-firebase'
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

import styles from 'FaceCheckApp/src/assets/styles'

export default class Login extends React.Component {
    state = { email: '', password: '', errorMessage: null }
    handleLogin = () => {
      const { email, pasword } = this.state
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        // TODO: Add variable to handle teacher login
        .then(() => this.props.navigation.navigate('StudentHome'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }
  render() {
    return (
      <View style={styles.container}>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
    )
  }
}

// SignUp.js
import firebase from 'react-native-firebase'
import React from 'react'
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

import styles from 'FaceCheckApp/src/assets/styles'

export default class SignUp extends React.Component {
    state = { email: '', password: '', errorMessage: null }
    handleSignUp = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        // TODO: Change StudentHomeScreen to variable to manage teacher signup
        .then(() => this.props.navigation.navigate('StudentHome'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }
render() {
    return (
      <View style = {styles.screen}>
        <Appbar.Header>
        <Appbar.Content
          title="Sign Up"
        />
        </Appbar.Header>
        <View style={styles.container}>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button title="Sign Up" onPress={this.handleSignUp} />
          <Button
            title="Already have an account? Login"
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      </View>
    )
  }
}

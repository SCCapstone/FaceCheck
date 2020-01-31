import firebase from 'react-native-firebase';
import React from 'react';
import {Appbar, Card, TextInput, Button} from 'react-native-paper';
import {Text, View, Image} from 'react-native';
import {hook} from 'cavy';

import styles from 'FaceCheckApp/src/assets/styles';

class SignUp extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      // TODO: Change StudentHomeScreen to variable to manage teacher signup
      .then(() => this.props.navigation.navigate('StudentHome'))
      .catch(error => this.setState({errorMessage: error.message}));
  };
  render() {
    return (
      <View style={styles.screen}>
        <Appbar.Header style={{zIndex: 1}}>
          <Appbar.Content title="Sign Up" />
        </Appbar.Header>
        <Card style={styles.centerScreen}>
          <Card.Content>
            {this.state.errorMessage && (
              <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
            )}
            <View style={{zIndex: -1}}>
              <Image
                ref={this.props.generateTestHook('Scene.Image')}
                style={styles.logo}
                source={require('FaceCheckApp/src/assets/Logo.png')}
              />
            </View>
            <TextInput
              ref={this.props.generateTestHook('Scene.SignUpEmail')}
              placeholder="Email"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            />
            <TextInput
              ref={this.props.generateTestHook('Scene.SignUpPassword')}
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={password => this.setState({password})}
              value={this.state.password}
            />
            <Button
              ref={this.props.generateTestHook('Scene.handleSignUp')}
              style={styles.button}
              mode="outlined"
              onPress={this.handleSignUp}>
              Sign Up
            </Button>
            <Button
              ref={this.props.generateTestHook('Scene.backToLogin')}
              style={styles.button}
              mode="outlined"
              onPress={() => this.props.navigation.navigate('Login')}>
              Login
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

export default hook(SignUp);

import firebase from 'react-native-firebase';
import React, {Component} from 'react';
import {Appbar, Card, TextInput, Button} from 'react-native-paper';
import {Text, View, Image} from 'react-native';
import styles from 'FaceCheckApp/src/assets/styles';
import {hook} from 'cavy';

class Login extends Component {
  state = {email: '', password: '', errorMessage: null};

  handleLogin = () => {
    const {email, pasword} = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      // TODO: Add variable to handle teacher login
      .then(() => this.props.navigation.navigate('StudentHome'))
      .catch(error => this.setState({errorMessage: error.message}));
  };

  render() {
    return (
      <View style={styles.screen}>
        <Appbar.Header style={{zIndex: 1}}>
          <Appbar.Content title="Login" />
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
              ref={this.props.generateTestHook('Scene.LoginEmail')}
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            />
            <TextInput
              ref={this.props.generateTestHook('Scene.LoginPassword')}
              secureTextEntry
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={password => this.setState({password})}
              value={this.state.password}
            />
            <Button
              ref={this.props.generateTestHook('Scene.LoginButton')}
              style={styles.button}
              mode="outlined"
              onPress={this.handleLogin}>
              Login
            </Button>
            <Button
              ref={this.props.generateTestHook('Scene.SignUpButton')}
              style={styles.button}
              mode="outlined"
              onPress={() => this.props.navigation.navigate('SignUp')}>
              Sign Up
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

export default hook(Login);

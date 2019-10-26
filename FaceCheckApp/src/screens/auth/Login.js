import firebase from 'react-native-firebase';
import React from 'react';
import {Appbar, Card, TextInput, Button} from 'react-native-paper';
import {Text, View} from 'react-native';
import styles from 'FaceCheckApp/src/assets/styles';

export default class Login extends React.Component {
  state = {email: '', password: '', errorMessage: null};

  handleLogin = () => {
    const {email, pasword} = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      // TODO: Add variable to handle teacher login
      .then(() => this.props.navigation.navigate('TeacherHome'))
      .catch(error => this.setState({errorMessage: error.message}));
  };

  render() {
    return (
      <View style={styles.screen}>
        <Appbar.Header>
          <Appbar.Content title="Login" />
        </Appbar.Header>
        <Card style={styles.centerScreen}>
          <Card.Content>
            {this.state.errorMessage && (
              <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
            )}
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={password => this.setState({password})}
              value={this.state.password}
            />
            <Button
              style={styles.button}
              mode="outlined"
              onPress={this.handleLogin}>
              Login
            </Button>
            <Button
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

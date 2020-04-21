import firebase from 'react-native-firebase';
import React from 'react';
import {Appbar, Card, TextInput, Button} from 'react-native-paper';
import {Text, View, Image, BackHandler} from 'react-native';
import styles from 'FaceCheckApp/src/assets/styles';
import {hook} from 'cavy';

class Login extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    console.log('Back button is pressed');
    return true;
  }
  resetState() {
    this.setState({
      email: '',
      password: '',
      errorMessage: null,
    });
  }

  handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.resetState();
        this.props.navigation.navigate('Loading');
      })
      .catch(error => this.setState({errorMessage: error.message}));
  };

  render() {
    return (
      <View style={styles.screen}>
        <Appbar style={{zIndex: 1}}>
          <Appbar.Content title="Login" />
        </Appbar>
        <Card style={styles.centerScreen}>
          <Card.Content>
            {this.state.errorMessage && (
              <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
            )}
            <View style={styles.logo}>
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
              style={[styles.button, {flexWrap: 'wrap'}]}
              mode="text"
              uppercase={false}
              onPress={() => {
                this.resetState();
                this.props.navigation.navigate('SignUp');
              }}>
              Not a Member? Sign Up Now!
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

export default hook(Login);

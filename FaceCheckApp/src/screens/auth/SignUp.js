import firebase from 'react-native-firebase';
import React from 'react';
import {Appbar, Card, TextInput, Button} from 'react-native-paper';
import {Text, View, Image} from 'react-native';
import {hook} from 'cavy';
import {authenticator, totp} from 'otplib';
import styles from 'FaceCheckApp/src/assets/styles';
import {StackActions} from 'react-navigation';

class SignUp extends React.Component {
  state = {email: '', password: '', errorMessage: null};

  createNewSecret = () => {
    return new Promise(function(resolve, reject) {
      const secret = authenticator.generateSecret(); // base32 encoded hex secret key
      const token = totp.generate(secret);
      totp.verify({token, secret})
        ? resolve(secret)
        : reject(new Error('Failed to verify totp, please report this bug!'));
    });
  };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      // TODO: Change StudentHomeScreen to variable to manage teacher signup
      .then(data => {
        // on success, create user data
        this.createNewSecret()
          .then(secret => {
            let userData = {
              userType: 'Student',
              email: this.state.email,
              userSecret: secret,
              classes: [],
            };
            // Add user data to users collection with doc id of uid
            firebase
              .firestore()
              .collection('users')
              .doc(data.user.uid)
              .set(userData)
              .then(() => {
                StackActions.reset({
                  index: 0,
                  actions: [this.props.navigation.navigate('Login')],
                });
              })
              .catch(error => this.setState({errorMessage: error.message}));
          })
          .catch(err => console.log(err));

        // Return object with user creation success
      });
  };

  render() {
    return (
      <View style={styles.screen}>
        <Appbar style={{zIndex: 1}}>
          <Appbar.Content title="Sign Up" />
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
              mode="text"
              uppercase={false}
              onPress={() => this.props.navigation.navigate('Login')}>
              Log-in here
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

export default hook(SignUp);

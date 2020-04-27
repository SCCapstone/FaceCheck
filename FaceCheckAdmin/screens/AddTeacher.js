import React from 'react'
import { StyleSheet, View, Text, Image,  TextInput, TouchableOpacity } from 'react-native'

import Firebase from '../config/Firebase'


export default class AddTeacher extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '', 
            password: '', 
            confirmPass: '',
            errMsg: null
        }
    }
   
    info = (uid) => {
        let data = {
            userType: 'Teacher',
            userSecret: null,
            email: this.state.email,
            classes: [],
        }
        Firebase.firestore().collection('users').doc(uid).set(data)
        .then(() => this.props.navigation.navigate('Home'))
        .catch(error => alert(error.message))
        alert('hola')
    }

    handleSignUp = () => {
        Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(data => this.info(data.user.uid))
    }
  
    confPass = () => {
      if (this.state.password == this.state.confirmPass) {
        this.handleSignUp()
      } else {
          alert("passwords don't match")
      }
    }



  render() {
    return (
        <View style = {styles.container}>
            <View style = {styles.square}>
                <Image style = {styles.logo } source={require('../assets/logo.png')} />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email: email })}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                {!!this.state.emailError && (
                    <Text style={{ color: "red" }}>{this.state.emailError}</Text>
                )}
                <TextInput
                    style={styles.inputBox}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password: password })}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                {!!this.state.passwordError && (
                    <Text style={{ color: "red" }}>{this.state.passwordError}</Text>
                )}
                <TextInput
                    style={styles.inputBox}
                    value={this.state.confirmPass}
                    onChangeText={confirmPass => this.setState({ confirmPass: confirmPass })}
                    placeholder='Confirm Password'
                    secureTextEntry={true}
                />
                {!!this.state.confirmPassError && (
                    <Text style={{ color: "red" }}>{this.state.confirmPassError}</Text>
                )}
                <TouchableOpacity style={styles.button} 
                onPress={ () =>
                    {
                        if (this.state.email.trim() === "") {
                            this.setState(() => ({ emailError: "Email required." }));
                        } 
                        if (this.state.password.trim() === "") {
                            this.setState(() => ({ passwordError: "Password required." }));
                        }
                        if (this.state.confirmPass.trim() === "") {
                            this.setState(() => ({ confirmPassError: "Confirm Password required." }));
                        }
                        else {
                            this.confPass()  
                        }
                    }
                }
                    >
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
        
            </View>
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb'
    },
    square: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 500,
        height: 550,
        backgroundColor: 'white',
        borderRadius: 10
    },
    logo: {
        alignItems: 'center',
        width: 200,
        height: 200        
    },
    inputBox: {
        width: '80%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#7B1D0B',
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 5,
        width: 130
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})

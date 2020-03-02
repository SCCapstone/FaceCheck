import React, {Component} from 'react'
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native'

import Firebase from '../config/Firebase'



export default class Login extends Component {

    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            errorMessage: null,
   
        }
    }

    handleLogin = () => {
        Firebase.firestore().collection('admins').doc(this.state.email).get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                Firebase
                    .auth()
                    .signInWithEmailAndPassword(this.state.email, this.state.password)
                    .then(() => this.props.navigation.navigate('Home'))
                    .catch(error => this.setState({ errorMessage: error.message }))  
            } else {
                alert('user is not an Admin')
            }
        })
        .then(() => {
            if (this.state.errorMessage != null) {
                alert(this.state.errorMessage)
                this.setState({ errorMessage: null })
            }
        })
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
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password: password })}
                        placeholder='Password'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => this.handleLogin()}>
					    <Text style={styles.buttonText}>Login</Text>
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
        width: 450,
        height: 450,
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
    },
})

// Imports
import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, Platform} from 'react-native'
import Firebase, { db } from '../config/Firebase.js'

// TODO: Remove the sleep function
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


export default class AddUser extends React.Component {

    state = {
        email: '', 
        password: '',
        name: '',
        errorMessage: null
    }

    customToken = 'admin'

    handleAddUser = () => {
            const response = Firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch(error => this.setState({errorMessage: error.message}));
            // TODO: return the error message in an alert


        // TODO: Get rid of the password reset bellow and replace with a firestore function
        sleep(2000).then(() => {Firebase
            .auth().sendPasswordResetEmail(this.state.email)
            .then(()=>Firebase.auth().currentUser.updateProfile({displayName: this.state.name}))
            .then(() => this.props.navigation.navigate('HomePage'))})
            .then(()=> alert('User created Successfully!'))
    };

    render() {
        return (
            <View style = {styles.mainContainer}>
                <View style = {styles.back}>
                    <TouchableOpacity 
                        style = {styles.backButton}
                        // TODO: Replace with the back fucntion in stack navigation, if one exists
                        onPress={()=>this.props.navigation.navigate('HomePage')}>
                        <Text style = {styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <Text style = {styles.header}> Add A User</Text>
                    
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.name}
                        onChangeText={name => this.setState({name})}
                        placeholder="User's Name"
                        autoCapitalize='words'/>

                    <TextInput
                        style={styles.inputBox}
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                        placeholder='Email'
                        autoCapitalize='none'/>
                    
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        placeholder='Password'
                        secureTextEntry={true}/>

                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={this.handleAddUser}>
                        <Text style={styles.buttonText}>Add User</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    back: {
        flex: 1,
        alignItems: "flex-start",
        marginLeft: Platform.OS === 'web' ? 25 :'5%', 
        marginBottom: Platform.OS === 'web' ? '0%' : '1%',
        justifyContent: Platform.OS==='web'?'center' : 'flex-end',
        maxHeight: '8%'
    },
    backButton: {
        alignItems: 'flex-start',
    },
    backButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#7B1D0B'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: Platform.OS === 'web' ? '25%' : '85%',
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
    buttonSignup: {
        fontSize: 12
    },
    header: {
        alignItems: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#7B1D0B',
        marginBottom: 40
    }
})



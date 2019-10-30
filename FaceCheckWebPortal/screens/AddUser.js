import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, Platform} from 'react-native'
import Firebase from '../config/Firebase'

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }


export default class AddUser extends React.Component {

  state = {
      email: '', 
      password: '', 
      errorMessage: null
    }


  handleAddUser = () => {
    Firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => this.setState({errorMessage: error.message}));
      this.helper

      // TODO: Get rid of the password reset bellow and replace with a firestore function
      sleep(2000).then(() => {Firebase
       .auth().sendPasswordResetEmail(this.state.email)
       .then(() => this.props.navigation.navigate('HomePage'))})

  };
	render() {
		return (
			<View style={styles.container}>

                <Text style = {styles.header}> Add A User</Text>

				<TextInput
                    style={styles.inputBox}
                    value={this.state.email}
        		    onChangeText={email => this.setState({email})}
					placeholder='Email'
					autoCapitalize='none'
				/>
				<TextInput
					style={styles.inputBox}
					value={this.state.password}
					onChangeText={password => this.setState({password})}
					placeholder='Password'
					secureTextEntry={true}
				/>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={this.handleAddUser}
                    >
					<Text style={styles.buttonText}>Add User</Text>
				</TouchableOpacity>
			
			</View>
		)
	}
}


const styles = StyleSheet.create({
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



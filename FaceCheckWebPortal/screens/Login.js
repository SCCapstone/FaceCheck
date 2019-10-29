import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, Platform} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'
import Firebase from '../config/Firebase'



const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

class Login extends React.Component {
	componentDidMount = () => {
		Firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.getUser(user.uid)
				if (this.props.user != null) {
					this.props.navigation.navigate('HomePage')
				}
			}
		})
	}

	render() {
		return (
			<View style={styles.container}>

                <Image style = {styles.logo } source={require('../assets/logo.png')} />

				<TextInput
					style={styles.inputBox}
					value={this.props.user.email}
					onChangeText={email => this.props.updateEmail(email)}
					placeholder='Email'
					autoCapitalize='none'
				/>
				<TextInput
					style={styles.inputBox}
					value={this.props.user.password}
					onChangeText={password => this.props.updatePassword(password)}
					placeholder='Password'
					secureTextEntry={true}
				/>
				<TouchableOpacity style={styles.button} onPress={() => this.props.login()}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
			
			</View>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)

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
    logo: {
        alignItems: 'center',
        width: 250,
        height: 250        
    }
})



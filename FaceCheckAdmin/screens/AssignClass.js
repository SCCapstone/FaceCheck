import React from 'react'
import { StyleSheet, View, Text, Image,  TextInput, TouchableOpacity, Picker} from 'react-native'
import firebase from 'firebase'
import Firebase from '../config/Firebase'

export default class AddTeacher extends React.Component {
    constructor() {
        super()
        this.state = {
            classIndex: 0,
            userIndex: 0,
            className: '',
            userName: '',
            classes:[],
            classesUID: [],
            users:[],
            usersUID:[],
            userEmails:[]
        }
    }

  componentDidMount = () => {
    Firebase.firestore().collection('classes').onSnapshot(querySnapShot => {
        const classes = []
        const classesUID = []
        querySnapShot.forEach(element => {
            const { className } = element.data()
            classes.push(
                className
            )
            
            classesUID.push(
                element.id
            )
        })
        this.setState({classes: classes})
        this.setState({classesUID: classesUID})
    })

    Firebase.firestore().collection('users').onSnapshot(querySnapShot => {
        const users = []
        const usersUID = []
        const emails = []
        querySnapShot.forEach(element => {
            const { email, userType } = element.data()
            users.push(
                email + ' - ' + userType
            )
            emails.push(
                email
            )
            usersUID.push(
                element.id
            )
        })
        this.setState({users: users})
        this.setState({usersUID: usersUID})
        this.setState({userEmails: emails})
    })
    
}

handleCollection = () => {

        let data = {
            email: this.state.userEmails[this.state.userIndex],
            present: false,
            uid: this.state.usersUID[this.state.userIndex]
        }
   
        Firebase.firestore().collection('users').doc(this.state.usersUID[this.state.userIndex]).update({
            classes: firebase.firestore.FieldValue.arrayUnion(this.state.classesUID[this.state.classIndex])
        })
        .catch(error => this.setState({ errMsg: error.message }))
        
        Firebase.firestore().collection('classes').doc(this.state.classesUID[this.state.classIndex]).update({
            Students: firebase.firestore.FieldValue.arrayUnion(data)
        })
        .catch(error => this.setState({ errMsg: error.message }))
        
        .then(this.props.navigation.navigate('Home'))
}
  render() {
    return (
        <View style = {styles.container}>
            <View style = {styles.square}>
                <Image style = {styles.logo } source={require('../assets/logo.png')} />
                

                <Picker
                    selectedValue={this.state.userName}
                    style={styles.pickers}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({userName: itemValue})
                        this.setState({userIndex: itemIndex})
                    }
                    
                    }>
                    {this.state.users.map((item, index) => {
                        return (< Picker.Item label={item} value={index} key={index} />);
                    })}
                </Picker>

                <Picker
                    selectedValue={this.state.className}
                    style={styles.pickers}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({className: itemValue})
                        this.setState({classIndex: itemIndex})
                    }
                    
                    }>
                    {this.state.classes.map((item, index) => {
                        return (< Picker.Item label={item} value={index} key={index} />);
                    })}
                </Picker>




                <TouchableOpacity style={styles.button} onPress={() => this.handleCollection()}>
                    <Text style={styles.buttonText}>assign class</Text>
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
        height: 450,
        backgroundColor: 'white',
        borderRadius: 10
    },
    logo: {
        alignItems: 'center',
        width: 200,
        height: 200        
    },
    pickers: {
        height: 40,
        width: '80%',
        margin: 10,
        padding: 15,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
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

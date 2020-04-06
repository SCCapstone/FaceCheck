import React from 'react'
import { StyleSheet, View, Text, Image,  TextInput, TouchableOpacity,Picker } from 'react-native'

import firebase from 'firebase'
import Firebase from '../config/Firebase'

export default class AddTeacher extends React.Component {
    constructor() {
        super()
        this.state = {
            className: '', 
            classTime: '',
            teacherName: '',
            teacherUID: '',
            teachers: [],
            teacehrsUID: [],
        }
    }

    componentDidMount = () => {
        Firebase.firestore().collection('users').onSnapshot(querySnapShot => {
            const teachersUID = []
            const emails = []
            querySnapShot.forEach(element => {
                const { email, userType } = element.data()
                if (userType == 'Teacher') {
                    emails.push(
                        email
                    )
                    teachersUID.push(
                        element.id
                    )
                }
                
            })
            this.setState({teachersUID: teachersUID})
            this.setState({teachers: emails})
        })
    }
    handleCreation = () => {
        let data = {
            className: this.state.className,
            Time: this.state.classTime,
            meetingDays: [],
            Students: [],
            TeacherUID:this.state.teacherUID, 
            TeacherName: this.state.teachers[this.state.teacherName],
            Attendance: {} 
        }
        Firebase.firestore().collection('classes').doc().set(data)
        .then(() => this.props.navigation.navigate('Home'))
        .catch(error => this.setState({ errMsg: error.message }))
    }
   
  render() {
    return (
        <View style = {styles.container}>
            <View style = {styles.square}>
                <Image style = {styles.logo } source={require('../assets/logo.png')} />
                <Picker
                    selectedValue={this.state.teacherName}
                    style={styles.pickers}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({teacherName: itemValue})
                        this.setState({teacherUID: this.state.teachersUID[itemIndex]})
                    }
                    
                    }>
                    {this.state.teachers.map((item, index) => {
                        return (< Picker.Item label={item} value={index} key={index} />);
                    })}
                </Picker>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.className}
                    onChangeText={className => this.setState({ className: className })}
                    placeholder='Class Name'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.classTime}
                    onChangeText={classTime => this.setState({ classTime: classTime})}
                    placeholder='Class Time'
                />
                
                <TouchableOpacity style={styles.button} onPress={() => this.handleCreation()}>
                    <Text style={styles.buttonText}>create class</Text>
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
        height: 570,
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

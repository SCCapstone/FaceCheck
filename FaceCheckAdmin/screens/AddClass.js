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
            meetingDays: ['Monday, Wednesday', 'Tuesday, Thursday', 'Monday, Wednesday, Friday'],
            meeting: 0,
            meetings: []
        }
    }

    days = () => {
        if (this.state.meeting === 0) {
            this.setState({meetings: ['Monday', 'Wednesday']}) 
        }
        else if (this.state.meeting === 1) {
            this.setState({meetings: ['Monday', 'Wednesday', 'Friday']}) 
        }
        else if (this.state.meeting === 2) {
            this.setState({meetings: ['Tuesday', 'Thursday']}) 
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
            {
                {
                    this.setState({teacherName: this.state.teachers[0]})
                    this.setState({teacherUID: this.state.teachersUID[0]})
                }
            }
        })
    }
    handleCreation = () => {
        this.days()
        alert(this.state.meetings)
        let data = {
            className: this.state.className,
            Time: this.state.classTime,
            meetingDays: [],
            Students: [],
            TeacherUID:this.state.teacherUID, 
            TeacherName: this.state.teacherName,
            Attendance: this.state.meetings
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
                 {!!this.state.classNameError && (
                    <Text style={{ color: "red" }}>{this.state.classNameError}</Text>
                )}
                 <Picker
                    selectedValue={this.state.meeting}
                    style={styles.pickers}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({meeting: itemIndex})
                    }
                    
                    }>
                    {this.state.meetingDays.map((item, index) => {
                        return (< Picker.Item label={item} value={index} key={index} />);
                    })}
                </Picker>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.classTime}
                    onChangeText={classTime => this.setState({ classTime: classTime})}
                    placeholder='Class Time'
                />
                {!!this.state.classTimeError && (
                    <Text style={{ color: "red" }}>{this.state.classTimeError}</Text>
                )}

               
                
                <TouchableOpacity style={styles.button} 
                    onPress={ () =>
                        {
                        if (this.state.className.trim() === "") {
                            this.setState(() => ({ classNameError: "Class name required." }));
                        } 
                        if (this.state.classTime.trim() === "") {
                            this.setState(() => ({ classTimeError: "Class Time required." }));
                        }
                        else {
                                this.setState(() => ({ nameError: null }));
                                this.handleCreation()
                            }
                        }
                    } 
                >
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
        height: 50,
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
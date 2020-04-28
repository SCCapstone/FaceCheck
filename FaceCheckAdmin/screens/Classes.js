import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity  } from 'react-native'
import Firebase from '../config/Firebase'

export default class Classes extends React.Component {
    constructor() {
        super()
        this.state = {
            classes:[],
            class: 'Select a class!',
            index: 0,
            students: []
        }
    }

  componentDidMount = () => {
    Firebase.firestore().collection('classes').onSnapshot(querySnapShot => {
        const classes = []
        querySnapShot.forEach(element => {
            const { className, TeacherName, Students } = element.data()
            classes.push(
                {
                    "className" : className,
                    "TeacherName": TeacherName,
                    "Students": Students
                }
            )
        })
        this.setState({classes: classes})
    })
}

students = (index) => {
    const students = []
    this.state.classes[index].Students.forEach(function (item, index) {
        students.push(
            item
        )
    });
    this.setState({students: students})
    
}

update = (name, index) => {
    this.setState({class: name});
    this.setState({index: index});
    this.students(index);
}

  render() {
    return (
        <View style = {styles.container}>
            <View style = {styles.square}>
                <Text>Select a class to list students</Text>
                <ScrollView style = {styles.class}>
                    {
                        this.state.classes.map((item, index ) => (
                            <TouchableOpacity style = {styles.button} onPress = {()=>this.update(item.className, index)}>
                                <Text style = {styles.text}>
                                    Class: {item.className} {'\n'}
                                    Teacher: {item.TeacherName}
                                </Text>
                            </TouchableOpacity>      
                        ))
                    }
                </ScrollView>
            </View>
            <View style = {styles.square}>
                <Text>{this.state.class}</Text>
                <ScrollView style = {styles.class}>
                    {
                        
                        this.state.students.map((item, index ) => (
                            <TouchableOpacity style = {styles.button}>
                                <Text style = {styles.text}>
                                    {item.email}{'\n'}
                                </Text>
                            </TouchableOpacity>      
                        ))
                    }
                </ScrollView>
                    
             
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
        backgroundColor: '#ebebeb',
        flexDirection: 'row'
    },
    square: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 500,
        height: 450,
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: 20,
        paddingTop: 20
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
    button: {
        marginTop: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#7B1D0B',
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 5,
        width: '90%'
    },
    class: {
        paddingLeft: 30,
        width: '100%',
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: "#ffffff"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})

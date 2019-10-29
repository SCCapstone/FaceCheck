import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native'
import Firebase from '../config/Firebase'


export default class HomePage extends React.Component {

    render() {
        return (

            <View style = {styles.mainContainer}>
                <View style = {styles.signout}>
                <TouchableOpacity  
                style = {styles.sobutton}
                onPress={() => {
                Firebase.auth().signOut()
                }}
                >
                    <Text style = {styles.sobuttonText}>signout</Text>
                </TouchableOpacity>

                </View> 

                <View style = {styles.options}>
                    <TouchableOpacity style = {styles.classes}>
                        <Text style = {styles.TextStyle}>Classes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.teachers}>
                        <Text style = {styles.TextStyle}>Teachers</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style = {styles.students}>
                        <Text style = {styles.TextStyle}>Students</Text>
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

    signout: {
        flex: 1,
        alignItems: "flex-end",
        //marginTop: Platform.OS==='web' ? 25 : '10%',
        marginRight: Platform.OS === 'web' ? 25 :'5%', 
        marginBottom: Platform.OS === 'web' ? '0%' : '1%',
        justifyContent: Platform.OS==='web'?'center' : 'flex-end',
        maxHeight: '8%'

    
    },

    sobutton: {
        alignItems: 'flex-end',
   
    },
    sobuttonText: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    options: {
        flex: 1,
        flexDirection: Platform.OS === 'web' ? "row" : 'column',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      },
    
      button: {
        width: 75,
        height: 75,
        backgroundColor: '#000000',
        marginBottom: 0,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        marginLeft: 5
      },  
      
      teachers: {
        margin: Platform.OS === 'web' ? '10%' : 15,
        backgroundColor: 'brown',
        width: Platform.OS === 'web' ? '20%' : 100,
        height: Platform.OS === 'web' ? '20%' : 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
      },
    
      students: {
        backgroundColor: 'green',
        width: Platform.OS === 'web' ? '20%' : 100,
        height: Platform.OS === 'web' ? '20%' : 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
      },
    
      classes: {
        backgroundColor: '#0000FF',
        justifyContent: 'center',
        alignItems: 'center',
        width: Platform.OS === 'web' ? '20%' : 100,
        height: Platform.OS === 'web' ? '20%' : 75,
        borderRadius: 15
      },
    
      TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
      },


})

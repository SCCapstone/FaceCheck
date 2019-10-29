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
        flex: 2,
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
        flex: 2,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: 'red'
 
    },
    text: {
        
        fontSize: 20,
    },


})

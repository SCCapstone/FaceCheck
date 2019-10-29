import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'


export default class HomePage extends React.Component {

    render() {
        return (

            <View style = {styles.mainContainer}>
                <View style = {styles.signout}>
                <TouchableOpacity  style = {styles.sobutton}>
                    <Text style = {styles.sobuttonText}>signout</Text>
                </TouchableOpacity>

                </View> 
                <View style = {styles.container}>
                 <Text style = {styles.text}>HomePage</Text>
                 </View>
                 </View>
        )
    }
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: 'red'
    },

    container: {
        flex: 1,
        backgroundColor: '#ddd',
        alignContent: 'center',
        alignItems: 'center'
 
    },
    text: {
        fontSize: 20,
    },

    signout: {
        flex: 1,
        alignItems: "flex-end",
        marginTop: 25,
        marginRight: 25,  
        maxHeight: 20,
        marginBottom: 10
    
    },

    sobutton: {
        alignItems: 'flex-end',
   
    },
    sobuttonText: {
        fontSize: 15,
        fontWeight: 'bold'
    }


})

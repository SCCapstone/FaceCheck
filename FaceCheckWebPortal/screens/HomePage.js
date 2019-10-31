import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform, Image} from 'react-native'
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


                <View style = {styles.info}>
                    <Text style = {styles.infoText}>Welcome {Firebase.auth().currentUser.displayName}</Text>
                </View>

                <View style = {styles.options}>
                    <TouchableOpacity style = {styles.classes}>
                        <Text style = {styles.TextStyle}>Classes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style = {styles.users}
                        onPress = {()=>this.props.navigation.navigate('AddUser')}
                    >
                        <Text style = {styles.TextStyle}>Add User</Text>
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
        fontWeight: 'bold',
        color: '#7B1D0B'
    },


    info: {
        flex: 1,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        maxHeight:'5%'
    },  
    infoText: {
        color: '#7B1D0B',
        textAlign: 'center',
        fontSize: 30,
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
      
      users: {
        margin: Platform.OS === 'web' ? '5%' : 8,
        backgroundColor: '#7B1D0B',
        width: Platform.OS === 'web' ? '20%' : 200,
        height: Platform.OS === 'web' ? '20%' : 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
      },
    
      classes: {
        margin: Platform.OS === 'web' ? '5%' : 8,

        backgroundColor: '#7B1D0B',
        justifyContent: 'center',
        alignItems: 'center',
        width: Platform.OS === 'web' ? '20%' : 200,
        height: Platform.OS === 'web' ? '20%' : 150,
        borderRadius: 15,

      },
    
      TextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold'
      },


})

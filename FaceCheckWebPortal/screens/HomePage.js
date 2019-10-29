import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'


export default class HomePage extends React.Component {
    render() {
        return (

            <View style = {styles.container}>

                 <Text style = {styles.text}>HomePage</Text>
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
    text: {
        fontSize: 20,
        alignContent: 'center'
    }


})

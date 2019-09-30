import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 40,
    },
    TouchableOpacity: {
        margin: 5,
    },
    TouchableOpacityText: {
        color: 'blue',
        textAlign: 'center'
    }
  });

export default styles;

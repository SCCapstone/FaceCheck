import React, { useReducer } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AddClassScreen = ({ navigation }) => {
  return (
    <View style ={styles.view}>
      {/* TODO add component mount setUserID */}
      <TouchableOpacity style={styles.TouchableOpacity} onPress={()=> navigation.navigate('Home')}>
        <Text style={styles.TouchableOpacityText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Generate a QR</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  view: {
    marginTop: 40,
    flexDirection: "row",
  },
  text: {
    fontSize: 30,
  },
  TouchableOpacity: {
    margin: 10,
    width: 50,
  },
  TouchableOpacityText: {
    color: 'blue',
  }
});

export default AddClassScreen;

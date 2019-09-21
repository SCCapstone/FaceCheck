import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const StudentHomeScreen = ({ navigation }) => {
  const [ userId, setUserID ] = useState([])

  return (
    <View>
      {/* TODO add component mount setUserID */}
      <Text style={styles.text}>Welcome back M</Text>
      <TouchableOpacity style={styles.TouchableOpacity} onPress={()=> navigation.navigate('AddClass')}>
        <Text style={styles.TouchableOpacityText}>Go To Add A Class</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.TouchableOpacity} onPress={()=> navigation.navigate('QR')}>
        <Text style={styles.TouchableOpacityText}>Go To QR</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
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

export default StudentHomeScreen;

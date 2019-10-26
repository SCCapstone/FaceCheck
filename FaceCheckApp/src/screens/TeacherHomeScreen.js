import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const TeacherHomePageScreen = ({navigation}) => {
  //TODO everything
  return (
    <View>
      <Text sytle={styles.otherStyle}>Teacher Home Page</Text>
      <TouchableOpacity style={styles.textSytle}
        onPress={() => navigation.navigate('TeacherClassView')}>
        <Text style={styles.textSytle}>Go to Teacher Class View Page </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textSytle}
        onPress={() => navigation.navigate('TeacherViewStudent')}>
        <Text style={styles.textSytle}>Go to Teacher View Student Info Page</Text>
        </TouchableOpacity>
      </View>
  );

};

const styles = StyleSheet.create({
  textSytle: {
    color: 'blue'
},
  otherStyle: {
    margin: 50
},
  viewStyle: {
    flexDirection: 'row'
}
});

export default TeacherHomePageScreen;
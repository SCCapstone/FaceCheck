import firebase from 'react-native-firebase';
import React from 'react';
import { Appbar, Card, Paragraph } from 'react-native-paper';
import { Text, StyleSheet, View, Button, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import mockClasses from 'FaceCheckApp/src/assets/mockClasses.json';
import styles from 'FaceCheckApp/src/assets/styles';

export default class StudentHomeScreen extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state
    ClassCards = mockClasses.classes.map((currClass) => {
      return(
        <Card style={styles.card} key={currClass.classID} onPress = {() => {
          this.props.navigation.navigate('ClassScreen', {currClass: JSON.stringify(currClass)})
        }}>
          <Card.Title title={currClass.name} />
          <Card.Content>
            <Paragraph>
              Teacher: {currClass.teacher}
            </Paragraph>
          </Card.Content>
        </Card>
      )
    })
    return (
      <View style = {styles.screen}>
        <Appbar.Header>
          <Appbar.BackAction
            title = 'Logout'
            onPress={() => {firebase.auth().signOut()}}
          />
          <Appbar.Content
            title="Home"
          />
        </Appbar.Header>
        <ScrollView>
          {ClassCards}
        </ScrollView>
      </View>
    )
  }
}

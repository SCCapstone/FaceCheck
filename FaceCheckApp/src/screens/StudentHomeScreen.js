import firebase from 'react-native-firebase';
import React from 'react';
import { FAB, Portal, Appbar, Card, Paragraph} from 'react-native-paper';
import { Text, View, Button, ScrollView } from 'react-native';
import mockClasses from 'FaceCheckApp/src/assets/mockClasses.json';
import styles from 'FaceCheckApp/src/assets/styles';

export default class StudentHomeScreen extends React.Component {
  state = { currentUser: null, open: false }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state
    // Generating Cards from classes object
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
        <Portal>
          <FAB.Group
            open={this.state.open}
            icon={this.state.open ? 'today' : 'add'}
            actions={[
              { icon: 'add', onPress: () => console.log('Pressed add') },
              { icon: 'star', label: 'Star', onPress: () => console.log('Pressed star')},
              { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
              { icon: 'bell', label: 'Remind', onPress: () => console.log('Pressed notifications') },
            ]}
            onStateChange={({ open }) => this.setState({ open })}
            onPress={() => {
              if (this.state.open) {
                // do something if the speed dial is open
              }
            }}
          />
          </Portal>
      </View>
    )
  }
}

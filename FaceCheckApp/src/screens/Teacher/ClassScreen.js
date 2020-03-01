import firebase from 'react-native-firebase';
import React from 'react';
import {Appbar, Paragraph, Card, Button} from 'react-native-paper';
import {View, ScrollView} from 'react-native';
import styles from 'FaceCheckApp/src/assets/styles';

export default class AddClassScreen extends React.Component {
  state = {currentUser: null};

  componentDidMount() {
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
  }

  makeStudentList(Students) {
    studentsList = '';
    Students.forEach(student => {
      studentsList += student.email + '\n';
    });
    return studentsList;
  }

  makeMeetingTimes(meetingDays, time) {
    meetingTimes = 'Meeting Time : ' + time + '\n';
    meetingDays.forEach(day => {
      meetingTimes += day + '\n';
    });
    return meetingTimes;
  }

  render() {
    var currClass = JSON.parse(this.props.navigation.getParam('currClass'));
    return (
      <View style={styles.screen}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <Appbar.Content title={currClass.className} />
        </Appbar.Header>
        <ScrollView>
          {/* Showing students */}
          <Card style={styles.card}>
            <Card.Title title="Students" />
            <Card.Content>
              <Paragraph>{this.makeStudentList(currClass.Students)}</Paragraph>
            </Card.Content>
          </Card>
          {/* ClassTime and Date */}
          <Card style={styles.card}>
            <Card.Title title="Meeting Times" />
            <Card.Content>
              <Paragraph>
                {this.makeMeetingTimes(currClass.meetingDays, currClass.Time)}
              </Paragraph>
            </Card.Content>
          </Card>
          <Card>
            <Button
              style={styles.button}
              mode="outlined"
              onPress={() => {
                this.props.navigation.navigate('QRScanner', {
                  currClass: JSON.stringify(currClass),
                });
              }}>
              Attendance Scanner
            </Button>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

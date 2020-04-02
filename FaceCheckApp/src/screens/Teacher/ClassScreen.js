import firebase from 'react-native-firebase';
import React from 'react';
import {Appbar, Paragraph, Card, Button} from 'react-native-paper';
import {View, ScrollView, Alert} from 'react-native';
import styles from 'FaceCheckApp/src/assets/styles';
import DatePicker from 'react-native-date-picker';

export default class AddClassScreen extends React.Component {
  constructor(props) {
    super(props);
    date = new Date();
    this.state = {
      currentUser: null,
      date: date,
      attendance: 'No Attendance To Show',
      absent: 'No absences'
    };
  }

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

  _makeDateString() {
    const date = this.state.date;
    console.log(date);
    currDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    console.log(currDate)
    return currDate;
  }

  _checkAttendance = (students) => {
    if (!students?.length) {
      return {
        present: [],
        absent: []
      }
    }
    const currClass = JSON.parse(this.props.navigation.getParam('currClass'))
    const dayAttendance = currClass.Attendance[this._makeDateString(this.state.date)] ?? []
    const present = students.filter(student => dayAttendance.find(attended => attended.uid === student.uid))
    const absent = students.filter(student => !dayAttendance.find(attended => attended.uid === student.uid))
    return {
      present,
      absent
    }
  }
  
  _makeAttendance(students) {
    console.log(students)
    const { present, absent } = this._checkAttendance(students)
    const attendance = [...present.map(student => `${student.email}: present`), ...absent.map(student => `${student.email}: absent`)]
  
    console.log('present', present)
    console.log('absent', absent)
    console.log('attendance', attendance)
  
    this.setState({attendance: attendance.join('\n') || 'No attendance to show for this day'});
  }
  
  _makeAbsent(students) {
    const { absent } = this._checkAttendance(students)
    this.setState({absent}, () => { Alert.alert('Absent List' ,this.state.absent.map(student => student.email).join('\n')) })
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
            <Button
              style={styles.button}
              date={this.state.date}
              mode="outlined"
              onPress={() => {
                this._makeAbsent(currClass.Students)
              }}>
              Show Absentees
            </Button>
          </Card>
          <Card>
            <DatePicker
              date={this.state.date}
              mode="date"
              onDateChange={date => {
                this.setState({date: date}, () => {this._makeAttendance(currClass.Students);})
              }}
            />
          </Card>
          <Card>
            <Paragraph>{this.state.attendance}</Paragraph>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

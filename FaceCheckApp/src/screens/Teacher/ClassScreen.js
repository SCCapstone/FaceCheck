import firebase from 'react-native-firebase';
import React from 'react';
import {Appbar, Paragraph, Card, Button} from 'react-native-paper';
import {View, ScrollView} from 'react-native';
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
      isHere: false,
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
    return currDate;
  }

  _makeAttendance() {
    var currClass = JSON.parse(this.props.navigation.getParam('currClass'));
    if (this.state.date != undefined) {
      var attendance =
        currClass.Attendance[this._makeDateString(this.state.date)];
      if (attendance != undefined) {
        currAttendance = '';
        attendance.forEach(student => {
          console.log(student.email);
          currAttendance += student.present
            ? `${student.email}: present`
            : `${student.email}: absent` + '\n';
        });
        this.setState({attendance: currAttendance});
      } else {
        this.setState({attendance: 'No attendance to show for this day'});
      }
    }
  }

  _makeAbsent(time, Students) {
    const numberTime = parseFloat(time.replace(/\D/g, ''))/100
    // alert(numberTime)
    const currDate = new Date()
    let hours = currDate.getHours();
    let minutes = currDate.getMinutes();
    hours = hours + (minutes/60)
    let lateTime = hours + (.25);
    // alert(lateTime)
    let absentList = ''
    if (lateTime > (numberTime + .25)){
      Students.forEach(student => {
        if(this.state.isHere === false)
        // alert(student.present)
        absentList += `${student.email}: absent` + '\n';
      });
      alert(absentList)
    }
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
              mode="outlined"
              onPress={() => {
                this._makeAbsent(currClass.Time, currClass.Students)
              }}>
              ab Scanner
            </Button>
          </Card>
          <Card>
            <DatePicker
              date={this.state.date}
              mode="date"
              onDateChange={date => {
                this._makeAttendance();
                this.setState({date: date});
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

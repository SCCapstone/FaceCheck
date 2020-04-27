import firebase from 'react-native-firebase';
import React from 'react';
import {Appbar, Paragraph, Card, Button} from 'react-native-paper';
import {View, ScrollView, Alert} from 'react-native';
import styles from 'FaceCheckApp/src/assets/styles';
import DatePicker from 'react-native-date-picker';
import {hook} from 'cavy';
class AddClassScreen extends React.Component {
  constructor(props) {
    super(props);
    date = new Date();
    this.state = {
      currentUser: null,
      date: date,
    };
  }

  componentDidMount() {
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
  }

  // _getDate(): takes the date stored in state, then breaks it down into month day year.
  // There is a weird thing you have to do with date where you must add one to month.
  _getDate = () => {
    const {date} = this.state;
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // _checkAttendance: Takes the current class and returns the Students array, renames to students
  // and the Attendance array from firebase. If there are students, it creates and returns a present and absent array
  _checkAttendance = currClass => {
    const {Students: students, Attendance} = currClass;
    if (!students?.length) {
      return {
        present: [],
        absent: [],
      };
    }

    // set attendance equal to the firebase array Attendance at the current date
    const attendance = Attendance[this._getDate()];
    // if attendance does not exist do nothing.
    if (!attendance)
      return {
        present: [],
        absent: [],
      };
    // populating the present array with students that match the UID of a student that has attended class
    const present = students.filter(student =>
      attendance.find(attended => attended.uid === student.uid),
    );

    // populating the present array with students that match the UID of a student that has not attended class
    const absent = students.filter(
      student => !attendance.find(attended => attended.uid === student.uid),
    );

    //return the populated arrays
    return {
      present,
      absent,
    };
  };

  // renderAttendance: takes in the two arrays
  // for each student in them the function maps the email and the word present/absent
  // then joins with a new line in between
  renderAttendance = (present, absent) =>
    [
      ...present.map(student => `${student.email}: present`),
      ...absent.map(student => `${student.email}: absent`),
    ].join('\n') || 'No attendance to show for this day';

  // renderStudentList: takes in students
  // The ?. is a conditional meaning if there are students then map student.email with a newline for each
  renderStudentList = students =>
    students?.map(student => student.email).join('\n') || '';

  // renders the meeting times and days with a new line in between
  renderMeetingTimes = (meetingDays, time) =>
    `Meeting Time: ${time}\n${meetingDays.join('\n')}`;

  render() {
    const currClass = JSON.parse(this.props.navigation.getParam('currClass'));

    // get current lists of present and absent students
    const {present, absent} = this._checkAttendance(currClass);
    const {Students: students, Attendance: attendance} = currClass;
    // const absenceCount = students?.map(student => {
    //   const count = Object.keys(attendance).reduce((total, key) => {
    //     return total + (!attendance[key] || attendance[key].find(s => s.uid === student.uid) ? 0 : 1)
    //   }, 0)
    //   return `${student.email}: ${count}`
    // }).join('\n')

    // Sum up missing days
    // Counts an absence if there was attendance for that day
    // and it was unable to find the student's ID in the list of attendees.
    const absenceCount = students
      ?.map(
        student =>
          `${student.email}: ${Object.keys(attendance).reduce(
            (total, key) =>
              total +
              (!attendance[key] ||
              attendance[key].find(s => s.uid === student.uid)
                ? 0
                : 1),
            0,
          )}`,
      )
      .join('\n');

    const dateAttendance = attendance[this._getDate()];

    return (
      <View style={styles.screen}>
        <Appbar.Header>
          <Appbar.BackAction
            ref={this.props.generateTestHook(
              'Scene.teacherClassScreenBackButton',
            )}
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
              <Paragraph>
                {this.renderStudentList(currClass.Students)}
              </Paragraph>
            </Card.Content>
          </Card>
          {/* ClassTime and Date */}
          <Card style={styles.card}>
            <Card.Title title="Meeting Times" />
            <Card.Content>
              <Paragraph>
                {this.renderMeetingTimes(currClass.meetingDays, currClass.Time)}
              </Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Title title="Total Absences Per Student" />
            <Card.Content>
              <Paragraph>{absenceCount}</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Button
                ref={this.props.generateTestHook('Scene.teacherQRScanner')}
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
                disabled={!dateAttendance}
                onPress={() =>
                  Alert.alert(
                    'Absent List',
                    absent.map(student => student.email).join('\n'),
                  )
                }>
                {dateAttendance ? 'Show Absentees' : 'No Class Scheduled'}
              </Button>
              <DatePicker
                style={styles.datePicker}
                date={this.state.date}
                mode="date"
                // setState is asyncronous so it needs to be put into a function call, this fixed the date matching issue.
                onDateChange={date => {
                  this.setState({date});
                }}
              />
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

export default hook(AddClassScreen);

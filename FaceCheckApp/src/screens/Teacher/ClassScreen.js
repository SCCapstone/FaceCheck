import firebase from 'react-native-firebase'
import React from 'react'
import { Appbar, Paragraph, Card, Button } from 'react-native-paper'
import { View, ScrollView, Alert } from 'react-native'
import styles from 'FaceCheckApp/src/assets/styles'
import DatePicker from 'react-native-date-picker'

export default class AddClassScreen extends React.Component {
  constructor(props) {
    super(props)
    date = new Date()
    this.state = {
      currentUser: null,
      date: date,
    }
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  _getDate = () => {
    const { date } = this.state
    return `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()}`
  }

  _checkAttendance = currClass => {
    const { Students: students, Attendance } = currClass
    if (!students?.length) {
      return {
        present: [],
        absent: [],
      }
    }

    const attendance = Attendance[this._getDate()]
    if(!attendance)
      return {
        present: [],
        absent: [],
      }
    const present = students.filter(student =>
      attendance.find(attended => attended.uid === student.uid),
    )
    const absent = students.filter(
      student => !attendance.find(attended => attended.uid === student.uid),
    )
    return {
      present,
      absent,
    }
  }

  renderAttendance = (present, absent) =>
    [
      ...present.map(student => `${student.email}: present`),
      ...absent.map(student => `${student.email}: absent`),
    ].join('\n') || 'No attendance to show for this day'

  renderStudentList = students =>
    students?.map(student => student.email).join('\n') || ''

  renderMeetingTimes = (meetingDays, time) =>
    `Meeting Time: ${time}\n${meetingDays.join('\n')}`

  render() {
    const currClass = JSON.parse(this.props.navigation.getParam('currClass'))
    console.log(currClass)
    const { present, absent } = this._checkAttendance(currClass)
    const { Students: students, Attendance: attendance} = currClass
    // const absenceCount = students?.map(student => {
    //   console.log('Searching for: ', student)
    //   console.log('Keys: ', Object.keys(attendance))
    //   const count = Object.keys(attendance).reduce((total, key) => {
    //     console.log('Key: ', key)
    //     console.log('Attendance: ', attendance[key])
    //     return total + (!attendance[key] || attendance[key].find(s => s.uid === student.uid) ? 0 : 1)
    //   }, 0)
    //   return `${student.email}: ${count}`
    // }).join('\n')
    const absenceCount = students?.map(student => `${student.email}: ${Object.keys(attendance).reduce((total, key) => total + (!attendance[key] || attendance[key].find(s => s.uid === student.uid) ? 0 : 1), 0)}`).join('\n')

    const dateAttendance = attendance[this._getDate()]

    return (
      <View style={styles.screen}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.goBack()
            }}
          />
          <Appbar.Content title={currClass.className} />
        </Appbar.Header>
        <ScrollView>
          {/* Showing students */}
          <Card style={styles.card}>
            <Card.Title title='Students' />
            <Card.Content>
              <Paragraph>
                {this.renderStudentList(currClass.Students)}
              </Paragraph>
            </Card.Content>
          </Card>
          {/* ClassTime and Date */}
          <Card style={styles.card}>
            <Card.Title title='Meeting Times' />
            <Card.Content>
              <Paragraph>
                {this.renderMeetingTimes(currClass.meetingDays, currClass.Time)}
              </Paragraph>
            </Card.Content>
          </Card>
          <Card>
            <Button
              style={styles.button}
              mode='outlined'
              onPress={() => {
                this.props.navigation.navigate('QRScanner', {
                  currClass: JSON.stringify(currClass),
                })
              }}
            >
              Attendance Scanner
            </Button>
            <Button
              style={styles.button}
              date={this.state.date}
              mode='outlined'
              disabled = {!dateAttendance}
              onPress={() =>
                Alert.alert(
                  'Absent List',
                  absent.map(student => student.email).join('\n'),
                )
              }
            >
              {dateAttendance ? 'Show Absentees' : 'No Class Scheduled'}
            </Button>
          </Card>
          <Card>
            <DatePicker
              date={this.state.date}
              mode='date'
              onDateChange={date => {
                this.setState({ date })
              }}
            />
          </Card>
          <Card>
            <Paragraph>Total Absences Per Student: </Paragraph>
            <Paragraph>{absenceCount}</Paragraph>
          </Card>
        </ScrollView>
      </View>
    )
  }
}

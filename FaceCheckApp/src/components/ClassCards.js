import React from 'react'
import { Card, Paragraph, ActivityIndicator } from 'react-native-paper'
import { View, Button } from 'react-native'
import { connect } from 'react-redux'
import { watchClasses } from 'FaceCheckApp/src/redux/app-redux'
import styles from 'FaceCheckApp/src/assets/styles'
import { hook, wrap } from 'cavy'

const mapStateToProps = state => {
  return {
    classes: state.classes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    watchClasses: () => {
      dispatch(watchClasses())
    },
  }
}

class ClassCards extends React.Component {
  constructor(props) {
    super(props)
    this.props.watchClasses()
  }

  render() {
    const { currClass, userId, classes } = this.props
    console.log("props: ", this.props)
    const alertClasses = []

    if (! classes || classes.length === 0) {
      return <ActivityIndicator animating={true} />
    }
    return this.props.classes.map(currClass => {
      const { className, TeacherName, meetingDays, Time} = currClass
      const { Attendance } = currClass
      const absenceCount = Object.keys(Attendance).reduce((total, key) => total + (!Attendance[key] || Attendance[key].find(s => s.uid === userId) ? 0 : 1), 0)
      if (absenceCount > 0) {
        alertClasses.push(className)
      }
      return (
        <Card
          style={styles.card}
          key={className}
          onPress={() => {
            this.props.navigation.navigate('ClassScreen', {
              currClass: JSON.stringify(currClass),
            })
          }}
        >
          <Card.Title title={className} />
          <Card.Content>
            <Paragraph>Teacher: {TeacherName}</Paragraph>
            <Paragraph>Days: {meetingDays + ''} </Paragraph>
            <Paragraph>Time: {Time}</Paragraph>
            <Paragraph>Absences: {absenceCount}</Paragraph>
          </Card.Content>
        </Card>
      )
    })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClassCards)
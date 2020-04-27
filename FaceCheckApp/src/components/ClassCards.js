import React from 'react';
import {Card, Paragraph, ActivityIndicator} from 'react-native-paper';
import {View, Button, Alert, BackHandler, Text} from 'react-native';
import {connect} from 'react-redux';
import {watchClasses} from 'FaceCheckApp/src/redux/app-redux';
import styles from 'FaceCheckApp/src/assets/styles';
import {hook, wrap} from 'cavy';

const mapStateToProps = state => {
  return {
    classes: state.classes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    watchClasses: () => {
      dispatch(watchClasses());
    },
  };
};

async function _alertClasses(alertClasses) {
  await delay(3000);
  let counter = 0;
  console.log('this', alertClasses);
  if (alertClasses.length !== 0 && counter === 0) {
    Alert.alert('Too many Absences: ', alertClasses.map(c => c).join('\n'));
    counter++;
  }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

class ClassCards extends React.Component {
  constructor(props) {
    super(props);
    this.props.watchClasses();
  }

  render() {
    const {currClass, userId, classes} = this.props;
    // console.log("props: ", this.props)
    const alertClasses = [];

    if (!classes || classes.length === 0) {
      return (
        <View style={styles.centerScreenJustWowee}>
          <Text style={styles.text}>No Classes Assigned</Text>
        </View>
      );
    }
    return this.props.classes.map(currClass => {
      const {className, TeacherName, meetingDays, Time} = currClass;
      const {Attendance} = currClass;
      const absenceCount = Object.keys(Attendance).reduce(
        (total, key) =>
          total +
          (!Attendance[key] || Attendance[key].find(s => s.uid === userId)
            ? 0
            : 1),
        0,
      );
      if (absenceCount > 3) {
        alertClasses.push(className);
      }
      // console.log("alerts:", alertClasses)
      return (
        <Card
          ref={this.props.generateTestHook('Scene.ClassCards')}
          style={styles.card}
          key={className}
          onPress={() => {
            this.props.navigation.navigate('ClassScreen', {
              currClass: JSON.stringify(currClass),
            });
          }}>
          <Card.Title title={className} />
          <Card.Content>
            <Paragraph>Teacher: {TeacherName}</Paragraph>
            <Paragraph>Days: {meetingDays + ''} </Paragraph>
            <Paragraph>Time: {Time}</Paragraph>
            <Paragraph>Absences: {absenceCount}</Paragraph>
          </Card.Content>
        </Card>
      );
    }, _alertClasses(alertClasses));
  }
}
export default hook(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ClassCards),
);

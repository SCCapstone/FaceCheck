import React from 'react';
import {Card, Paragraph, ActivityIndicator} from 'react-native-paper';
import {View, Button, Alert, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {watchClasses, resetClassData} from 'FaceCheckApp/src/redux/app-redux';
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
  console.log('this', alertClasses);
  if (alertClasses.length !== 0) {
    Alert.alert('Too many Absences: ', alertClasses.map(c => c).join('\n'));
  }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

// _timedAlert = () => setTimeout(_alertClasses, 5000);

class ClassCards extends React.Component {
  constructor(props) {
    super(props);
    this.props.watchClasses();
    // this.props.resetClassData();
  }

  render() {
    const {currClass, userId, classes} = this.props;
    // console.log("props: ", this.props)
    const alertClasses = [];

    if (!classes || classes.length === 0) {
      return <ActivityIndicator animating={true} />;
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClassCards);

import React from 'react';
import {Card, Paragraph, ActivityIndicator} from 'react-native-paper';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {watchClasses} from 'FaceCheckApp/src/redux/app-redux';
import styles from 'FaceCheckApp/src/assets/styles';
import {hook} from 'cavy';

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

class TeacherClassCards extends React.Component {
  constructor(props) {
    super(props);
    this.props.watchClasses();
  }

  maybeRenderClassList() {
    if (this.props.classes !== []) {
      return this.props.classes.map(currClass => {
        return (
          <Card
            ref={this.props.generateTestHook('Scene.teacherClassCards')}
            style={styles.card}
            key={currClass.className}
            onPress={() => {
              this.props.navigation.navigate('TeacherClassScreen', {
                currClass: JSON.stringify(currClass),
              });
            }}>
            <Card.Title title={currClass.className} />
          </Card>
        );
      });
    } else {
      return (
        <View style={styles.centerScreenJustWowee}>
          <Text style={styles.text}>No Classes Assigned</Text>
        </View>
      );
    }
  }

  render() {
    return <View>{this.maybeRenderClassList()}</View>;
  }
}

export default hook(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TeacherClassCards),
);

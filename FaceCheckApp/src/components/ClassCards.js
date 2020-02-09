import React from 'react';
import {Card, Paragraph, ActivityIndicator} from 'react-native-paper';
import {View} from 'react-native';
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

class ClassCards extends React.Component {
  constructor(props) {
    super(props);
    this.props.watchClasses();
  }

  maybeRenderClassList() {
    if (this.props.classes !== []) {
      return this.props.classes.map(currClass => {
        return (
          <Card
            //ref={this.props.generateTestHook('Scene.SignUpEmail')}
            style={styles.card}
            key={currClass.className}
            onPress={() => {
              this.props.navigation.navigate('ClassScreen', {
                currClass: JSON.stringify(currClass),
              });
            }}>
            <Card.Title title={currClass.className} />
            <Card.Content>
              <Paragraph>Teacher: {currClass.TeacherName}</Paragraph>
            </Card.Content>
          </Card>
        );
      });
    } else {
      return <ActivityIndicator animating={true} />;
    }
  }

  render() {
    return <View>{this.maybeRenderClassList()}</View>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassCards);

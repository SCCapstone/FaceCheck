import firebase from 'react-native-firebase';
import React from 'react';
import {FAB, Portal, Appbar} from 'react-native-paper';
import {View, ScrollView, Button, BackHandler} from 'react-native';
import TeacherClassCards from 'FaceCheckApp/src/components/TeacherClassCards.js';
import styles from 'FaceCheckApp/src/assets/styles';
import {hook, useCavy, wrap} from 'cavy';
import {StackActions} from 'react-navigation';
import {resetClassData} from '../../redux/app-redux';
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    resetClassData: () => {
      dispatch(resetClassData());
    },
  };
};
class TeacherHomePageScreen extends React.Component {
  state = {currentUser: null, open: false};

  componentDidMount() {
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
    BackHandler.addEventListener('backToLoginT', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backToLoginT', this.handleBackButton);
  }

  handleBackButton() {
    console.log('backToLoginT button is pressed');
    return true;
  }
  render() {
    const {currentUser} = this.state;
    return (
      <View style={styles.screen}>
        <Appbar.Header>
          <Button
            title="Log Out"
            color="#7B1D0B"
            onPress={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  this.props.resetClassData();
                  StackActions.reset({
                    index: 0,
                    actions: [this.props.navigation.navigate('Login')],
                  });
                });
            }}
          />
          <Appbar.Content title="Teacher Home" style={{marginRight: 45}} />
        </Appbar.Header>
        <ScrollView>
          <TeacherClassCards navigation={this.props.navigation} />
        </ScrollView>
      </View>
    );
  }
}

export default hook(
  connect(
    null,
    mapDispatchToProps,
  )(TeacherHomePageScreen),
);

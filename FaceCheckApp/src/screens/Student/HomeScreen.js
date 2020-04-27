import firebase from 'react-native-firebase';
import React from 'react';
import {FAB, Portal, Appbar, Button} from 'react-native-paper';
import {View, ScrollView, BackHandler} from 'react-native';
import ClassCards from 'FaceCheckApp/src/components/ClassCards';
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
class StudentHomeScreen extends React.Component {
  state = {currentUser: null, open: false};

  componentDidMount() {
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
    BackHandler.addEventListener('backToLogin', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('backToLogin', this.handleBackButton);
  }

  handleBackButton() {
    console.log('backToLoginS button is pressed');
    return true;
  }

  render() {
    return (
      <View style={styles.screen}>
        <Appbar.Header>
          <Button
            ref={this.props.generateTestHook('Scene.studentHomeBackButton')}
            color="#D3D3D3"
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
            }}>
            Logout
          </Button>

          <Appbar.Content title="Student Home" style={{marginRight: 45}} />
        </Appbar.Header>
        <ScrollView>
          {this.state.currentUser && (
            <ClassCards
              navigation={this.props.navigation}
              userId={this.state.currentUser.uid}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

export default hook(
  connect(
    null,
    mapDispatchToProps,
  )(StudentHomeScreen),
);

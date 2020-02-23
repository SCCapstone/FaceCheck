import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import the different screens
import Loading from 'FaceCheckApp/src/screens/Loading';
import SignUp from 'FaceCheckApp/src/screens/auth/SignUp';
import Login from 'FaceCheckApp/src/screens/auth/Login';
import ClassScreen from 'FaceCheckApp/src/screens/Student/ClassScreen';
import TeacherClassScreen from 'FaceCheckApp/src/screens/Teacher/ClassScreen';
import TeacherHomeScreen from 'FaceCheckApp/src/screens/Teacher/HomeScreen';
import StudentHomeScreen from 'FaceCheckApp/src/screens/Student/HomeScreen';
import QRGeneratorScreen from 'FaceCheckApp/src/screens/Student/QRGeneratorScreen';
import QRScannerScreen from 'FaceCheckApp/src/screens/Teacher/QRScannerScreen';
import FaceScannerScreen from 'FaceCheckApp/src/screens/Student/FaceScannerScreen';

// create our app's navigation stack
const RootStack = createStackNavigator(
  {
    Loading: {
      screen: Loading,
    },
    SignUp: {
      screen: SignUp,
    },
    Login: {
      screen: Login,
    },
    TeacherHome: {
      screen: TeacherHomeScreen,
    },
    StudentHome: {
      screen: StudentHomeScreen,
    },
    ClassScreen: {
      screen: ClassScreen,
    },
    TeacherClassScreen: {
      screen: TeacherClassScreen,
    },
    QRGenerator: {
      screen: QRGeneratorScreen,
    },
    QRScanner: {
      screen: QRScannerScreen,
    },
    FaceScanner: {
      screen: FaceScannerScreen,
    },
  },
  {
    initialRouteName: 'Loading',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const App = createAppContainer(RootStack);

export default App;

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import the different screens
import Loading from 'FaceCheckApp/src/screens/Loading';
import SignUp from 'FaceCheckApp/src/screens/auth/SignUp';
import Login from 'FaceCheckApp/src/screens/auth/Login';
import ClassScreen from 'FaceCheckApp/src/screens/ClassScreen';
import StudentHomeScreen from 'FaceCheckApp/src/screens/StudentHomeScreen';
import QRGeneratorScreen from 'FaceCheckApp/src/screens/QRGeneratorScreen';
import QRScannerScreen from 'FaceCheckApp/src/screens/QRScannerScreen';

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
    StudentHome: {
      screen: StudentHomeScreen,
    },
    ClassScreen: {
      screen: ClassScreen,
    },
    QRGenerator: {
      screen: QRGeneratorScreen,
    },
    QRScanner: {
      screen: QRScannerScreen,
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

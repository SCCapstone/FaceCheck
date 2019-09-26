import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
// import the different screens
import Loading from 'FaceCheckApp/src/screens/Loading'
import SignUp from 'FaceCheckApp/src/auth/SignUp'
import Login from 'FaceCheckApp/src/auth/Login'
import AddClassScreen from 'FaceCheckApp/src/screens/AddClassScreen'
import StudentHomeScreen from 'FaceCheckApp/src/screens/StudentHomeScreen'
import QRGeneratorScreen from 'FaceCheckApp/src/screens/QRGeneratorScreen'


// create our app's navigation stack
const RootStack = createStackNavigator(
  {
    Loading: {
      screen: Loading,
      navigationOptions: {
        header: null,
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions:  {
        title: 'Sign Up',
        headerLeft: null,
        gesturesEnabled: false,
     }
    },
    Login: {
      screen: Login,
      navigationOptions:  {
        title: 'Login',
        headerLeft: null,
        gesturesEnabled: false,
     }
    },
    StudentHome: {
      screen: StudentHomeScreen,
    },
    AddClass: {
      screen: AddClassScreen,
      navigationOptions: {
        title: 'Add Classes'
      },
    },
    QRGenerator: {
      screen: QRGeneratorScreen,
      navigationOptions: {
        title: 'QR'
      },
    }
  },
  {
    initialRouteName: 'Loading',
    cardStyle: {
        backgroundColor: 'white'
    }
  }
)

const App = createAppContainer(RootStack)

export default App

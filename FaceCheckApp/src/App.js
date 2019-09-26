import { createSwitchNavigator, createAppContainer } from 'react-navigation'
// import the different screens
import Loading from 'FaceCheckApp/src/screens/Loading'
import SignUp from 'FaceCheckApp/src/auth/SignUp'
import Login from 'FaceCheckApp/src/auth/Login'
import AddClassScreen from 'FaceCheckApp/src/screens/AddClassScreen'
import StudentHomeScreen from 'FaceCheckApp/src/screens/StudentHomeScreen'
import QRGeneratorScreen from 'FaceCheckApp/src/screens/QRGeneratorScreen'


// create our app's navigation stack
const RootStack = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    StudentHomeScreen,
    AddClassScreen,
    QRGeneratorScreen
  },
  {
    initialRouteName: 'Loading',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
)

const App = createAppContainer(RootStack)

export default App

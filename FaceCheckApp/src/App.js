import { createSwitchNavigator, createAppContainer } from 'react-navigation'
// import the different screens
import Loading from 'FaceCheckApp/src/screens/Loading'
import SignUp from 'FaceCheckApp/src/auth/SignUp'
import Login from 'FaceCheckApp/src/auth/Login'
import Main from 'FaceCheckApp/src/screens/Main'
import AddClassScreen from 'FaceCheckApp/src/screens/AddClassScreen'
import StudentHomeScreen from 'FaceCheckApp/src/screens/StudentHomeScreen'
import QRGenerator from 'FaceCheckApp/src/screens/QRGeneratorScreen'


// create our app's navigation stack
const RootStack = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Home: StudentHomeScreen,
    AddClass: AddClassScreen,
    Main,
    QR: QRGenerator
  },
  {
    initialRouteName: 'Home'
  }
)

const App = createAppContainer(RootStack)

export default App

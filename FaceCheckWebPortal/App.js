import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// Import Screens
import Loading from './screens/Loading'
import Login from './screens/Login'
//import HomePage from 'FaceCheckWebPortal/screens/HomePage'


// create our app's navigation stack
const RootStack = createStackNavigator({

  Loading: { screen: Loading },
  
  Login: { screen: Login },

  //HomePage: { screen: HomePage }
  
},
  
{
  initialRouteName: 'Loading',
  defaultNavigationOptions: {
    header: null,
  }
})

const App = createAppContainer(RootStack)

export default App
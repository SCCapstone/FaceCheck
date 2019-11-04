// Imports
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Loading from '../screens/Loading'
import Login from '../screens/Login'
import HomePage from '../screens/HomePage'
import AddUser from '../screens/AddUser'


const SwitchNavigator = createSwitchNavigator(
	{
        Loading: {
			screen: Loading
        },
        
		Login: {
			screen: Login
		},
	
		HomePage: {
			screen: HomePage
		},

		AddUser: {
			screen: AddUser
		},
	},
	{
		initialRouteName: 'Loading'
	}
)

export default createAppContainer(SwitchNavigator)

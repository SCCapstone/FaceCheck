import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Loading from '../screens/Loading'
import Login from '../screens/Login'
import HomePage from '../screens/HomePage'


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
		}
	},
	{
		initialRouteName: 'Loading'
	}
)

export default createAppContainer(SwitchNavigator)
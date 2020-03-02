import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'

// Screens
import Login from '../screens/Login'
import Home from '../screens/Home'
import Loading from '../screens/Loading'
import AddTeacher from '../screens/AddTeacher'
import AddClass from '../screens/AddClass'
import AssignClass from '../screens/AssignClass'


const Stack = createStackNavigator()

export default class Navigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName = 'Loading'>
                    <Stack.Screen 
                        name = 'Login' 
                        component = {Login}
                        options = {{
                            title: 'FaceCheck Admin Portal',
                            headerTitleAlign: 'center',
                            headerLeft: false,
                            gestureEnabled: false
                        }}
                    />
                    <Stack.Screen 
                        name='Home' 
                        component={Home} 
                        options = {{
                            title: false,
                            headerTransparent: true,
                            headerLeft: false,
                            gestureEnabled: false
                        }}
                    />
                    <Stack.Screen 
                        name='Loading' 
                        component={Loading} 
                        options = {{
                            headerTransparent: true,
                            title: false,
                            gestureEnabled: false
                        }}
                    />
                    <Stack.Screen 
                        name = 'AddTeacher' 
                        component = {AddTeacher}
                        options = {{
                            title: 'create teacher account',
                            headerTitleAlign: 'center',
                            gestureDirection: 'horizontal'
                        }}
                    />
                    <Stack.Screen 
                        name = 'AddClass' 
                        component = {AddClass}
                        options = {{
                            title: 'create class',
                            headerTitleAlign: 'center',
                            gestureDirection: 'horizontal'
                        }}
                    />
                    <Stack.Screen 
                        name = 'AssignClass' 
                        component = {AssignClass}
                        options = {{
                            title: 'assign class',
                            headerTitleAlign: 'center',
                            gestureDirection: 'horizontal'
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

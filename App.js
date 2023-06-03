import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Screens/Home'
import Admin from './Screens/Admin'
import Login from './Screens/Login'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
   <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen  name='Login' component={Login}/>
          <Stack.Screen  name='Home' component={Home}/>
          <Stack.Screen  name='Admin' component={Admin}/>
        </Stack.Navigator>
   </NavigationContainer>
  )
}

export default App


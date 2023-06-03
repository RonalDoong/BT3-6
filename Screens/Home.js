import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'


const Home = (props) => {

const navigationToLogin = () =>{
  props.navigation.navigate('Login');
};

  return (
    <View>
      <Button title='Log out' onPress={navigationToLogin}/>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
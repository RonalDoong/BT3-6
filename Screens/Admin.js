import { StyleSheet, Text, View ,Button} from 'react-native'
import React from 'react'

const Admin = (props) => {
  const navigationToLogin = () =>{
    props.navigation.navigate('Login');
  };
  return (
    <View>
      <Button title='Log out' onPress={navigationToLogin}/>
      <Text>Admin</Text>
    </View>
  )
}

export default Admin

const styles = StyleSheet.create({})
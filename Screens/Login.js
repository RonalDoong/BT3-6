import { StyleSheet, Text, View, TextInput, Button ,Alert} from 'react-native'
import React from 'react'
import { useState } from 'react';
import log from '../Log'
import CustomInput from '../components/CustomInput';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    // Tạo biến users để lưu trữ danh sách user của hệ thống
    let users = [];
    let admin =[];
   
   
    // Function lấy dữ liệu từ API sử dụng fetch
    //nhanvien
    async function fetchData() {
        try {
            // Khai báo đường dẫn API
            const API_URL = 'http://192.168.10.6:3000/user';
            const response = await fetch(API_URL);
            // .json() chuyển đổi data trả về từ API sang json
            const data = await response.json();
            return data;
        } catch (error) {
            log.error('Fetch data failed ' + error);
            return null;
        }
    }

    // Function gọi fetchData sau đó lưu response từ API trả về vào biến users
    async function storeData() {
        users = await fetchData();
        log.info('users: ' + JSON.stringify(users));
    }

    storeData();
//admin
   
async function fetchData1() {
    try {
        // Khai báo đường dẫn API
        const API_URL = 'http://192.168.10.6:3000/admin';
        const response = await fetch(API_URL);
        // .json() chuyển đổi data trả về từ API sang json
        const data = await response.json();
        return data;
    } catch (error) {
        log.error('Fetch data failed ' + error);
        return null;
    }
}

 // Funtion clear message lỗi
 const clearError = (usernameError, passwordError) => {
    if (usernameError) setUsernameError('');
    if (passwordError) setPasswordError('');
};
// Function gọi fetchData sau đó lưu response từ API trả về vào biến users
async function storeData1() {
    admin = await fetchData1();
    log.info('users: ' + JSON.stringify(admin));
}

storeData1();
    // Funtion thực hiện đăng nhập
    const doLogin = () => {
        // Kiểm tra dữ liệu trên form gồm username và password
        if (username.length == 0) {
            setUsernameError('Vui lòng không để trống Username');
            return;
        }

        if (password.length == 0) {
            setPasswordError('Vui lòng không để trống Password');
            return;
        }

        // Tạo đối tượng lưu giữ thông tin login
        let request = { username: username, password: password };

        // In ra thông tin user phục vụ check lỗi
        log.info('authInfo: ' + JSON.stringify(request));

        // Kiêm tra danh sách users có null hoặc undefined không
        if (users) {
            const authInfo = users.find((user) => user.userName === request.username);
            // Thực hiện validate dữ liệu trên form và hiển thị alert
            if (!authInfo) {
                clearError(usernameError, passwordError);
                setUsernameError('Nhập sai Username ! Vui lòng nhập lại')
            }
            else {
                if (!(authInfo.passWord === request.password)) {
                    clearError(usernameError, passwordError);
                    setPasswordError('Nhập sai Password ! Vui lòng nhập lại');
                    return;
                }
                 else {
                    clearError(usernameError, passwordError);
                    Alert.alert('Notification', 'Bạn có chắc muốn đăng nhập ' + request.username, [
                        { text: 'OK', onPress: () => navigateToHome() },
                        { text: 'Cancel', onPress: () => log.info('Press Cancel') }
                    ]);
                }
            }
        };
        if (admin) {
            const authInfo = admin.find((user) => user.userName === request.username);
            // Thực hiện validate dữ liệu trên form và hiển thị alert
            if (!authInfo) {
                clearError(usernameError, passwordError);
                setUsernameError('Nhập sai Username ! Vui lòng nhập lại')
            } else {
                if (!(authInfo.passWord === request.password)) {
                    clearError(usernameError, passwordError);
                        setPasswordError('Nhập sai Password ! Vui lòng nhập lại');
                        return;
                }
                 else {
                    clearError(usernameError, passwordError);
                    Alert.alert('Notification', 'Bạn có chắc muốn đăng nhập ' + request.username, [
                        { text: 'OK', onPress: () => navigateToAdmin() },
                        { text: 'Cancel', onPress: () => log.info('Press Cancel') }
                    ]);
                }
            }
        }
    };
    const navigateToHome = () => {
        props.navigation.navigate('Home');
    };
    const navigateToAdmin = () => {
        props.navigation.navigate('Admin');
    };

  return (
    <View style = {styles.container}>
      <Text>Login</Text>
      <Text>Username</Text>
      <CustomInput value={username} setValue={setUsername} secureTextEntry = {false}/>
      <Text style={styles.errorTxt}>{usernameError}</Text>
      <Text>Password</Text>
      <CustomInput value={password} setValue={setPassword} secureTextEntry = {true}/>
      <Text style={styles.errorTxt}>{passwordError}</Text>
      <Button title='Login' onPress={doLogin}/>
    </View>
  );
};



const styles = StyleSheet.create({
      container :{
        flex:1,
        marginStart:10,
        marginEnd:10,
        flexDirection:'column',
      },
      errorTxt: {
        color: 'red',
        marginVertical: 5
    }
});
export default Login;
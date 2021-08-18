import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

import {bold, plane} from '../../assets/font';

import {GetUser, UserLogin} from '../../redux/action/index';
import {ScrollView} from 'react-native-gesture-handler';
import {lgreen} from '../../assets/color';

import url from '../../url';
import axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';

//import * as KakaoLogins from '@react-native-seoul/kakao-login';

const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const user = useSelector(state => state.user);
  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');
  const [secretpasswd, setSecretpasswd] = useState('');
  const [checkPoint, setCheckPoint] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const getUserInfo = async token => {
    console.log(user);
    await axios
      .get(`${url}/user/User/auth_user/`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then(res => {
        if (res.data) {
          let data = res.data;
          console.log(res.data);
          dispatch(GetUser(data));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onLogin = async () => {
    //확인
    if (id == '' || passwd == '') {
      Alert.alert(
        '실패',
        '아이디 혹은 비밀번호가 잘못됐습니다.\n다시 확인해주세요.',
      );
    } else {
      let body = new FormData();

      body.append('username', id.toLowerCase());
      body.append('password', passwd.toLowerCase());
      await axios
        .post(`${url}/user/token/`, body)
        .then(res => {
          if (res.data) {
            //asyncstorage에 아이디 저장
            console.log(res.data);
            Alert.alert('환영합니다!', '로그인에 성공하였습니다.');
            dispatch(UserLogin(res.data));
            getUserInfo(res.data);
          } else {
            Alert.alert(
              '아이디 혹은 비밀번호가 잘못되었습니다. 다시 시도해주세요.',
            );
          }
        })
        .catch(err => {
          console.log(err);
          Alert.alert(
            '아이디 혹은 비밀번호가 잘못되었습니다. 다시 시도해주세요.',
          );
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/loginLogo.png')}
        style={{
          width: width / 2,
          height: width / 4,
          marginBottom: 50,
          marginTop: width / 3,
        }}
        resizeMode="stretch"
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="  아이디"
          onChangeText={n => {
            setId(n);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder=" 비밀번호"
          secureTextEntry={true}
          onChangeText={n => {
            setPasswd(n);
          }}
        />
      </View>
      <View style={styles.login}>
        <TouchableOpacity style={styles.login} onPress={onLogin}>
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.reg}
        onPress={() => {
          navigation.navigate('Register');
          //signInWithKakao();
        }}>
        <Text style={styles.regText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    height: 200,
    width: 200,
    marginTop: 75,
  },
  login: {
    backgroundColor: lgreen,
    flexDirection: 'row',
    width: width - 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 25,
    fontFamily: bold,
  },
  input: {
    borderRadius: 10,
    width: width - 50,
    height: 50,
    paddingVertical: 10,
    marginVertical: 10,
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#E9E9E9',
    textAlign: 'center',
  },
  inputContainer: {},
  reg: {
    flexDirection: 'row',
    width: width - 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  regText: {
    color: 'black',
    fontSize: 17,
    fontFamily: bold,
  },
  checkContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 60,
  },
  checkPoint: {
    borderRadius: 20,
    width: 30,
    height: 30,
    borderColor: 'grey',
    borderWidth: 2,
    marginHorizontal: 10,
    justifyContent: 'flex-start',
  },
  checked: {
    backgroundColor: 'black',
  },
  checkIcon: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
  checkText: {
    color: 'black',
    fontFamily: plane,
    fontSize: 17,
  },
});

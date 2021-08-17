import React, {useState} from 'react';

import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {lgreen} from '../../assets/color';

import {bold, plane} from '../../assets/font';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

const Register = ({navigation}) => {
  const [id, setId] = useState('');
  const [idCheck, setIdCheck] = useState(false);
  const [passwd, setPasswd] = useState('');
  const [passwdcheck, setPasswdCheck] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errmessage, setErr] = useState('');
  const [checkPoint, setCheckPoint] = useState(false);

  const onidCheck = async () => {
    //아이디 체크
    if (id == '') {
      Alert.alert('X', '아이디를 입력해주세요.', [
        {
          text: '확인',
          style: 'cancel',
        },
      ]);
    } else {
      let body = new FormData();

      body.append('username', id);

      console.log(body);
      await axios
        .post(`${url}/user/User/double_check/`, body)
        .then(res => {
          console.log(res.data);
          if (res.data === 'ok') {
            Alert.alert('사용 가능한 아이디입니다.');
            setIdCheck(true);
          } else {
            Alert.alert('중복된 아이디입니다.');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const oncheck = () => {
    if (id == '') {
      setErr('아이디를 입력해주세요.');
      return false;
    }
    if (!idCheck) {
      setErr('아이디 중복확인을 해주세요.');
      return false;
    }
    if (passwd == '') {
      setErr('비밀번호를 입력해주세요.');
      return false;
    }
    if (passwdcheck == '') {
      setErr('비밀번호 확인을 입력해주세요.');
      return false;
    }
    if (passwdcheck != passwd) {
      setErr('비밀번호가 일치하지 않습니다.');
      return false;
    }
    if (name == '') {
      setErr('이름을 입력해주세요.');
      return false;
    }
    if (phone == '') {
      setErr('번호를 입력해주세요.');
      return false;
    }

    if (!checkPoint) {
      setErr('개인정보 약관에 동의해주세요.');
      return false;
    }
    return true;
    //axios코드
  };

  const onSignIn = async () => {
    if (!oncheck()) return;

    let body = new FormData();
    body.append('username', id.toLocaleLowerCase());
    body.append('password', passwd);
    body.append('name', name);
    body.append('phone', phone);

    await axios
      .post(`${url}/user/Customer/`, body)
      .then(res => {
        console.log(res.data);
        if (res.data) {
          Alert.alert('어서오세요! 농촌체험 어플 촌스러운입니다.');
          navigation.navigate('Login');
        } else {
          Alert.alert('회원가입에 실패하였습니다. ㅠㅠ \n 다시 시도해주세요.');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={styles.head}>회원가입</Text>
      </View>
      <View style={styles.inputContainer}>
        <ScrollView>
          <View style={styles.buttonSet}>
            <TextInput
              style={[styles.input, {width: width - 120}]}
              placeholder="아이디"
              onChangeText={n => {
                setId(n);
                setIdCheck(false);
              }}
            />
            <TouchableOpacity style={styles.idButton} onPress={onidCheck}>
              <Text style={styles.idButtonText}>중복확인</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            secureTextEntry={true}
            onChangeText={n => setPasswd(n)}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            onChangeText={n => setPasswdCheck(n)}
          />
          <TextInput
            style={styles.input}
            placeholder="이름"
            onChangeText={n => setName(n)}
          />

          <TextInput
            style={styles.input}
            placeholder="휴대폰 번호(010-0000-0000)"
            onChangeText={n => setPhone(n)}
          />

          <View style={styles.checkContainer}>
            <TouchableOpacity
              style={styles.checkPoint}
              onPress={() => {
                setCheckPoint(!checkPoint);
              }}>
              <Text style={styles.checkIcon}>{checkPoint && '✔'}</Text>
            </TouchableOpacity>
            <Text style={styles.checkText}>개인정보 처리약관 동의(필수)</Text>
          </View>

          <TouchableOpacity style={styles.buttonContainer} onPress={onSignIn}>
            <Text style={styles.regButton}>회원가입</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.errmessage}>{errmessage}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
    marginTop: width / 20,
  },
  head: {
    fontFamily: bold,
    fontSize: 30,
    paddingVertical: 20,
    textAlign: 'center',
  },
  buttonSet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: lgreen,
    color: 'black',
    height: width / 8,
    justifyContent: 'center',
    fontSize: 20,
    marginVertical: width / 30,
    borderRadius: 10,
  },
  regButton: {
    fontSize: 25,
    fontFamily: bold,
    color: 'white',
    textAlign: 'center',
  },
  idButton: {
    width: width / 4,
    marginBottom: width / 60,
    backgroundColor: lgreen,
    height: width / 9,
    justifyContent: 'center',
    borderRadius: 7,
  },
  idButtonText: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    fontFamily: bold,
  },
  inputContainer: {
    width: width - width / 30,
    marginLeft: width / 60,
  },
  input: {
    backgroundColor: 'white',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    fontSize: width / 28,
    width: width - width / 20,
    marginVertical: width / 30,
  },
  errmessage: {
    textAlign: 'center',
    color: 'red',
    fontFamily: plane,
    fontSize: 15,
  },
  checkContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: width / 20,
  },
  checkPoint: {
    borderRadius: 20,
    width: width / 15,
    height: width / 15,
    borderColor: 'grey',
    borderWidth: 2,
    marginRight: 10,
  },
  checkIcon: {
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
  },
  checkText: {
    color: 'black',
    fontFamily: plane,
    fontSize: width / 28,
  },
});

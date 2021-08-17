import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import {lgreen, ogreen} from '../../assets/color';
import {bold, plane} from '../../assets/font';

import {RadioButton} from 'react-native-paper';
import AlertModal from '../subTabs/Modal';
import style from '../../assets/style';
import Logo from '../subTabs/Logo';
import {useDispatch, useSelector} from 'react-redux';

import axios from 'axios';
import url from '../../url';
import Loading from './Loading';
import {GetUser} from '../../redux/action';

const {width, height} = Dimensions.get('window');

function Reservation({navigation, route}) {
  const user = useSelector(state => state.user);
  //const [userData, setUserData] = useState(null);
  const [num, setNum] = useState('1');
  const [price, setPrice] = useState(route.params.info.tour_price);
  const [checked, setChecked] = React.useState('card');
  const dispatch = useDispatch();

  const info = route.params.info;

  const getUserInfo = () => {
    axios
      .get(`${url}/user/Customer/`, {
        headers: {
          Authorization: user.token.access,
        },
      })
      .then(res => {
        setUserData(res.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    //  console.log(route.params.info);
  }, []);

  const onSubmit = async () => {
    let body = new FormData();

    body.append('reserv_time', `${route.params.date} ${route.params.time}`);
    body.append('person_num', num);
    body.append('user', user.username);
    body.append('tour', info.tour_name);

    await axios
      .post(`${url}/Reserv/`, body, {
        headers: {
          Authorization: `Bearer ${user.token.access}`,
        },
      })
      .then(res => {
        if (res.data) {
          //dispatch(GetUser(res.data[0]));
          Alert.alert('예약이 완료되었습니다.');
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert('예약에 실패하였습니다. 인원수를 확인해주세요.');
      });

    navigation.navigate('MyReservation');
  };

  if (user.name)
    return (
      <View style={styles.container}>
        <AlertModal visible={false} />
        <Logo
          style={{marginBottom: 10, marginTop: 15, width: 100, height: 45}}
        />
        <View
          style={[
            style.row,
            {alignItems: 'flex-start', width: width - 50, marginTop: 15},
          ]}>
          <Image
            source={require('../../assets/bori.png')}
            style={[style.icon, {marginLeft: 15}]}
          />
          <Text style={[style.title, {fontSize: 20}]}> 신청자 정보 </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={[styles.section, style.row]}>
            <View style={[styles.column, styles.part]}>
              <Text style={styles.text}>이름</Text>
              <Text style={styles.text}>핸드폰</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{user.name}</Text>
              <Text style={styles.text}>{user.phone}</Text>
            </View>
          </View>
          <View style={[styles.section, style.row]}>
            <View style={[style.column, styles.part]}>
              <Text style={styles.text}>체험장</Text>
              <Text style={styles.text}>예약 일자</Text>
              <Text style={styles.text}>예약 시간</Text>
              <Text style={styles.text}>예약자 수</Text>
              <Text style={styles.text}>가격</Text>
            </View>
            <View style={style.column}>
              <Text style={styles.text}> {info.tour_name}</Text>
              <Text style={styles.text}> {route.params.date}</Text>
              <Text style={styles.text}> {route.params.time}</Text>

              <View style={styles.nums}>
                <TouchableOpacity
                  style={styles.UpDown}
                  onPress={() => {
                    let next = Number(num) ? Number(num) - 1 : 0;
                    setNum(String(next));
                    setPrice(info.tour_price * next);
                  }}>
                  <Text style={styles.UpDownText}>-</Text>
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    type
                    keyboardType="number-pad"
                    defaultValue={num}
                    onChangeText={n => {
                      setNum(String(n));
                      setPrice(info.tour_price * Number(n));
                    }}
                    value={num}
                  />
                </View>
                <TouchableOpacity
                  style={styles.UpDown}
                  onPress={() => {
                    let next = Number(num) + 1;
                    setNum(String(next));
                    setPrice(info.tour_price * next);
                  }}>
                  <Text style={styles.UpDownText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>{price}</Text>
            </View>
          </View>
          <View style={[styles.section, style.row]}>
            <Text
              style={[
                styles.part,
                {
                  color: ogreen,
                  fontFamily: bold,
                  fontSize: 15,
                },
              ]}>
              결제 수단
            </Text>
            <View style={[style.column, {}]}>
              <View style={style.row}>
                <RadioButton
                  color={ogreen}
                  value="card"
                  status={checked === 'card' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
                <Text style={styles.radioText}>카드 결제</Text>
              </View>
              <View style={style.row}>
                <RadioButton
                  color={ogreen}
                  value="account"
                  status={checked === 'account' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('account')}
                />
                <Text style={styles.radioText}>무통장 입금</Text>
              </View>
              <View style={style.row}>
                <RadioButton
                  color={ogreen}
                  value="phone"
                  status={checked === 'phone' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('phone')}
                />
                <Text style={styles.radioText}>핸드폰 결제</Text>
              </View>
              <View style={style.row}>
                <RadioButton
                  color={ogreen}
                  value="point"
                  status={checked === 'point' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('point')}
                />
                <Text style={styles.radioText}>충전 금액 사용</Text>
              </View>
              <View style={styles.point}>
                <Text style={{right: 5}}>{user.credit}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>예약확정</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  else return <Loading />;
}

export default Reservation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  section: {
    borderBottomColor: lgreen,
    borderBottomWidth: 1,
    width: width - 60,
    padding: 10,
    marginBottom: 10,
  },
  part: {
    width: width / 3.2,
  },
  inputContainer: {
    backgroundColor: '#F5F5F5',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    width: width / 8,
    height: 40,
    marginHorizontal: 7,
  },
  input: {
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    color: '#6D6D6D',
    fontFamily: plane,
    marginVertical: 10,
  },
  nums: {
    display: 'flex',
    flexDirection: 'row',
  },
  UpDown: {
    backgroundColor: lgreen,
    borderRadius: 30,
    width: 35,
    height: 35,
  },
  UpDownText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    top: -8,
  },
  button: {
    width: width - 20,
    marginVertical: 0,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: lgreen,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
    fontFamily: bold,
  },
  radioText: {
    marginTop: 5,
  },
  point: {
    marginLeft: width / 10,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    display: 'flex',
    alignItems: 'flex-end',
    padding: 2,
    width: width / 4,
  },
});

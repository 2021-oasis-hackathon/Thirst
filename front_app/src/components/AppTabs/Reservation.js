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

const {width, height} = Dimensions.get('window');

function Reservation({navigation, route}) {
  const [num, setNum] = useState('1');
  const [price, setPrice] = useState(route.params.price);
  const [checked, setChecked] = React.useState('card');
  const modal = useRef();

  useEffect(() => {
    console.log(route.params);

    // 신청일, 체험시간, 잔여석
  }, []);

  const onSubmit = () => {
    if (num > route.params.remain) modal.visible = true;
    else {
    }
  };

  return (
    <View style={styles.container}>
      <AlertModal ref={modal} visible={false} />
      <View style={[styles.row, styles.header]}>
        <Image
          source={require('../../assets/bori.png')}
          style={[style.icon, {marginLeft: 15}]}
        />
        <Text style={styles.title}> 신청자 정보 </Text>
      </View>
      <View>
        <View style={[styles.section, styles.row]}>
          <View style={[styles.column, styles.part]}>
            <Text style={styles.text}>이름</Text>
            <Text style={styles.text}>핸드폰</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>발견했어요</Text>
            <Text style={styles.text}>010-0000-0000</Text>
          </View>
        </View>
        <View style={[styles.section, styles.row]}>
          <View style={[styles.column, styles.part]}>
            <Text style={styles.text}>체험장</Text>
            <Text style={styles.text}>예약 일자</Text>
            <Text style={styles.text}>예약 시간</Text>
            <Text style={styles.text}>예약자 수</Text>
            <Text style={styles.text}>가격</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}> {route.params.name}</Text>
            <Text style={styles.text}> {route.params.date}</Text>
            <Text style={styles.text}> {route.params.time}</Text>

            <View style={styles.nums}>
              <TouchableOpacity
                style={styles.UpDown}
                onPress={() => {
                  let next = Number(num) ? Number(num) - 1 : 0;
                  setNum(String(next));
                  setPrice(route.params.price * next);
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
                    setPrice(route.params.price * Number(n));
                  }}
                  value={num}
                />
              </View>
              <TouchableOpacity
                style={styles.UpDown}
                onPress={() => {
                  let next = Number(num) + 1;
                  setNum(String(next));
                  setPrice(route.params.price * next);
                }}>
                <Text style={styles.UpDownText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>{price}</Text>
          </View>
        </View>
        <View style={[styles.section, styles.row]}>
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
          <View style={[styles.column, {}]}>
            <View style={styles.row}>
              <RadioButton
                color={ogreen}
                value="card"
                status={checked === 'card' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text style={styles.radioText}>카드 결제</Text>
            </View>
            <View style={styles.row}>
              <RadioButton
                color={ogreen}
                value="account"
                status={checked === 'account' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('account')}
              />
              <Text style={styles.radioText}>무통장 입금</Text>
            </View>
            <View style={styles.row}>
              <RadioButton
                color={ogreen}
                value="phone"
                status={checked === 'phone' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('phone')}
              />
              <Text style={styles.radioText}>핸드폰 결제</Text>
            </View>
            <View style={styles.row}>
              <RadioButton
                color={ogreen}
                value="point"
                status={checked === 'point' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('point')}
              />
              <Text style={styles.radioText}>충전 금액 사용</Text>
            </View>
            <View style={styles.point}>
              <Text>10,000</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>예약확정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Reservation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    width: width,
    marginBottom: 5,
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
    padding: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontFamily: bold,
    fontSize: 25,
    marginVertical: 5,
    color: lgreen,
  },
  section: {
    borderBottomColor: lgreen,
    borderBottomWidth: 1,
    width: width - 60,
    padding: 20,
  },
  part: {
    width: width / 3,
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

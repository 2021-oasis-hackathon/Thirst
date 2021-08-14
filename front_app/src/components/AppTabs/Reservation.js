import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {lgreen} from '../../assets/color';
import {bold} from '../../assets/font';

import {RadioButton} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

function Reservation({navigation, route}) {
  const [num, setNum] = useState(1);
  const [price, setPrice] = useState(1);
  const [checked, setChecked] = React.useState('first');

  useEffect(() => {
    console.log(route.params);
    // 신청일, 체험시간, 잔여석
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.header]}>
        <Image
          source={require('../../assets/bori.png')}
          style={[styles.icon, {marginLeft: 15}]}
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
            <Text style={styles.text}>예약 시간</Text>
            <Text style={styles.text}>예약 일자</Text>
            <Text style={styles.text}>예약자 수</Text>
            <Text style={styles.text}>가격</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}> {route.params.date}</Text>
            <Text style={styles.text}> {route.params.time}</Text>

            <View style={styles.nums}>
              <TouchableOpacity
                style={styles.UpDown}
                onPress={() => {
                  setNum(num ? num - 1 : 0);
                }}>
                <Text style={styles.UpDownText}>-</Text>
              </TouchableOpacity>
              <Text>{num}</Text>
              <TouchableOpacity
                style={styles.UpDown}
                onPress={() => {
                  setNum(num + 1);
                }}>
                <Text style={styles.UpDownText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.text}> 10,000</Text>
          </View>
        </View>
        <View style={[styles.section, styles.row]}>
          <Text>결제 수단</Text>
          <View style={styles.column}>
            <View style={styles.row}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text style={styles.radioText}>카드 결제</Text>
            </View>
            <View style={styles.row}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text style={styles.radioText}>무통장 입금</Text>
            </View>
            <View style={styles.row}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text style={styles.radioText}>핸드폰 결제</Text>
            </View>
            <View style={styles.row}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text style={styles.radioText}>충전 금액 사용</Text>
            </View>
            <View style={{}}>
              <Text>10,000</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setNum(num + 1);
          }}>
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
  icon: {
    width: 30,
    height: 29,
  },
  text: {
    fontSize: 15,
    color: '#6D6D6D',
    fontFamily: bold,
    marginVertical: 10,
  },
  nums: {
    display: 'flex',
    flexDirection: 'row',
  },
  UpDown: {
    backgroundColor: lgreen,
    borderRadius: 30,
    width: 40,
    height: 40,
  },
  UpDownText: {
    fontSize: 30,
    textAlign: 'center',
  },
  button: {
    width: width - 20,
    marginVertical: 5,
    paddingVertical: 12,
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
});

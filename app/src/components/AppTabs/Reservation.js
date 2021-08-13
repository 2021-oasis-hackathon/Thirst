import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {lgreen} from '../../assets/color';

function Reservation({navigation, route}) {
  const [num, setNum] = useState(1);
  const [price, setPrice] = useState(1);

  useEffect(() => {
    console.log(route.params);
    // 신청일, 체험시간, 잔여석
  }, []);

  return (
    <View style={styles.container}>
      <Text> 예약 확인 </Text>
      <View>
        <Text> 신청일 : {route.params.date}</Text>
        <Text> 체험 시간 : {route.params.time}</Text>
        <View style={styles.nums}>
          <Text>인원수</Text>
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

        <TouchableOpacity
          style={styles.UpDown}
          onPress={() => {
            setNum(num + 1);
          }}>
          <Text>예약확정</Text>
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
    justifyContent: 'center',
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
});

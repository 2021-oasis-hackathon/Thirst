import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {lgreen} from '../../assets/color';
import {bold} from '../../assets/font';
import style from '../../assets/style';

const {width, height} = Dimensions.get('window');

function Profile(props) {
  return (
    <View style={styles.container}>
      <View style={[styles.profile, styles.border]}>
        <View style={styles.img}></View>
        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.text}>사용자</Text>
            <Text style={styles.text}>핸드폰</Text>
            <Text style={styles.text}>잔고</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>발견했어요</Text>
            <Text style={styles.text}>010-0000-0000</Text>
            <View style={styles.row}>
              <Text style={styles.text}>24000</Text>
              <TouchableOpacity style={styles.chargeButton}>
                <Text style={styles.chargeText}>충전</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.profile, styles.border, {alignItems: 'flex-start'}]}>
        <View style={[style.row, styles.coupon]}>
          <Image style={style.icon} source={require('../../assets/bori.png')} />
          <Text style={styles.couponText}>내 쿠폰</Text>
        </View>
        <View style={[styles.section, styles.coupons]}></View>
      </View>
      <TouchableOpacity style={styles.logout}>
        <Text style={styles.logoutText}> 로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  img: {
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: lgreen,
    marginBottom: 10,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  border: {
    borderRadius: 10,
    borderColor: '#E1E1E1',
    borderWidth: 1,
  },
  profile: {
    marginVertical: 10,
    paddingVertical: 20,
    width: width - 50,
    alignItems: 'center',
  },
  text: {
    borderBottomColor: lgreen,
    borderBottomWidth: 1,
    padding: 10,
    paddingLeft: 20,
    color: '#6D6D6D',
  },
  section: {
    width: width / 3,
  },
  chargeButton: {
    top: 10,
    backgroundColor: lgreen,
    borderRadius: 10,
    height: 30,
    width: 53,
    left: 10,
  },
  chargeText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: bold,
    fontSize: 17,
    top: 5,
  },
  coupon: {
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1,
    width: width - 50,
    paddingLeft: 20,
    top: -5,
    paddingBottom: 10,
  },
  coupons: {
    height: height / 4,
  },
  couponText: {
    fontSize: 17,
    color: '#6D6D6D',
    left: 10,
  },
  logout: {
    backgroundColor: lgreen,
    width: width / 2.5,
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 20,
    fontFamily: bold,
  },
});

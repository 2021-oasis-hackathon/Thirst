import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import style from '../../assets/style';

const {width, height} = Dimensions.get('window');

function MyReservation(props) {
  return (
    <View style={styles.container}>
      <View style={[style.row, styles.section]}>
        <Image source={require('../../assets/bori.png')} style={style.icon} />
        <Text style={styles.title}>내 예약 현황</Text>
      </View>
    </View>
  );
}

export default MyReservation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  section: {},
  day: {
    width: width - 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  title: {
    fontSize: 20,
  },
});

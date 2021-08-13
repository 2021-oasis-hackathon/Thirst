import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {bold, plane} from '../assets/font';
import Gwangju from './Maps/Gwangju';

const {width, height} = Dimensions.get('window');

function Home(props) {
  const [select, setSelect] = useState(2);
  // 1 = 전북, 2= 광주, 3=전남
  return (
    <View style={styles.container}>
      <View style={[styles.nav, styles.row]}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.navText}>전북</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.navText}>광주</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.navText}>전남</Text>
        </TouchableOpacity>
      </View>
      {select == 2 ? <Gwangju /> : <Gwangju />}
      <View style={styles.section}>
        <Image source={require('../assets/bori.png')} style={styles.icon} />
        <Text style={styles.title}>오늘의</Text>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  nav: {
    borderBottomWidth: 3,
    borderBottomColor: '#E9E9E9',
    height: 52,
    marginTop: 25,
    width: width,
    paddingHorizontal: 50,
  },
  icon: {
    width: 25,
    height: 29,
  },
  navText: {
    color: '#94AF23',
    fontFamily: bold,
    fontSize: 25,
  },
  section: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderColor: '#E1E1E1',
    borderWidth: 2,
    height: 500,
    width: width - 50,
  },
  title: {
    color: '#6D6D6D',
    fontSize: 18,
    fontFamily: plane,
  },
});

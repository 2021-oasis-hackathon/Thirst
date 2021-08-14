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
import TodaysReview from './subTabs/todaysReview';

const {width, height} = Dimensions.get('window');

function Home(props) {
  const [select, setSelect] = useState(2);
  // 1 = 전북, 2= 광주, 3=전남
  return (
    <View style={styles.container}>
      <View style={[styles.nav]}>
        <View style={[styles.row, styles.center]}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => {
              setSelect(1);
            }}>
            <Text style={styles.navText}>전북</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => setSelect(2)}>
            <Text style={styles.navText}>광주</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => setSelect(3)}>
            <Text style={styles.navText}>전남</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.bars, styles.row]}>
        <View
          style={[
            styles.bar,
            select == 1 ? styles.selected : styles.nonSelected,
          ]}></View>
        <View
          style={[
            styles.bar,
            select == 2 ? styles.selected : styles.nonSelected,
          ]}></View>
        <View
          style={[
            styles.bar,
            select == 3 ? styles.selected : styles.nonSelected,
          ]}></View>
      </View>
      {select == 2 ? (
        <Gwangju navigation={props.navigation} />
      ) : (
        <View>
          <Text>다른곳</Text>
        </View>
      )}
      <TodaysReview navigation={props.navigation} />
    </View>
  );
}

export default Home;

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
  nav: {
    borderBottomWidth: 3,
    borderBottomColor: '#E9E9E9',
    height: 50,
    marginVertical: 17,
    width: width,
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 29,
  },
  navText: {
    color: '#94AF23',
    fontFamily: bold,
    fontSize: 23,
  },
  navItem: {
    paddingHorizontal: width / 10,
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
  selected: {
    width: width / 3,
    height: 2.5,
    top: -20,
    backgroundColor: '#ABA730',
  },
  nonSelected: {
    width: width / 3,
    height: 0,
  },
  bars: {
    alignItems: 'flex-start',
  },
});

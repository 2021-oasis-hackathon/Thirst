import {white} from 'chalk';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {lgreen} from '../../assets/color';
import {bold, plane} from '../../assets/font';

import style from '../../assets/style';

const {width, height} = Dimensions.get('window');

const dayArray = ['일', '월', '화', '수', '목', '금', '토'];

const testData = [
  {
    time: '09:00',
    remain: 4,
    total: 7,
  },
  {
    time: '11:00',
    remain: 7,
    total: 7,
  },
  {
    time: '13:00',
    remain: 0,
    total: 7,
  },
  {
    time: '15:00',
    remain: 4,
    total: 7,
  },
  {
    time: '17:00',
    remain: 7,
    total: 7,
  },
];
const info = {
  name: '감자 수확 체험',
  price: 10000,
};

function Scheduler({navigation}) {
  const [dataList, setDataList] = useState({});
  const [selectList, setSelectList] = useState({});
  const [barLocation, setbarLocation] = useState(0);

  const renderItem = (item, day) => {
    if (item.length)
      return item.map((i, index) => {
        return (
          <TouchableOpacity
            style={styles.item}
            key={`${day}-${index}`}
            onPress={() => {
              navigation.navigate('Reservation', {
                name: info.name,
                price: info.price,
                time: i.time,
                date: day,
                remain: 5,
              });
            }}>
            <Text style={styles.itemTime}>{i.time}</Text>
            <Text style={styles.itemPerson}>
              {i.remain}/{i.total}
            </Text>
          </TouchableOpacity>
        );
      });
    else return <Text>휴일입니다!</Text>;
  };

  const makeBarItems = () => {
    const today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let day = today.getDay();
    let datas = {};
    let select = {};

    for (let i = 0; i < 14; i++) {
      let key = `${month}/${date}`;
      datas[key] = {
        date: date,
        data: i % 2 == 0 ? testData : [],
        checked: i < 4 ? true : false,
        day: dayArray[day],
      };
      date = date + 1;
      day = (day + 1) % 7;
      if (date == 32) {
        date = 1;
        month = month + 1;
      }
      if (i < 4) select[key] = datas[key].data;
    }

    setDataList(datas);

    setSelectList(select);
  };

  useEffect(() => {
    makeBarItems();
  }, []);

  if (!dataList)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  else
    return (
      <View style={styles.container}>
        <View style={styles.dateFrame}>
          <View style={styles.miniBar}>
            <Text style={styles.barText}>{'<'}</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={[style.dateSection]}>
            {Object.entries(dataList).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  let datas = {...dataList};
                  datas[key].checked = !datas[key].checked;
                  setDataList(datas);
                  let select = {...selectList};
                  if (datas[key].checked) select[key] = datas[key].data;
                  else delete select[key];
                  setSelectList(select);
                }}>
                <View
                  style={[
                    style.column,
                    styles.dateItem,
                    value.checked ? styles.selected : styles.nonSelected,
                  ]}>
                  <Text
                    style={[
                      styles.dateText,
                      value.checked ? styles.selected : styles.nonSelected,
                    ]}>
                    {value.day}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      value.checked ? styles.selected : styles.nonSelected,
                    ]}>
                    {value.date}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.miniBar}>
            <Text style={styles.barText}>{'>'}</Text>
          </View>
        </View>
        <View style={[styles.bar]} />
        <View style={{alignItems: 'center'}}>
          <ScrollView contentContainerStyle={styles.itemScroll}>
            {Object.entries(selectList).map(([key, value]) => (
              <View key={`item${key}`} style={[styles.day, style.row]}>
                <View style={styles.dateView}>
                  <Text style={styles.date}>{key}</Text>
                </View>
                <View style={[styles.items, style.row]}>
                  {renderItem(value, key)}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
}

export default Scheduler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  bar: {
    width: width / 4,
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  miniBar: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  barText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: lgreen,
  },
  dateFrame: {
    height: 90,
    borderBottomColor: lgreen,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  dateSection: {
    width: width,
    height: 90,
    backgroundColor: 'red',
  },
  dateItem: {
    backgroundColor: lgreen,
    width: width / 6.3,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: 'white',
    fontSize: 18,
    marginTop: 5,
    fontFamily: bold,
  },
  selected: {
    backgroundColor: 'white',
    color: lgreen,
  },
  nonSelected: {
    backgroundColor: lgreen,
    color: 'white',
  },
  itemScroll: {},
  items: {
    backgroundColor: 'white',
    width: width - 60,
    borderRadius: 5,
    marginRight: 10,
    flexWrap: 'wrap',
    marginLeft: 20,
  },
  item: {
    width: width / 4.5,
    borderColor: '#94af23',
    backgroundColor: 'white',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 5,
    height: 'auto',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemTime: {
    fontSize: 15,
    color: '#3D550C',
    textAlign: 'center',
  },
  itemPerson: {
    color: '#94AF23',
    textAlign: 'center',
    fontSize: 11,
  },
  button: {
    backgroundColor: lgreen,
    width: width / 5,
  },
  time: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
  },
  day: {
    width: width - 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  date: {
    margin: 15,
    fontSize: 20,
    fontFamily: bold,
    color: '#6D6D6D',
  },
  dateView: {
    borderRightColor: '#ABA730',
    borderRightWidth: 1,
  },
});

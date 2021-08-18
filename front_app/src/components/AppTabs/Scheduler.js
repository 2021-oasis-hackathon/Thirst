import axios from 'axios';
import {white} from 'chalk';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

import {lgreen} from '../../assets/color';
import {bold, plane} from '../../assets/font';

import style from '../../assets/style';
import {url} from '../../url';
import {times} from '../../timeTable';
import Loading from './Loading';
const {width, height} = Dimensions.get('window');

const dayArray = ['일', '월', '화', '수', '목', '금', '토'];

function Scheduler({navigation, route}) {
  const user = useSelector(state => state.user);
  const [dateList, setDateList] = useState({});
  const [selectList, setSelectList] = useState({});
  const [loading, setLoading] = useState(true);
  const [init, setInit] = useState(false);
  // const [cache, setCache] = useState({});

  const info = route.params.info;
  const scrollRef = useRef(null);

  const renderItem = (item, day) => {
    if (item.length)
      return item.map((i, index) => {
        return (
          <TouchableOpacity
            style={styles.item}
            key={`${day}-${index}`}
            onPress={() => {
              navigation.navigate('Reservation', {
                info: info,
                time: i.time,
                time_num: i.time_num,
                date: day,
                year: i.year,
                reserved: i.reserved,
              });
            }}>
            <Text style={styles.itemTime}>{i.time}</Text>
            <Text style={styles.itemPerson}>
              {i.reserved}/{info.tour_max_person_at_one}
            </Text>
          </TouchableOpacity>
        );
      });
    else return <Text>휴일입니다!</Text>;
  };

  const sortItems = select => {
    let keys = Object.keys(select);

    keys.sort();
    let sortedList = {};
    for (let i = 0; i < keys.length; i++) sortedList[keys[i]] = select[keys[i]];

    setSelectList(sortedList);
  };

  const getSchedule = async (year, date) => {
    let body = new FormData();
    setLoading(true);
    body.append('reserv_time', `${year}-${date}`);
    body.append('tour_name', info.tour_name);

    await axios
      .post(`${url}/Reserv/reserv_oneday/`, body, {
        headers: {
          Authorization: `Bearer ${user.token.access}`,
        },
      })
      .then(res => {
        if (res.data) {
          // let dates = {...dateList};
          // dates[key] = {
          //   date: key,
          //   data: res.data,
          //   checked: true,
          //   day: dayArray[day],
          // };
          let new_select = selectList;
          let data = res.data[0];

          new_select[date] = [];
          for (let i = 0; i < times.length; i++) {
            new_select[date].push({
              year: year,
              time: times[i],
              time_num: i + 1,
              reserved: data[`time_${i + 1}`],
            });
          }

          sortItems({...new_select});
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const initDates = async () => {
    setInit(false);
    const today = new Date();
    let year = today.getFullYear();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let day = today.getDay();
    let datas = {};
    let select = {};

    for (let i = 0; i < 14; i++) {
      let key = `${String(month).padStart(2, '0')}-${String(date).padStart(
        2,
        '0',
      )}`;
      if (i < 4) getSchedule(today.getFullYear(), key, true);
      datas[key] = {
        year: year,
        day: dayArray[day],
        date: key,
        checked: i < 4,
      };
      if (date == 31) {
        date = 1;
        month = 31;
      }
      date += 1;
      day = (day + 1) % 7;
    }

    setDateList(datas);
    // setSelectList(select);
    setLoading(false);
  };

  useEffect(() => {
    initDates();
  }, []);

  useEffect(() => {
    setInit(true);
  }, [dateList]);

  if (!dateList && !init) return <Loading />;
  else
    return (
      <View style={styles.container}>
        <View style={styles.dateFrame}>
          {loading && <Loading />}
          <View style={styles.miniBar}>
            <Text style={styles.barText}>{'<'}</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={[style.dateSection]}>
            {Object.entries(dateList).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  let dates = {...dateList};
                  dates[key].checked = !dates[key].checked;
                  setDateList(dates);

                  let select = {...selectList};
                  if (dates[key].checked) {
                    getSchedule(dates[key].year, key, false);
                  } else delete select[key];
                  sortItems(select);
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

        <ScrollView
          contentContainerStyle={styles.itemScroll}
          ref={scrollRef}
          onContentSizeChange={() => {
            // console.log(itemScroll);
            scrollRef.current.scrollToEnd({animated: true});
          }}>
          {!loading &&
            Object.entries(selectList).map(([key, value]) => (
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

import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import style from '../../assets/style';
import {LocaleConfig} from 'react-native-calendars';
import {Calendar} from 'react-native-calendars';
import axios from 'axios';
import {lgreen} from '../../assets/color';
import {bold} from '../../assets/font';
import {useSelector} from 'react-redux';

import Loading from '../AppTabs/Loading';

import {url} from '../../url';
import {times} from '../../timeTable';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

const {width, height} = Dimensions.get('window');

const MyReservation = ({navigation, route}) => {
  const user = useSelector(state => state.user);
  const [reservList, setReservList] = useState(null);
  const [markedList, setMarkedList] = useState(null);

  const sortList = data => {
    let obj = {};

    for (let i = 0; i < data.length; i++)
      obj[
        `${data[i].Reserv_time}${data[i].Reserv_time_detail}${data[i].tour_name}`
      ] = data[i];

    let keys = Object.keys(obj);

    keys.sort();
    let sortedList = {};
    for (let i = 0; i < keys.length; i++) sortedList[keys[i]] = obj[keys[i]];

    setReservList({...sortedList});
  };

  const getList = async () => {
    let body = new FormData();
    body.append('myname', user.username);
    await axios
      .post(`${url}/Reserv/FindMyReserv/`, body, {
        headers: {
          Authorization: `Bearer ${user.token.access}`,
        },
      })
      .then(res => {
        //  console.log(res.data);
        if (res.data) sortList(res.data);
        let marked = {};
        let date = new Date();
        let today = `${date.getFullYear()}-`;
        today += String(date.getMonth() + 1).padStart(2, '0');
        today += '-';
        today += String(date.getDate()).padStart(2, '0');

        //  console.log(today);
        marked[today] = {selected: true, selectedColor: '#94AF23'};
        for (let i = 0; i < res.data.length; i++) {
          let data = res.data[i];
          let key = data.Reserv_time.split(' ')[0];
          if (key === today) continue;
          // console.log(data.Reserv_time);
          marked[key] = {
            marked: true,
            dotColor: '#3D550C',
          };
        }
        //    console.log(marked);

        setMarkedList({...marked});
      })
      .catch(err => {
        console.log('my reservation get error');
      });
  };

  useEffect(() => {
    getList();
  }, [route.params]);

  useEffect(() => {
    getList();
  }, []);

  if (reservList && markedList)
    return (
      <View style={styles.container}>
        <View style={styles.my_res}>
          <View style={styles.cal}>
            <Calendar
              current={new Date()}
              onDayPress={day => {
                console.log('selected day', day);
              }}
              onDayLongPress={day => {
                console.log('selected day', day);
              }}
              monthFormat={'yyyy MM'}
              onMonthChange={month => {
                console.log('month changed', month);
              }}
              hideArrows={false}
              hideExtraDays={false}
              firstDay={0}
              //markingType={'period'}

              markedDates={markedList}
              enableSwipeMonths={true}
              style={styles.Calendar}
              theme={{
                arrowColor: '#94AF23',
              }}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Image source={require('../../assets/bori.png')} style={style.icon} />
          <Text style={styles.titleText}>내 예약 현황</Text>
        </View>
        <ScrollView contentContainerStyle={{}}>
          {Object.entries(reservList).map(([key, value]) => {
            let datetime = value.Reserv_time.split(' ');

            return (
              <View style={styles.section} key={key}>
                <View style={styles.row}>
                  <View style={[style.column, {alignItems: 'center'}]}>
                    <Text style={styles.date}>{datetime[0].substring(5)}</Text>
                    <TouchableOpacity
                      style={styles.reviewButton}
                      onPress={() => {
                        navigation.navigate('ReviewWriter', {
                          tour: value.tour_name,
                        });
                      }}>
                      <Text style={styles.reviewText}>후기작성</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.res_info}>
                    예약 시간 {'\n'}
                    체험명 {'\n'}
                    체험장 {'\n'}
                    예약 인원 {'\n'}
                  </Text>

                  <Text style={styles.res_info}>
                    {times[value.Reserv_time_detail - 1]} {'\n'}
                    {value.tour_name} {'\n'}
                    {value.tour_addr} {'\n'}
                    {value.Person_num}{' '}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  else return <Loading />;
};

export default MyReservation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  //section: {},
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

  cal: {
    margin: 10,
    marginTop: 5,
    marginBottom: 83,
    //borderColor: '#6D6D6D',
    //borderWidth: 1,
    width: 330,
    height: 250,
  },
  my_res: {
    borderRadius: 10,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    marginVertical: 10,
    //paddingVertical: 20,
    width: width - 50,

    //width:50,
    alignItems: 'center',
  },
  titleText: {
    margin: 5,
    marginBottom: 12,
    fontSize: 20,
    color: '#6D6D6D',
    fontWeight: 'bold',
    //width: width - 50,
    textAlign: 'left',
    //borderBottomWidth: 1,
  },
  section: {
    borderColor: '#E1E1E1',
    borderTopWidth: 1,
    //flex: 1,
    width: width - 50, //크기 맞춰서 변경하기
  },
  date: {
    color: '#6D6D6D',
    fontSize: 20,
    fontWeight: '500',
    margin: 20,
    marginRight: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  res_info: {
    color: '#3D550C',
    fontSize: 12,
    margin: 20,
    marginRight: 0,
    marginBottom: 10,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  row: {
    width: width - 80,
    flexDirection: 'row',
  },
  reviewButton: {
    backgroundColor: lgreen,
    borderRadius: 10,
    width: 50,
    height: 50,
    top: 10,
    justifyContent: 'center',
  },
  reviewText: {
    fontFamily: bold,
    color: 'white',
    margin: 5,
    textAlign: 'center',
  },
});

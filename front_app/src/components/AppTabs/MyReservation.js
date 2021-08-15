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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import axios from 'axios';
import {lgreen} from '../../assets/color';
import {bold} from '../../assets/font';

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

const testData = {
  '8/16': {
    time: '15:00',
    location: '농가 마을',
    phone: '010-0000-0000',
  },
  '8/17': {
    time: '15:10',
    location: '갯벌 바다',
    phone: '010-0000-0000',
  },
  '8/18': {
    time: '15:00',
    location: '갯벌 바다',
    phone: '010-0000-0000',
  },
  '8/19': {
    time: '15:00',
    location: '갯벌 바다',
    phone: '010-0000-0000',
  },
};

function MyReservation(props) {
  const [reservList, setReservList] = useState(null);
  useEffect(() => {
    /*
      axios.get(`http://${url}/myreservation`)
            .then(res => {
                if(res.)
                setRservList(res.data);
            })
            .catch(err => {
                console.log('get error');
            });
      
    */
  }, []);
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

            markedDates={{
              '2021-08-15': {selected: true, selectedColor: '#94AF23'},
              '2021-08-16': {marked: true, dotColor: '#3D550C'},
              '2021-08-17': {marked: true, dotColor: '#3D550C'},
              '2021-08-18': {marked: true, dotColor: '#3D550C'},
            }}
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
        {Object.entries(testData).map(([key, value]) => {
          return (
            <View style={styles.section} key={key}>
              <View style={styles.row}>
                <Text style={styles.date}>{key}</Text>

                <Text style={styles.res_info}>
                  예약 시간 {'\n'}
                  운영 장소 {'\n'}
                  연락처 {'\n'}
                </Text>

                <Text style={styles.res_info}>
                  {value.time} {'\n'}
                  {value.location} {'\n'}
                  {value.phone}
                  {'\n'}
                </Text>
                <TouchableOpacity style={styles.reviewButton}>
                  <Text style={styles.reviewText}>후기작성</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
    marginLeft: 5,
    height: 25,
    top: 60,
  },
  reviewText: {
    fontFamily: bold,
    color: 'white',
    margin: 5,
  },
});

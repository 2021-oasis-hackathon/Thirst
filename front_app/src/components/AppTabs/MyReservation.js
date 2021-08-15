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
import {LocaleConfig} from 'react-native-calendars';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일', '월','화','수','목','금','토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

const {width, height} = Dimensions.get('window');


function MyReservation(props) {
  return (
    
    <View style={styles.container}>
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
      <View style={styles.row}>
      <Image source={require('../../assets/bori.png')} style={style.icon} />
        <Text style={styles.titleText}>
        내 예약 현황
        </Text>
      </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.date}>
              8/16
            </Text>

            <Text style={styles.res_info}>
            예약 시간 {"\n"}
            운영 장소 {"\n"}
            연락처 {"\n"}
            </Text>

            <Text style={styles.res_info}>
            15:00 {"\n"}
            농가 마을 {"\n"}
            010-0000-0000 {"\n"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.date}>
              8/17
            </Text>

            <Text style={styles.res_info}>
            예약 시간 {"\n"}
            운영 장소 {"\n"}
            연락처 {"\n"}
            </Text>

            <Text style={styles.res_info}>
            11:00 {"\n"}
            갯벌 바다 {"\n"}
            010-0000-0000 {"\n"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.date}>
              8/18
            </Text>

            <Text style={styles.res_info}>
            예약 시간 {"\n"}
            운영 장소 {"\n"}
            연락처 {"\n"}
            </Text>

            <Text style={styles.res_info}>
            11:00 {"\n"}
            갯벌 바다 {"\n"}
            010-0000-0000 {"\n"}
            </Text>
          </View>
        </View>

      
  </View>
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
    fontWeight: "500",
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
    //flex: 1,
    width: width - 80,
    flexDirection: 'row',
  },
});

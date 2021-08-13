import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {Agenda, Calendar, LocaleConfig} from 'react-native-calendars';
import {lgreen} from '../../assets/color';
import {bold, plane} from '../../assets/font';
const {width, height} = Dimensions.get('window');

LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
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
};

LocaleConfig.defaultLocale = 'kr';

const getMonthData = () => {
  let loadingData = true;
  let dataToReturn = {
    '2021-08-14': [
      [
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
      ],
    ],
    '2021-08-15': [
      [
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
          time: '17:00',
          remain: 0,
          total: 7,
        },
        {
          time: '19:00',
          remain: 0,
          total: 7,
        },
      ],
    ],
    '2021-08-16': [],
    '2021-08-17': [],
    '2021-08-18': [
      [
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
          time: '17:00',
          remain: 0,
          total: 7,
        },
      ],
    ],
    '2021-08-19': [],
    '2021-08-20': [
      [
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
          time: '17:00',
          remain: 0,
          total: 7,
        },
      ],
    ],
    '2021-08-21': [
      [
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
          time: '17:00',
          remain: 0,
          total: 7,
        },
      ],
    ],
    '2021-08-22': [
      [
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
          time: '17:00',
          remain: 0,
          total: 7,
        },
      ],
    ],
  };
  return [dataToReturn, false];
};

function Scheduler({navigation, info}) {
  const [monthData, loadingData] = getMonthData();

  const renderItem = (item, day) => {
    if (item)
      return item.map((i, index) => {
        console.log(i);
        return (
          <TouchableOpacity
            style={styles.item}
            key={`${day}-${index}`}
            onPress={() => {
              navigation.navigate('Reservation', {
                name: 'test',
                time: i.time,
                date: day,
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

  if (loadingData || !monthData)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  else
    return (
      <View style={styles.container}>
        <Agenda
          items={monthData}
          renderItem={(item, firstItemInDay) => {}}
          renderDay={(day, item) => {
            if (day !== undefined)
              return (
                <View style={[styles.day, styles.row]}>
                  <View style={styles.dateView}>
                    <Text style={styles.date}>
                      {day.month}/{day.day}
                    </Text>
                  </View>
                  <View style={[styles.items, styles.row]}>
                    {renderItem(item, `${day.month}/${day.day}`)}
                  </View>
                </View>
              );
          }}
          // Callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={month => {
            console.log('trigger items loading');
          }}
          // Callback that fires when the calendar is opened or closed
          onCalendarToggled={calendarOpened => {
            console.log(calendarOpened);
            return <View></View>;
          }}
          // Callback that gets called on day press
          onDayPress={day => {
            console.log('day pressed');
            return (
              <View>
                <Text>Pressed</Text>
              </View>
            );
          }}
          // Callback that gets called when day changes while scrolling agenda list
          onDayChange={day => {
            console.log('day changed');
            return <View></View>;
          }}
          // Initially selected day
          selected={new Date()}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={new Date()}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          // Max amount of months allowed to scroll to the past. Default = 50
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          pastScrollRange={1}
          // Specify how each item should be rendered in agenda

          // Specify how empty date content with no items should be rendered
          renderEmptyDate={() => {
            return <View />;
          }}
          // Specify how agenda knob should look like
          renderKnob={() => {
            return <View style={styles.Knob} />;
          }}
          // Specify what should be rendered instead of ActivityIndicator
          renderEmptyData={() => {
            return <View />;
          }}
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text;
          }}
          refreshing={false}
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          markedDates={{}}
          // Agenda theme
          theme={{
            arrowColor: 'white',
            backgroundColor: 'white',
            calendarBackground: '#94AF23',
            textSectionTitleColor: 'white',
            selectedDayBackgroundColor: 'white',
            selectedDayTextColor: '#94AF23',
            todayTextColor: '#00adf5',
            dayTextColor: 'white',
            textDisabledColor: 'rgba(0, 0, 0, 0.1)',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: 'black',
            textDayFontFamily: bold,
            textMonthFontFamily: bold,
            textDayHeaderFontFamily: bold,
            textMonthFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
            textDayFontFamily: bold,
            agendaDayTextColor: '#94AF23',
            agendaDayNumColor: '#94AF23',
            agendaTodayColor: 'green',
            agendaKnobColor: 'green',
            'stylesheet.agenda.list': {container: {paddingBottom: 10}},
          }}
          // Agenda container style
          style={{}}
        />
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
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
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
    marginBottom: 5,
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
    paddingVertical: 10,
    backgroundColor: 'white',
    marginVertical: 10,
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
  Knob: {
    width: 60,
    height: 5,
    backgroundColor: 'grey',
  },
});

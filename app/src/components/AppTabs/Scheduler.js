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
    '2021-08-13': [
      [
        {
          time: 1,
          remain: 4,
          total: 7,
        },
        {
          time: 2,
          remain: 7,
          total: 7,
        },
        {
          time: 3,
          remain: 0,
          total: 7,
        },
        {
          time: 5,
          remain: 0,
          total: 7,
        },
        {
          time: 7,
          remain: 0,
          total: 7,
        },
      ],
    ],
    '2021-08-14': [
      [
        {
          time: 1,
          remain: 4,
          total: 7,
        },
        {
          time: 2,
          remain: 7,
          total: 7,
        },
        {
          time: 3,
          remain: 0,
          total: 7,
        },
      ],
    ],
    '2021-08-15': [
      [
        {
          time: 1,
          remain: 4,
          total: 7,
        },
        {
          time: 2,
          remain: 7,
          total: 7,
        },
        {
          time: 3,
          remain: 0,
          total: 7,
        },
      ],
    ],
    '2021-08-18': [
      [
        {
          time: 1,
          remain: 4,
          total: 7,
        },
        {
          time: 2,
          remain: 7,
          total: 7,
        },
        {
          time: 3,
          remain: 0,
          total: 7,
        },
      ],
    ],
    '2021-08-23': [
      [
        {
          time: 1,
          remain: 4,
          total: 7,
        },
        {
          time: 2,
          remain: 7,
          total: 7,
        },
        {
          time: 3,
          remain: 0,
          total: 7,
        },
      ],
    ],
    '2021-08-24': [
      [
        {
          time: 1,
          remain: 4,
          total: 7,
        },
        {
          time: 2,
          remain: 7,
          total: 7,
        },
        {
          time: 3,
          remain: 0,
          total: 7,
        },
      ],
    ],
    '2021-08-25': [
      [
        {
          time: 1,
          remain: 4,
          total: 7,
        },
        {
          time: 2,
          remain: 7,
          total: 7,
        },
        {
          time: 3,
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
          <Text style={styles.itemTime}>{i.time}시</Text>
          <Text style={styles.itemPerson}>
            {i.remain}/{i.total}
          </Text>
        </TouchableOpacity>
      );
    });
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
                  <Text style={styles.date}>
                    {day.month}/{day.day}
                  </Text>
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
          }}
          // Callback that gets called on day press
          onDayPress={day => {
            console.log('day pressed');
          }}
          // Callback that gets called when day changes while scrolling agenda list
          onDayChange={day => {
            console.log('day changed');
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
            return (
              <View>
                <Text>OFF ! </Text>
              </View>
            );
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
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            },
            backgroundColor: '#E9E9E9',
            calendarBackground: 'white',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: 'black',
            textDisabledColor: '#d9e1e8',
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
            agendaDayTextColor: 'black',
            agendaDayNumColor: 'green',
            agendaTodayColor: 'green',
            agendaKnobColor: 'green',
            selectedDayBackgroundColor: 'green',
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
  },
  item: {
    width: width / 5,
    backgroundColor: '#94af23',
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
    height: 'auto',
    borderRadius: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemTime: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  itemPerson: {
    color: 'white',
    textAlign: 'center',
  },
  agenda: {
    marginTop: 10,
    backgroundColor: 'red',
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.01)',
    marginTop: 10,
  },
  date: {
    margin: 15,
    fontSize: 20,
    fontFamily: bold,
  },
  Knob: {
    width: 60,
    height: 5,
    backgroundColor: 'grey',
  },
});

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {bold, plane} from '../../assets/font';

const {width, height} = Dimensions.get('window');

const data = [
  {
    title: '아름다운 벼농장',
    writer: '발견했어요',
    uri: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDEwMDlfMTUw%2FMDAxNjAyMjIyOTA0MzMz.fGo98gTnOHnNMzTHPIOhqMx4oMdb5y0bVvcTaZ0rZ9og.G8QEJdkHbNhVGeSMgJZeAnhknSwUyPlUEaQrE1ZtHTEg.JPEG.eemeelee%2F1602222904458.jpg&type=sc960_832',
    comments: '아름다운 벼농장을 발견했어요\n 확인해주세요!',
    date: '2021-08-13',
  },
  {
    title: '아름다운 벼농장',
    writer: '발견했어요',
    uri: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDEwMDlfMTUw%2FMDAxNjAyMjIyOTA0MzMz.fGo98gTnOHnNMzTHPIOhqMx4oMdb5y0bVvcTaZ0rZ9og.G8QEJdkHbNhVGeSMgJZeAnhknSwUyPlUEaQrE1ZtHTEg.JPEG.eemeelee%2F1602222904458.jpg&type=sc960_832',
    comments: '아름다운 벼농장을 발견했어요\n 확인해주세요!',
    date: '2021-08-13',
  },
];

function Today(props) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.reviews}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.review}>
              <View style={[styles.header, styles.row]}>
                <View style={styles.row}>
                  <Image
                    source={require('../../assets/bori.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.title}> {item.title}</Text>
                </View>
                <Text style={styles.date}>{item.date}</Text>
              </View>

              <Image
                source={{
                  uri: item.uri,
                }}
                style={styles.image}
              />
              <View style={[styles.contents, styles.column]}>
                <Text style={styles.comments}> {item.comments}</Text>
                <Text style={styles.writer}> 작성자 {item.writer}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Today;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    width: width - 90,
    paddingTop: 15,
    paddingBottom: 5,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ABA730',
    justifyContent: 'space-between',
  },
  wrap: {
    display: 'flex',
    width: width - 90,
    height: 100,
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 10,
  },
  review: {
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    width: width - 50,
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    width: 30,
    height: 29,
  },
  today: {
    color: '#6D6D6D',
    fontSize: 18,
    marginLeft: 10,
  },
  title: {
    color: '#94AF23',
    fontSize: 20,
    fontFamily: bold,
    paddingBottom: 5,
  },
  date: {
    color: '#7F7F7F',
  },
  image: {
    width: 290,
    height: 230,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  comments: {
    fontSize: 14,
  },
  contents: {
    width: width - 90,
    borderTopWidth: 1,
    borderTopColor: '#ABA730',
    paddingTop: 10,
    marginTop: 10,
  },
  writer: {
    color: '#7F7F7F',
    paddingBottom: 8,
    fontSize: 11,
    textAlign: 'right',
    marginRight: 10,
  },
});

import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {plane} from '../../assets/font';

const {width, height} = Dimensions.get('window');

const data = [
  {
    title: '아름다운 벼농장',
    writer: '발견했어요',
    uri: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDEwMDlfMTUw%2FMDAxNjAyMjIyOTA0MzMz.fGo98gTnOHnNMzTHPIOhqMx4oMdb5y0bVvcTaZ0rZ9og.G8QEJdkHbNhVGeSMgJZeAnhknSwUyPlUEaQrE1ZtHTEg.JPEG.eemeelee%2F1602222904458.jpg&type=sc960_832',
    comments: '아름다운 벼농장을 발견했어요\n 확인해주세요!',
  },
  {
    title: '아름다운 벼농장',
    writer: '발견했어요',
    uri: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDEwMDlfMTUw%2FMDAxNjAyMjIyOTA0MzMz.fGo98gTnOHnNMzTHPIOhqMx4oMdb5y0bVvcTaZ0rZ9og.G8QEJdkHbNhVGeSMgJZeAnhknSwUyPlUEaQrE1ZtHTEg.JPEG.eemeelee%2F1602222904458.jpg&type=sc960_832',
    comments: '아름다운 벼농장을 발견했어요\n 확인해주세요!',
  },
];

function TodaysReview({navigation}) {
  useEffect(() => {}, []);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Today');
      }}>
      <View style={styles.container}>
        <View style={[styles.row, styles.header]}>
          <Image
            source={require('../../assets/bori.png')}
            style={styles.icon}
          />
          <Text style={styles.today}>오늘의 발견</Text>
        </View>
        <ScrollView
          style={styles.reviews}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {data.map((item, index) => {
            return (
              <View key={index} style={[styles.row, styles.contents]}>
                <Image
                  source={{
                    uri: item.uri,
                  }}
                  style={styles.image}
                />
                <View style={styles.wrap}>
                  <Text style={styles.title}> {item.title}</Text>
                  <Text style={styles.writer}> 작성자 {item.writer}</Text>
                  <Text style={styles.comments}> {item.comments}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
}

export default TodaysReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderColor: '#E1E1E1',
    borderWidth: 2,
    height: 500,
    width: width - 50,
    alignItems: 'center',
  },
  header: {
    padding: 15,
    width: width - 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  wrap: {
    display: 'flex',
    width: width - 50,
    height: 100,
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 10,
  },
  contents: {
    marginTop: 15,
    borderBottomColor: '#ABA730',
    borderBottomWidth: 1,
    width: width - 90,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
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
    color: 'black',
    fontSize: 14,
    fontFamily: plane,
    paddingBottom: 5,
  },
  image: {
    width: 120,
    height: 100,

    borderRadius: 10,
  },
  comments: {
    fontSize: 11,
  },
  writer: {
    color: '#7F7F7F',
    paddingBottom: 8,
    fontSize: 11,
  },
});

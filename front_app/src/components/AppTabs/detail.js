import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';

import {lgreen, lighter, ogreen} from '../../assets/color';
import {bold} from '../../assets/font';
import Review from '../subTabs/Review';

import style from '../../assets/style';

const {width, height} = Dimensions.get('window');

const test = [0, 0, 0, 0, 0, 0];

function Detail({navigation, route}) {
  useEffect(() => {
    console.log(navigation);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.ScrollView}>
        <View style={[styles.row, styles.header]}>
          <Image
            source={require('../../assets/bori.png')}
            style={[style.icon, {marginLeft: 15}]}
          />
          <Text style={styles.title}> 농가 체험장 </Text>
        </View>
        <View style={styles.tour}>
          <View style={[styles.column, {marginBottom: 5}]}>
            <View style={[styles.row, {alignItems: 'center'}]}>
              <TouchableOpacity style={styles.photoChanger}>
                <Text style={styles.photoText}> {'<'} </Text>
              </TouchableOpacity>
              <Image
                style={styles.img}
                source={{uri: 'https://picsum.photos/700'}}
              />
              <TouchableOpacity style={styles.photoChanger}>
                <Text style={styles.photoText}> {'>'} </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.row, styles.descs]}>
              <View style={styles.column}>
                <Text style={styles.desc}> 운영 기간 </Text>
                <Text style={styles.desc}> 운영 장소</Text>
                <Text style={styles.desc}> 연락처 </Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.desc}> {route.params.info.period} </Text>
                <Text style={styles.desc}> {route.params.info.location} </Text>
                <Text style={styles.desc}> 010-0000-0000</Text>
              </View>
            </View>
          </View>
          <View style={styles.descContainer}>
            <Text style={styles.description}>
              맑고 푸른 하늘과 빗나는 햇살이 가득한 농가 체험장 농가 마을
              입니다. 농가를 자랑할만한 다른 멋진 설명을 추가해주세요. 저희 농가
              마을에 오셔서 다양한 체험을 즐겨보세요.
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>쿠폰 발급받기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Scheduler');
            }}>
            <Text style={styles.buttonText}>예약하기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.review}>
          {test.map((i, num) => (
            <Review
              name="허수아비"
              comments="재밌어요! 다음에도 친구들이랑 체험하러 가보고 싶어요"
              date="2020-00-00"
              satisfaction={5}
              key={num}
              img="https://picsum.photos/700"
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    width: width,
    marginBottom: 5,
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  tour: {
    width: width - 20,
    borderRadius: 2,
    display: 'flex',
    borderRadius: 10,
    borderColor: '#E9E9E9',
    borderWidth: 1,
    padding: 20,
    marginTop: 5,
    marginBottom: 10,
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
  title: {
    fontFamily: bold,
    fontSize: 25,
    marginVertical: 5,
    color: lgreen,
  },

  img: {
    width: width / 1.5,
    height: height / 4,
    borderRadius: 10,
  },
  photoText: {
    color: lgreen,
    fontSize: 40,
    fontWeight: '900',
  },
  review: {
    width: width - 20,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  descs: {
    marginTop: 10,
    marginLeft: 40,
  },
  descContainer: {
    borderTopColor: '#E1E1E1',
    borderTopWidth: 1,
  },
  desc: {
    color: ogreen,
    fontFamily: bold,
    margin: 5,
  },
  description: {
    marginTop: 15,
    color: 'black',
  },
  button: {
    width: width - 20,
    marginVertical: 5,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: lgreen,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
    fontFamily: bold,
  },
  ScrollView: {
    alignItems: 'center',
    marginTop: 20,
    display: 'flex',
  },
});

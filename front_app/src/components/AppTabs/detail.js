import React, {useEffect, useState} from 'react';
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
import Loading from './Loading';
import axios from 'axios';
import {useSelector} from 'react-redux';
import url from '../../url';

const {width, height} = Dimensions.get('window');

const test = [0, 0, 0, 0, 0, 0];

function Detail({navigation, route}) {
  const info = route.params.info;
  const user = useSelector(state => state.user);
  const [reviews, setReviews] = useState([]);

  const getReviews = () => {
    //axios.get(`http://${url}/`
    //)
  };
  useEffect(() => {
    // console.log(route.params.info);
  }, []);
  if (reviews)
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
                <Image style={styles.img} source={{uri: info.tour_img}} />
                <TouchableOpacity style={styles.photoChanger}>
                  <Text style={styles.photoText}> {'>'} </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.row, styles.descs]}>
                <View style={styles.column}>
                  <Text style={styles.desc}> 운영 기간 </Text>
                  <Text style={styles.desc}> 운영 장소</Text>
                  <Text style={styles.desc}> 소요 시간 </Text>
                  <Text style={styles.desc}> 비용 </Text>
                  <Text style={styles.desc}> 연락처 </Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.desc}>
                    {info.start_time.split('T')[0]}~
                    {info.end_time.split('T')[0]}
                  </Text>

                  <Text style={styles.desc}>{info.tour_addr}</Text>
                  <Text style={styles.desc}>{info.tour_time_at_one} 시간</Text>
                  <Text style={styles.desc}>{info.tour_price}</Text>
                  <Text style={styles.desc}>{info.tour_phone_num}</Text>
                </View>
              </View>
            </View>
            <View style={styles.descContainer}>
              <Text style={styles.description}>{info.tour_desc}</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>쿠폰 발급받기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('Scheduler', {info});
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
  else return <Loading />;
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

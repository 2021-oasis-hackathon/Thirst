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
import {media, url} from '../../url';

const {width, height} = Dimensions.get('window');

const test = [0, 0, 0, 0, 0, 0];

function Detail({navigation, route}) {
  const [info, setInfo] = useState(null);
  const user = useSelector(state => state.user);
  const [reviews, setReviews] = useState([]);

  const getInfo = async () => {
    console.log(`${url}/Tour`);
    await axios
      .get(`${url}/Tour/${route.params.tour_name}`, {
        headers: {
          Authorization: `Bearer ${user.token.access}`,
        },
      })
      .then(res => {
        if (res.data) setInfo(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getReview = async () => {
    let body = new FormData();

    body.append('tour', route.params.tour_name);

    await axios
      .post(`${url}/Review/FindTourReview/`, body, {
        headers: {
          Authorization: `Bearer ${user.token.access}`,
        },
      })
      .then(res => {
        console.log(res.data);
        if (res.data) setReviews(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInfo();
    getReview();
  }, []);
  if (info)
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
              <Text style={styles.tour_name}>{info.tour_name}</Text>
              <View style={[styles.row, {alignItems: 'center'}]}>
                <TouchableOpacity style={styles.photoChanger}>
                  <Text style={styles.photoText}> {'<'} </Text>
                </TouchableOpacity>
                <Image
                  style={styles.img}
                  source={{uri: `${media}${info.tour_img}`}}
                />
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
            {reviews.map((i, num) => (
              <Review
                name={i.user}
                comments={i.comment}
                date={i.time.split('T')[0]}
                satisfaction={i.Satisfaction}
                key={num}
                img={i.review_img}
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
  tour_name: {
    textAlign: 'center',
    fontFamily: bold,
    color: ogreen,
    fontSize: 20,
    marginBottom: 5,
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
    marginLeft: 20,
    width: width - 150,
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

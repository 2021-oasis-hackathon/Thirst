import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {ogreen} from '../../assets/color';
import {bold, plane} from '../../assets/font';

import {media, url} from '../../url';
import Loading from './Loading';

const {width, height} = Dimensions.get('window');

function Today({navigation, route}) {
  const user = useSelector(state => state.user);
  const [list, setList] = useState(null);

  const getList = async () => {
    await axios
      .get(`${url}/Review/`, {
        headers: {
          Authorization: `Bearer ${user.token.access}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    getList();
  }, [route.params]);

  if (list)
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.reviews}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => {
            return (
              <View key={index} style={styles.review}>
                <View style={[styles.header, styles.row]}>
                  <View style={styles.spacebetween}>
                    <View style={styles.row}>
                      <Image
                        source={require('../../assets/bori.png')}
                        style={styles.icon}
                      />
                      <Text style={styles.title}> {item.review_title}</Text>
                    </View>
                    <Text style={styles.date}>{item.time.split('T')[0]}</Text>
                  </View>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                <View style={styles.column}>
                  <Image
                    source={{uri: `${item.review_img}`}}
                    style={styles.image}
                  />
                  <View style={styles.row}>
                    <View style={[styles.column, {marginLeft: 5}]}>
                      <Text style={styles.bold}>체험장</Text>
                      <Text style={[styles.bold, {marginTop: 5}]}>만족도</Text>
                    </View>
                    <View style={[styles.column, {marginLeft: 10}]}>
                      <Text style={styles.bold}>{item.tour}</Text>
                      <Text style={[styles.bold, {marginTop: 5}]}>
                        {item.Satisfaction}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.contents, styles.column]}>
                  <Text style={styles.comments}> {item.comment}</Text>
                  <Text style={styles.writer}> 작성자 {item.user}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  else return <Loading />;
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
  spacebetween: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width - 90,
  },
  wrap: {
    display: 'flex',
    width: width - 90,
    height: 100,
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 10,
  },
  bold: {
    color: ogreen,
    fontSize: 12,
    fontFamily: bold,
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
    textAlign: 'right',
  },
  image: {
    width: 300,
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
    marginRight: 5,
  },
});

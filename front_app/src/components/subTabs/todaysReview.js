import React, {useEffect, useState} from 'react';
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
import {url} from '../../url';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {isTemplateElement} from '@babel/types';
const {width, height} = Dimensions.get('window');

function TodaysReview({navigation}) {
  const [list, setList] = useState(null);
  const user = useSelector(state => state.user);

  useEffect(() => {
    axios
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
  }, []);

  if (list)
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Today', {redirect: true});
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
            {list.map((item, index) => {
              return (
                <View key={index} style={[styles.row, styles.contents]}>
                  <Image
                    source={{
                      uri: item.review_img,
                    }}
                    style={styles.image}
                  />
                  <View style={styles.wrap}>
                    <Text style={styles.title}> {item.review_title}</Text>
                    <Text style={styles.writer}> 작성자 {item.user}</Text>
                    <Text style={styles.comments}> {item.comment}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </TouchableOpacity>
    );
  else return <></>;
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

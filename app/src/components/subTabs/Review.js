import React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';

import {plane} from '../../assets/font';

const {width, height} = Dimensions.get('window');
function Review({name, comments, date, img}) {
  return (
    <View style={styles.Review}>
      <View style={styles.between}>
        <Text style={styles.name}>작성자 {name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={[styles.row]}>
        {img && <Image style={styles.img} source={{uri: img}} />}
        <View style={styles.wrap}>
          <Text style={styles.comments}>{comments}</Text>
        </View>
      </View>
    </View>
  );
}

export default Review;

const styles = StyleSheet.create({
  Review: {
    flex: 1,
    borderBottomColor: '#ABA730',
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 2,
    padding: 12,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  wrap: {
    flexWrap: 'wrap',
    width: width / 1.8,

    alignItems: 'flex-start',
  },
  name: {
    fontSize: 14,
    fontFamily: plane,
    marginBottom: 5,
    color: '#7F7F7F',
  },
  img: {
    width: width / 3.5,
    height: height / 8,
    borderRadius: 10,
  },
  date: {
    fontSize: 14,
    color: '#7F7F7F',
  },
  comments: {
    fontFamily: plane,
    marginLeft: 15,
    marginTop: 10,
  },
  between: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

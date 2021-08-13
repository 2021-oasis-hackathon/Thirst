import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {DrawerActions} from '@react-navigation/native';
import {plane} from '../../assets/font';

function Review({name, comments, date, img}) {
  return (
    <View style={styles.Review}>
      <View style={styles.between}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.comments}>{comments}</Text>
    </View>
  );
}

export default Review;

const styles = StyleSheet.create({
  Review: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: plane,
    marginBottom: 5,
  },
  comments: {
    fontFamily: plane,
  },
  between: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

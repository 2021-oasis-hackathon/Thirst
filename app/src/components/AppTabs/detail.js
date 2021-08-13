import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';

import {Avatar, Card, Button, Title, Paragraph} from 'react-native-paper';
import {lgreen, lighter, ogreen} from '../../assets/color';
import {bold} from '../../assets/font';
import Review from '../subTabs/Review';
const {width, height} = Dimensions.get('window');

const test = [0, 0, 0, 0, 0, 0];

function Detail({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.ScrollView}>
        <View>
          <Card style={styles.tour}>
            <Text style={styles.title}>체험명</Text>
            <View style={styles.row}>
              <Image
                style={styles.img}
                source={{uri: 'https://picsum.photos/700'}}
              />
              <View style={styles.column}>
                <Text> Phone : 010-0000-0000 </Text>
                <Text> Location : ....</Text>
              </View>
            </View>
            <Card.Content>
              <Paragraph>Description Of Tour</Paragraph>
            </Card.Content>
          </Card>
        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.reser}>쿠폰 발급받기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Reservation');
            }}>
            <Text style={styles.reser}>예약하기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.review}>
          {test.map((i, num) => (
            <Review
              name="허수아비"
              comments="재밌어요!"
              date="2020-00-00"
              key={num}
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
  },
  tour: {
    width: width - 20,
    borderRadius: 2,
    display: 'flex',
    paddingLeft: 10,
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
  },
  img: {
    width: width / 2,
    height: height / 5,
  },
  review: {
    width: width - 20,
    backgroundColor: 'rgba(0, 70, 0, 0.1)',
    padding: 10,
    borderRadius: 10,
  },

  button: {
    width: width - 20,
    marginVertical: 10,
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: ogreen,
  },
  reser: {
    textAlign: 'center',
    fontSize: 22,
    color: 'white',
    fontFamily: bold,
  },
  ScrollView: {
    alignItems: 'center',
    marginTop: 20,
  },
});

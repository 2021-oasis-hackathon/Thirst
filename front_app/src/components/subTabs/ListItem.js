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
import {lgreen} from '../../assets/color';
import {plane} from '../../assets/font';
import style from '../../assets/style';

const {width, height} = Dimensions.get('window');

function ListItem({navigation, info}) {
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Detail', {info});
        }}>
        <View style={style.row}>
          <Image source={{uri: info.img}} style={styles.img} />
          <View style={[style.column, styles.info]}>
            <Text style={styles.name}>{info.name}</Text>
            <Text style={styles.writer}>운영자 {info.writer}</Text>
            <Text style={styles.period}>운영 기간: {info.period}</Text>
            <Text style={styles.location}>운영 장소: {info.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: lgreen,
    paddingVertical: width / 25,
  },
  img: {
    width: width / 3.5,
    height: height / 8,
    borderRadius: 10,
  },
  info: {
    top: 5,
    marginLeft: 20,
  },
  name: {fontSize: 14},
  writer: {
    fontSize: 12,
    marginVertical: 7,
  },
  location: {fontSize: 12},
  period: {
    fontSize: 12,
  },
});

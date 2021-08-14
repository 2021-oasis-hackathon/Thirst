import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {lgreen} from '../../assets/color';
import {bold} from '../../assets/font';

import style from '../../assets/style';
import ListItem from '../subTabs/ListItem';
// <TouchableOpacity
//         onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}></TouchableOpacity>

const {width, height} = Dimensions.get('window');

const data = [
  {
    name: '농가 체험장',
    writer: '김농',
    period: '8/12~10/31',
    img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MjdfMjg0%2FMDAxNjIyMTIyODE1ODc4.YGwZmhT_j6pOakRapFIcBuaGsS217VqEcpcMTh8XQb8g.PVEFJ9PZ6wHzMTdOg5gnF6ipEP2VwD6_Sp2dBxLoE1gg.JPEG.ddtadh%2FDSC_7675.jpg&type=sc960_832',
    location: '농가마을',
  },
  {
    name: '갯벌 체험',
    writer: '고구마 수확',
    img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MjdfMjg0%2FMDAxNjIyMTIyODE1ODc4.YGwZmhT_j6pOakRapFIcBuaGsS217VqEcpcMTh8XQb8g.PVEFJ9PZ6wHzMTdOg5gnF6ipEP2VwD6_Sp2dBxLoE1gg.JPEG.ddtadh%2FDSC_7675.jpg&type=sc960_832',
    period: '8/12~10/31',
    location: '갯벌 바다',
  },
];
function List({navigation, route}) {
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <View style={[style.row, style.header]}>
        <Image
          source={require('../../assets/bori.png')}
          style={[style.icon, {marginLeft: 15}]}
        />
        <Text style={style.title}> {route.params.loc} </Text>
      </View>
      <View></View>
      <ScrollView contentContainerStyle={styles.tour}>
        {data.map((i, index) => (
          <ListItem key={index} info={i} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
}

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tour: {
    width: width - 20,
    borderRadius: 2,

    borderRadius: 10,
    borderColor: '#E9E9E9',
    borderWidth: 1,
    padding: 20,
    paddingTop: 0,
    marginTop: 5,
    marginBottom: 10,
  },
});

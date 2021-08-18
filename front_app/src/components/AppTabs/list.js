import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {green, lgreen, lighter, ogreen, ygreen} from '../../assets/color';
import {bold, plane} from '../../assets/font';

import style from '../../assets/style';
import ListItem from '../subTabs/ListItem';
import Loading from './Loading';
// <TouchableOpacity
//         onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}></TouchableOpacity>

import axios from 'axios';

import {url} from '../../url';

import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const data = [
  {
    tour_id: 0,
    tour_name: '농가 체험장',
    owner: '김농',
    period: '2020~2021',
    tour_theme: '8/12~10/31',
    tour_img:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MjdfMjg0%2FMDAxNjIyMTIyODE1ODc4.YGwZmhT_j6pOakRapFIcBuaGsS217VqEcpcMTh8XQb8g.PVEFJ9PZ6wHzMTdOg5gnF6ipEP2VwD6_Sp2dBxLoE1gg.JPEG.ddtadh%2FDSC_7675.jpg&type=sc960_832',
    tour_addr: '농가마을',
    tour_phone_num: '010-222-2222',
    tour_price: 10000,
    tour_desc: '소개 문구',
    start_time: '2021-08-16T12:58:28.763Z',
    end_time: '2021-08-16T12:58:28.763Z',
    tour_time_at_one: 2,
    tour_person_limit: 0,
    tour_min_person_at_one: 0,
    tour_max_person_at_one: 0,
    tour_theme: '자연생태',
  },
];
function List({navigation, route}) {
  const user = useSelector(state => state.user);
  const location = route.params.loc;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [list, setList] = useState(null);
  const [items, setItems] = useState([
    {label: '농사 체험', value: '농사'},
    {label: '바다 체험', value: '바다'},
    {label: '생태 체험', value: '생태'},
    {label: '전통음식 체험', value: '전통음식'},
    {label: '전통문화 체험', value: '전통문화'},
    {label: '놀이 체험', value: '놀이'},
    {label: '기타 체험', value: '기타'},
  ]);
  const [cache, setCache] = useState({});
  // label : {.... 형식}

  const getList = () => {
    let body = new FormData();
    body.append('Area', location);
    axios
      .post(`${url}/Tour/search_Area/`, body, {
        headers: {
          Authorization: `Bearer ${user.token.access}`,
        },
      })
      .then(res => {
        //   console.log(res.data);
        if (res.data) setList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const searchTheme = async v => {
    let filtered = [];
    if (!value.length) {
      getList();
      return;
    }

    for (let i = 0; i < value.length; i++) {
      if (cache[value[i]]) {
        filtered = filtered.concat(cache[value[i]]);
        continue;
      }
      let body = new FormData();
      body.append('Area', location);
      body.append('theme', value[i]);

      await axios
        .post(`${url}/Tour/search_theme/`, body, {
          headers: {
            Authorization: `Bearer ${user.token.access}`,
          },
        })
        .then(res => {
          if (res.data) {
            filtered = filtered.concat(res.data);
            cache[value[i]] = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    setList(filtered);
  };

  useEffect(() => {
    getList();
  }, []);

  if (list)
    return (
      <View style={styles.container}>
        <View style={[style.row, style.header]}>
          <Image
            source={require('../../assets/bori.png')}
            style={[style.icon, {marginLeft: 15}]}
          />
          <Text style={style.title}> {location} </Text>
        </View>

        <DropDownPicker
          placeholder="체험 유형을 선택해주세요"
          placeholderStyle={{
            color: 'grey',
            fontFamily: bold,
          }}
          multiple={true}
          mode="BADGE"
          searchable={true}
          translation={{
            SEARCH_PLACEHOLDER: '원하는 체험 유형을 검색해보세요!',
          }}
          searchContainerStyle={{
            borderBottomColor: '#dfdfdf',
            backgroundColor: 'white',
          }}
          searchTextInputStyle={{
            fontFamily: plane,

            borderWidth: 0,
          }}
          searchPlaceholderTextColor="grey"
          customItemContainerStyle={{
            backgroundColor: 'red',
          }}
          listItemLabelStyle={{
            fontSize: 20,
            marginLeft: 20,
          }}
          selectedItemLabelStyle={{
            fontFamily: bold,
            color: 'white',
          }}
          selectedItemContainerStyle={{
            backgroundColor: lgreen,
          }}
          listItemContainer={{
            height: 40,
          }}
          listMode="MODAL"
          modalProps={{
            animationType: 'fade',
          }}
          open={open}
          showBadgeDot={true}
          badgeStyle={{
            padding: 5,
            backgroundColor: 'white',
            borderColor: '#E7E7E7',
            borderWidth: 1,
          }}
          badgeTextStyle={{
            fontFamily: bold,
            color: '#6D6D6D',
          }}
          badgeDotStyle={{
            borderRadius: 20,
          }}
          badgeColors={['white']}
          badgeDotColors={[green, ogreen, lgreen, ygreen, lighter]}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          onChangeValue={() => {
            searchTheme();
          }}
          setItems={setItems}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          style={styles.dropdown}
        />
        <ScrollView contentContainerStyle={styles.tour}>
          {list.map((i, index) => (
            <ListItem key={index} info={i} navigation={navigation} />
          ))}
        </ScrollView>
      </View>
    );
  else return <Loading />;
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
  dropdown: {
    backgroundColor: '#EFEFEF',
    fontFamily: bold,
    marginVertical: 10,
    width: width - 50,
    left: 50 / 2,
    borderWidth: 0,
  },
  dropDownContainerStyle: {
    width: width - 50,
    left: 50 / 2,
    flexWrap: 'wrap',
    display: 'flex',
  },
  chips: {
    alignItems: 'flex-start',
    width: width - 50,
  },
});

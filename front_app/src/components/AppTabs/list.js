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
// <TouchableOpacity
//         onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}></TouchableOpacity>

import {Chip} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '농어촌 체험', value: '농어촌'},
    {label: '자연생태 체험', value: '자연생태'},
    {label: '승마체험', value: '승마'},
    {label: '갯벌체험', value: '갯벌'},
    {label: '수확체험', value: '수확'},
  ]);

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
        open={open}
        showBadgeDot={true}
        badgeStyle={{
          padding: 5,
          backgroundColor: 'white',
          borderColor: '#E1E1E1',
          borderWidth: 1,
        }}
        badgeTextStyle={{
          fontFamily: bold,
          color: 'black',
        }}
        badgeDotStyle={{
          borderRadius: 20,
        }}
        badgeDotColors={[green, ogreen, lgreen, ygreen, lighter]}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        style={styles.dropdown}
      />
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

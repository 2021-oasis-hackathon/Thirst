import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {lgreen} from '../../assets/color';
import {bold} from '../../assets/font';
import style from '../../assets/style';

import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import getDate from '../../getDate';

const {width, height} = Dimensions.get('window');

const fiveHeart = [1, 2, 3, 4, 5];

function ReviewWriter({navigation, route}) {
  const user = useSelector(state => state.user);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const [uri, setUri] = useState(null);
  const [check, setCheck] = useState(false);

  const [heart, setHeart] = useState(0);

  const info = route.params.info;
  useEffect(() => {
    // console.log(route.params);
  }, []);

  const onSubmit = () => {
    let body = new FormData();
    body.append('user', user.username);
    body.append('tour', info.tour_id);
    body.append('comment', comment);
    body.append('review_title', title);
    body.append('Satisfaction', heart);

    if (uri) body.append('review_img', uri);
    body.append('time', getDate());

    axios
      .post(`${url}/api/Review`, body, {
        headers: {
          Authorization: user.token.access,
        },
      })
      .then(res => {
        Alert.alert('후기 등록 완료!');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
    };

    const photos = launchImageLibrary(options, res => {
      console.log(res);
      if (!res.didCancel) {
        setUri(res.assets[0].uri);

        // setPhoto({width:res.width, height:res.height});
      }
    });
  };
  console.log(uri);
  return (
    <View style={styles.container}>
      <View style={[style.row, style.header]}>
        <Image
          source={require('../../assets/bori.png')}
          style={[style.icon, {marginLeft: 15}]}
        />
        <Text style={style.title}> 후기를 남겨주세요! </Text>
      </View>

      <View style={styles.r_writer}>
        <TextInput
          style={styles.input}
          //underlineColorAndroid="transparent"
          placeholder="리뷰 제목"
          placeholderTextColor="#6D6D6D"
          //autoCapitalize="none"
          //maxLength={40}
          onChangeText={title => setTitle(title)}
          value={title}
        />

        <View style={styles.section}>
          <TextInput
            style={styles.reviewInput}
            multiline={true}
            textAlignVertical="top"
            placeholder="여기에 내용을 작성하세요."
            placeholderTextColor="#6D6D6D"
            onChangeText={comment => setComment(comment)}
            value={comment}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.camera}>
            <TouchableOpacity
              style={styles.plusContainer}
              onPress={() => {
                pickImage();
              }}>
              <Text style={styles.plusText}> +</Text>
            </TouchableOpacity>

            <Image style={styles.img} resizeMode="stretch" source={{uri}} />
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <Image
          source={require('../../assets/bori.png')}
          style={[style.icon, {marginVertical: 10}]}
        />
        <Text style={styles.titleText}>만족도</Text>
      </View>

      <View style={styles.r_writer}>
        <Text style={[style.title, {textAlign: 'center'}]}>
          <View style={style.row}>
            {fiveHeart.map(i => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setHeart(i);
                  }}>
                  <Image
                    style={styles.heart}
                    resizeMode="stretch"
                    source={
                      i <= heart
                        ? require('../../assets/heart1.png')
                        : require('../../assets/heart2.png')
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={onSubmit}>
          {' '}
          작성 완료
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          //  navigation.navigate('MyReservation');
        }}>
        <Text style={styles.buttonText}>취소</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ReviewWriter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    width: width - 20,
    marginVertical: 0,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: lgreen,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
    fontFamily: bold,
  },
  plusContainer: {
    borderWidth: 3,
    borderColor: '#C4C4C4',
    width: 80,
    height: 80,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  plusText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#C4C4C4',
    left: -3,
  },
  img: {
    width: 100,
    height: 100,
  },
  heart: {
    width: 35,
    height: 30,
    margin: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  r_writer: {
    borderRadius: 10,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    marginVertical: 10,
    width: width - 50,
  },
  input: {
    margin: 5,
    //height: 40,
    fontSize: 18,
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  reviewInput: {
    margin: 5,
    height: height / 5,
    fontSize: 14,
    //borderColor: "white",
    //borderWidth: 1,
    paddingHorizontal: 12,
  },
  titleText: {
    margin: 5,
    marginVertical: 10,
    fontSize: 20,
    color: '#6D6D6D',
    textAlign: 'left',
  },
  section: {
    borderColor: '#E1E1E1',
    borderTopWidth: 1,
    width: width - 50,
  },
  row: {
    width: width - 80,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#94AF23',
    paddingVertical: 10,
    marginVertical: 5,
    width: width - 50,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },

  camera: {
    margin: 10,
    height: 80,
    width: 80,
    alignItems: 'center',
    paddingVertical: 50,
    //
    flexDirection: 'row',
  },
});

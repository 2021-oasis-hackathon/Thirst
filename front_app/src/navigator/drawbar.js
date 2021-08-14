import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  Image,
} from 'react-native';
import BottomBar from './bottom';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../components/home';

import Detail from '../components/AppTabs/detail';
import {bold} from '../assets/font';
import Reservation from '../components/AppTabs/Reservation';
import Scheduler from '../components/AppTabs/Scheduler';
import Today from '../components/AppTabs/Today';
import {ogreen} from '../assets/color';
import Profile from '../components/AppTabs/Profile';
const Drawer = createDrawerNavigator();

export default function DrawerBar({navigation, props}) {
  useEffect(() => {}, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
          width: 240,
        },
        headerShown: 'none',
      }}>
      <Drawer.Screen
        name="Home"
        options={{
          headerTitle: () => (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{fontFamily: bold, fontSize: 20, color: 'green'}}>
                촌
              </Text>
              <Text style={{fontFamily: bold, fontSize: 20}}>스러운</Text>
            </View>
          ),
        }}
        component={Home}
      />
      <Drawer.Screen
        name="menu3"
        options={{
          headerTitle: () => (
            <Text style={{fontFamily: bold, fontSize: 20}}>체험 상세</Text>
          ),
        }}
        component={Detail}
      />
      <Drawer.Screen
        name="Reservation"
        options={{
          headerTitle: () => (
            <Text style={{fontFamily: bold, fontSize: 20}}>예약 신청</Text>
          ),
        }}
        component={Reservation}
      />
      <Drawer.Screen name="scheduler" component={Scheduler} />
      <Drawer.Screen
        name="Today"
        options={{
          headerTitle: () => (
            <Text style={{fontFamily: bold, fontSize: 20}}>오늘의 발견</Text>
          ),
        }}
        component={Today}
      />
    </Drawer.Navigator>
  );
}

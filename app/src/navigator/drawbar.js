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
import List from '../components/AppTabs/list';
import Scheduler from '../components/AppTabs/Scheduler';
import Today from '../components/AppTabs/Today';
const Drawer = createDrawerNavigator();

export default function DrawerBar({navigation, props}) {
  useEffect(() => {}, []);
  console.log(props);
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
            <Text style={{fontFamily: bold, fontSize: 20}}>촌스러운</Text>
          ),
        }}
        component={BottomBar}
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
      <Drawer.Screen name="list" component={List} />
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

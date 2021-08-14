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
import {lgreen, ogreen} from '../assets/color';
import Profile from '../components/AppTabs/Profile';
import List from '../components/AppTabs/list';
import Logo from '../components/subTabs/Logo';

const Drawer = createDrawerNavigator();

export default function DrawerBar({navigation, props}) {
  useEffect(() => {}, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: lgreen,
        drawerActiveTintColor: 'white',
        drawerStyle: {
          backgroundColor: 'white',

          width: 240,
        },
        headerShown: true,
      }}>
      <Drawer.Screen
        name="Home"
        options={{
          headerTitle: () => <Logo />,
        }}
        component={BottomBar}
      />
      <Drawer.Screen
        drawerHideStatusBarOnOpen="true"
        name="list"
        options={{
          drawerLabel: 'none',
          headerTitle: () => <Logo />,
        }}
        component={List}
      />
      <Drawer.Screen
        name="scheduler"
        options={{drawerLabel: 'none', headerTitle: () => <Logo />}}
        component={Scheduler}
      />
      <Drawer.Screen
        name="Today"
        options={{
          drawerLabel: '오늘의 발견',
          headerTitle: () => <Logo />,
        }}
        component={Today}
      />
    </Drawer.Navigator>
  );
}

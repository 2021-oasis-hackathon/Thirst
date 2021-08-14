import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AIcon from 'react-native-vector-icons/AntDesign';
import OIcon from 'react-native-vector-icons/Octicons';

import Home from '../components/home';
import Detail from '../components/AppTabs/detail';

import {ogreen, lgreen} from '../assets/color';
import Profile from '../components/AppTabs/Profile';

import Reservation from '../components/AppTabs/Scheduler';
import DrawerBar from './drawbar';
import MyReservation from '../components/AppTabs/MyReservation';
import {bold} from '../assets/font';
import {Text, View, Dimensions} from 'react-native';
import style from '../assets/style';

const Tab = createBottomTabNavigator();

const size = 26;

export default function BottomBar() {
  return (
    <Tab.Navigator
      initialRouteName="HomeMain"
      activeColor={ogreen}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        showIcon: true,
        tabBarActiveTintColor: ogreen,
        tabBarInactiveTintColor: '#d1cece',
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: 'white',
        },
      }}>
      <Tab.Screen
        name="MyReservation"
        component={MyReservation}
        options={{
          tabBarIcon: ({color}) => (
            <OIcon name="book" color={color} size={size} />
          ),
          headerShown: false,
          headerTitle: () => (
            <View style={style.navView}>
              <Text style={style.navText}>예약 현황</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="HomeMain"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <OIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <AIcon name="user" color={color} size={size} />
          ),
          headerShown: false,
          headerTitle: () => (
            <View style={style.navView}>
              <Text style={style.navText}>My Page</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

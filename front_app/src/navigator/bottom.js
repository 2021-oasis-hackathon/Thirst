import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AIcon from 'react-native-vector-icons/AntDesign';
import OIcon from 'react-native-vector-icons/Octicons';

import Home from '../components/home';
import Detail from '../components/AppTabs/detail';

import {ogreen, lgreen} from '../assets/color';
import Profile from '../components/AppTabs/Profile';

import Reservation from '../components/AppTabs/Scheduler';

const Tab = createBottomTabNavigator();

const size = 26;

export default function BottomBar() {
  return (
    <Tab.Navigator
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
        name="heart"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <OIcon name="book" color={color} size={size} />
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
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <AIcon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

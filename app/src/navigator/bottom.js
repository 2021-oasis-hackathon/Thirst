import React, {useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FIcon from 'react-native-vector-icons/Fontisto';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();
import {ogreen, lgreen} from '../assets/color';

export default function BottomBar() {
  return (
    <Tab.Navigator
      activeColor={ogreen}
      inactiveColor="white"
      barStyle={{backgroundColor: ogreen}}
      shifting={true}
      options={{}}></Tab.Navigator>
  );
}

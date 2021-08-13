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
        options={{headerTitle: '촌스러운'}}
        component={BottomBar}
      />
      <Drawer.Screen name="menu3" component={Detail} />
    </Drawer.Navigator>
  );
}

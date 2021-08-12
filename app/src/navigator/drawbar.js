import React, {useEffect} from 'react';
import BottomBar from './bottom';
import {createDrawerNavigator} from '@react-navigation/drawer';

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
      }}></Drawer.Navigator>
  );
}

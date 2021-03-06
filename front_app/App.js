import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {Provider, useDispatch, useSelector, shallowEqual} from 'react-redux';
import store from './src/redux/store';
// coomponents
import Home from './src/components/home';
import Login from './src/components/auth/Login';
import Register from './src/components/auth/Register';

import DrawerBar from './src/navigator/drawbar';
import Detail from './src/components/AppTabs/detail';
import Scheduler from './src/components/AppTabs/Scheduler';
import Reservation from './src/components/AppTabs/Reservation';
import BottomBar from './src/navigator/bottom';
import List from './src/components/AppTabs/list';
import ReviewWriter from './src/components/AppTabs/ReviewWriter';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const user = useSelector(state => state.user);

  useEffect(() => {}, []);

  if (user.token)
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerMode: 'none',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: 'tomato'},
          }}>
          <Stack.Screen name="Main" component={DrawerBar} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="Scheduler" component={Scheduler} />
          <Stack.Screen name="Reservation" component={Reservation} />
          <Stack.Screen
            name="list"
            options={{
              headerTitle: () => <Logo />,
            }}
            component={List}
          />
          <Stack.Screen name="ReviewWriter" component={ReviewWriter} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  else
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerMode: 'none',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: 'black'},
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

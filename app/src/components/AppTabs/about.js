import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {DrawerActions} from '@react-navigation/native';

function About(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Text>메뉴열기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

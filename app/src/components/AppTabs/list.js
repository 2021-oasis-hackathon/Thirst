import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {DrawerActions} from '@react-navigation/native';

function List({navigation, route}) {
  useEffect(() => {
    console.log(route.params);
    console.log(navigation);
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Text>{route.params.loc}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

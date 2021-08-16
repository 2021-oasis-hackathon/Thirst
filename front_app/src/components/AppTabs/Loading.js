import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

function Loading(props) {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

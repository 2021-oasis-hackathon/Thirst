import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {ogreen} from '../../assets/color';

function Loading({visible}) {
  return (
    <View style={styles.container}>
      <Spinner
        visible={true}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

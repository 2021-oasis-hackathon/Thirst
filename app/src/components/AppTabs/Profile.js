import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

function Profile(props) {
  return (
    <View style={styles.container}>
      <View>
        <Text>사용자정보?</Text>
      </View>
      <View>
        <Text>예약현황?</Text>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';

import Modal from 'react-native-modal';

function AlertModal({message, visible}) {
  const [isModalVisible, setModalVisible] = useState(visible);

  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      animationIn="slideInLeft"
      animationOut="slideOutRight">
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <View
          style={{
            width: '90%',
            backgroundColor: 'white',
            padding: 22,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}>
          <Text>{message}</Text>
          <Button
            onPress={() => {
              setModalVisible(false);
            }}
            title="Close"
          />
        </View>
      </View>
    </Modal>
  );
}

export default AlertModal;

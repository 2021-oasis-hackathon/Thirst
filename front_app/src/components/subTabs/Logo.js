import React from 'react';
import {Image} from 'react-native';
const Logo = ({style}) => {
  return (
    <Image
      source={require('../../assets/logo.png')}
      style={{width: 90, height: 38, ...style}}
      resizeMode="stretch"
    />
  );
};

export default Logo;

import React from 'react';
import { Image } from 'react-native';
import logo from '../assets/images/logo.png';

const LogoIcon = props => {
  return <Image source={logo} {...props} />;
};

export default LogoIcon;

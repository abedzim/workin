import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { textStyle, headerStyle, headerTitleStyle } from '../styles/styles';

const Header = props => {

  return (
    <View style={headerStyle}>
      <Text style={headerTitleStyle}> {props.title} </Text>
    </View>
  );
};

export default Header;

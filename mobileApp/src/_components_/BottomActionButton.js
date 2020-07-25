import React, { Component } from 'react';
import { Platform, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { DEVICE_WIDTH } from './HeaderDetail';
import colors from '../components/Global/colors';

const StyledLargeButton = styled.TouchableOpacity`
  width: ${DEVICE_WIDTH}
  height: 84;
  background-color: ${props => props.background};
  justify-content: center;
  position: absolute;
  bottom: 0;
`;

const StyledText = styled.Text`
  color: ${props => props.color || 'white'};
  align-self: center;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  font-size: 18px;
  text-align: center;
  letter-spacing: -0.0861539px;
`;

export default (BottomActionButton = props => (
  <StyledLargeButton
    onPress={props.onPress}
    background={props.active ? colors.primary : colors.lightNeutral}
    {...props}
  >
    <StyledText color={props.color}>{props.title}</StyledText>
  </StyledLargeButton>
));

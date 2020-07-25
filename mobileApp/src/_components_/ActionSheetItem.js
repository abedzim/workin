import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import colors from './Global/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;

const StyledRowItem = styled.TouchableOpacity`
  width: ${DEVICE_WIDTH};
  background-color: white;
  padding-top: 12;
  padding-bottom: 12;
  border-bottom-width: 2;
  border-color: ${colors.background};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 20;
  height: 73;
`;

const StyledText = styled.Text`
  color: ${colors.darkNeutral};
  padding-left: 10;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.0861539px;
`;

const StyledIcon = styled.Image``;

export default (actionSheetItem = ({ onPress, icon, title }) => (
  <StyledRowItem onPress={() => onPress()}>
    <StyledIcon source={icon} />
    <StyledText>{title}</StyledText>
  </StyledRowItem>
));

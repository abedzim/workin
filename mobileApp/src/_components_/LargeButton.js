import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const DEVICE_WIDTH = Dimensions.get('window').width;

const StyledLargeButton = styled.TouchableOpacity`
  width: ${DEVICE_WIDTH - 50};
  height: 53;
  background-color: ${props => props.background};
  justify-content: center;
  border-radius: 3;
  margin-top: 8;
  align-self: center;
`;

const StyledText = styled.Text`
  color: ${props => props.color || 'white'};
  align-self: center;
  font-style: normal;
  font-weight: bold;
  line-height: 19px;
  font-size: 16px;
  text-align: center;
  letter-spacing: -0.0984616px;
`;

export default (LargeButton = props => {
  const { onPress, background, title, color } = props;
  return (
    <StyledLargeButton onPress={onPress} background={background} {...props}>
      <StyledText color={color}>{title}</StyledText>
    </StyledLargeButton>
  );
});

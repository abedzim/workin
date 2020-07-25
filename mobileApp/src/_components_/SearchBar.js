import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

const StyledView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.backgroundColor};
  padding: 0 12px;
  color: black;
  padding-left: 8;
  border-radius: 8;
  width: ${props => props.width};
`;

const StyledInput = styled.TextInput`
  padding-left: 8;
  color: ${props => props.inputColor};
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: -0.0738462px;
  flex: 1;
`;

export default (SearchBar = ({
  width,
  backgroundColor,
  inputColor,
  value,
  placeholder,
  onChangeText,
  placeholderTextColor,
}) => (
  <StyledView width={width} backgroundColor={backgroundColor}>
    <StyledInput
      inputColor={inputColor}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor={placeholderTextColor}
    />
    <Ionicons name="ios-search" size={20} color={inputColor} />
  </StyledView>
));

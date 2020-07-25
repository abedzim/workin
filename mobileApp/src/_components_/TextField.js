import React from 'react';
import styled from 'styled-components/native';
import colors from './Global/colors';
import { DEVICE_WIDTH } from './Header';

const StyledInput = styled.TextInput`
  flex: 1;
  height: 53px;
  background-color: transparent;
  border-color: ${props => props.border};
  border-width: 1;
  color: ${colors.darkNeutral};
  padding-top: 10;
  padding-bottom: 6;
  padding-left: 8;
  margin-top: 8;
  border: 0;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.darkerBase};
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  font-size: 14px;
  letter-spacing: -0.0984616px;
  width: ${DEVICE_WIDTH - 50};
`;

const StyledError = styled.Text`
  width: 300;
  margin-bottom: 2;
  color: red;
  padding-left: 6;
  padding-top: 4;
  padding-bottom: 4;
  align-self: flex-start;
`;

export default (TextField = props => (
  <StyledInput
    placeholderTextColor={props.placeholderTextColor}
    value={props.value}
    placeholder={props.placeholder}
    onChangeText={props.onChangeText}
    password={props.isPasswordField}
    secureTextEntry={props.isPasswordField}
    onFocus={props.onFocus}
    returnKeyType={props.returnKeyType}
    onSubmitEditing={props.onSubmitEditing}
    border={props.hasError ? 'red' : 'gray'}
    editable={props.isEditable}
    style={props.inputStyle}
  />
));

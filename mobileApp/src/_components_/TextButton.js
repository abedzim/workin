import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  padding: 10px 0;
  display: flex;
`;

const Text = styled.Text`
  font-style: normal;
  font-weight: 600;
  line-height: 14px;
  font-size: 12px;
  letter-spacing: -0.0738462px;
  color: #d2fbf8;
  text-decoration: underline;
  text-decoration-color: #d2fbf8;
`;

const TextButton = ({
  children,
  buttonStyle,
  textColor,
  textStyle,
  onPress,
  ...props
}) => (
  <Button style={buttonStyle} {...props} onPress={onPress}>
    <Text textColor={textColor} style={textStyle}>
      {children}
    </Text>
  </Button>
);

export default TextButton;

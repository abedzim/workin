import React from 'react';
import styled from 'styled-components/native';
import colors from './Global/colors';

const StyledLabel = styled.Text`
  color: ${colors.black};
  font-style: normal;
  font-weight: bold;
  line-height: 16px;
  font-size: 16px;
  letter-spacing: -0.0738462px;
  align-self: flex-start;
  margin-top: 19;
  margin-bottom: 17;
`;

export default (Label = ({ text }) => <StyledLabel>{text}</StyledLabel>);

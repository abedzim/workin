import React from 'react';
import styled from 'styled-components/native';

const StyledIcon = styled.Image`
  width: ${props => props.size};
  height: ${props => props.size};
`;

export default (Icon = ({ source, size }) => (
  <StyledIcon source={source} size={size} />
));

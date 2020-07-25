import React from 'react';
import styled from 'styled-components/native';
import ImagePlaceholder from '../assets/images/ImagePlaceholder.png';
import GroupDefault from '../assets/images/GroupDefault.png';
import GrayAdd from '../assets/images/GrayAdd.png';

const StyledButton = styled.TouchableOpacity`
  width: 80;
  height: 80;
  border: 2px solid #e0e0e0;
  border-radius: 3px;
  margin: 10px;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.Image`
  width: ${props => props.width};
  height: ${props => props.height};
`;

const StyledAdd = styled.Image`
  position: absolute;
  z-index: 100;
  bottom: -8;
  right: -8;
  height: 24;
  width: 24;
`;

export default (ImagePicker = props => (
  <StyledButton onPress={props.onPress}>
    <StyledImage
      source={props.shouldShowGroupDefault ? GroupDefault : ImagePlaceholder}
      width={props.shouldShowGroupDefault ? 80 : 40}
      height={props.shouldShowGroupDefault ? 80 : 27}
    />
    <StyledAdd source={GrayAdd} />
  </StyledButton>
));

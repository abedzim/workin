import React from 'react';
import TextField from './TextField';
import colors from './Global/colors';
import styled from 'styled-components/native';
import EditIconPencil from '../assets/images/EditIconPencil.png';

const StyledView = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const StyledEditIcon = styled.Image`
  margin-right: 28;
`;

const transparentInputStyles = {
  borderBottomWidth: 0,
  fontStyle: 'normal',
  color: colors.darkNeutral,
  fontWeight: '600',
  marginTop: 0,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 5,
};

const TransparentInput = props => (
  <StyledView>
    <TextField
      isEditable={props.isEditable}
      inputStyle={transparentInputStyles}
      {...props}
    />
    <StyledEditIcon source={EditIconPencil} />
  </StyledView>
);

export default TransparentInput;

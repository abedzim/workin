import React from 'react';
import styled from 'styled-components/native';
import colors from './Global/colors';

const StyledTouchableAvatar = styled.TouchableOpacity``;

const StyledAvatar = styled.Image`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size / 2};
`;

const StyledEmptyProfile = styled.View`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size / 2};
  background-color: ${colors.mediumNeutral};
  justify-content: center;
  align-items: center;
`;

const StyledInitials = styled.Text`
  font-weight: 600;
  line-height: 20px;
  font-size: 16px;
  text-align: center;
  letter-spacing: -0.0984616px;
  text-transform: uppercase;
  color: ${colors.background};
  padding-top: 1;
`;

export default (Avatar = props => {
  // console.log('AVATAR PROPS ', props);
  const { source, firstName, lastName, onSelectUser, size } = props;
  let useInitials = false;
  if (
    source ===
    'https://church-groups.cratebind.com/avatars/original/missing.png'
  ) {
    useInitials = true;
  }
  if (
    source === 'https://church-groups.cratebind.com/logos/original/missing.png'
  ) {
    useInitials = true;
  }
  const firstInitial = firstName.substring(0, 1);
  const lastInitial = lastName.substring(0, 1);
  const avatar = useInitials ? (
    <StyledTouchableAvatar onPress={onSelectUser}>
      <StyledEmptyProfile size={size}>
        <StyledInitials>{`${firstInitial}${lastInitial}`}</StyledInitials>
      </StyledEmptyProfile>
    </StyledTouchableAvatar>
  ) : (
    <StyledTouchableAvatar onPress={onSelectUser}>
      <StyledAvatar source={source} size={size} />
    </StyledTouchableAvatar>
  );
  return avatar;
});

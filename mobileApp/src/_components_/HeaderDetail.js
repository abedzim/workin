import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import colors from './Global/colors';
import Avatar from './Avatar';

export const DEVICE_WIDTH = Dimensions.get('window').width;

const StyledHeader = styled.View`
  width: ${DEVICE_WIDTH};
  height: 120;
  background-color: ${colors.white};
  justify-content: center;
  padding-left: 10;
`;

const StyledBottomLine = styled.View`
  width: ${DEVICE_WIDTH};
  height: 2;
  background-color: ${colors.background};
`;

const StyledHeaderTitle = styled.Text`
  font-weight: bold;
  font-size: 22px;
  letter-spacing: -0.0861539px;
  color: ${colors.black};
  margin-top: 23;
`;

const StyledRowView = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const StyledButtonText = styled.Text`
  color: ${colors.darkNeutral};
  font-style: normal;
  font-weight: bold;
  line-height: 16px;
  font-size: 14px;
  letter-spacing: -0.0861539px;
  text-decoration: underline;
  text-decoration-color: ${colors.darkNeutral};
`;

export const StyledLeftButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10;
`;

const StyledRightButton = styled.TouchableOpacity`
  margin-right: 16;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StyledIcon = styled.Image``;

export default (HeaderDetail = props => {
  const {
    leftHeaderIcon,
    leftHeaderButtonAction,
    leftHeaderButtonTitle,
    rightHeaderIcon,
    rightHeaderButtonAction,
    rightHeaderButtonTitle,
    headerTitle,
    hasRightSingleAvatar,
    user,
    hasRightGroupAvatar,
    group,
  } = props;
  const hasLeftIcon = leftHeaderIcon !== undefined && leftHeaderIcon !== '';

  const hasRightIcon = rightHeaderIcon !== undefined && rightHeaderIcon !== '';

  return (
    <>
      <StyledHeader>
        <StyledLeftButton onPress={leftHeaderButtonAction}>
          {hasLeftIcon && <StyledIcon source={leftHeaderIcon} />}
          {leftHeaderButtonTitle !== '' && (
            <StyledButtonText>{leftHeaderButtonTitle}</StyledButtonText>
          )}
        </StyledLeftButton>
        <StyledRowView>
          <StyledHeaderTitle>{headerTitle}</StyledHeaderTitle>
          <StyledRightButton onPress={rightHeaderButtonAction}>
            {hasRightIcon && <StyledIcon source={rightHeaderIcon} />}
            {rightHeaderButtonTitle !== '' && (
              <StyledButtonText>{rightHeaderButtonTitle}</StyledButtonText>
            )}
            {hasRightSingleAvatar && (
              <Avatar
                source={user.avatar_url}
                size={32}
                onSelectUser={() =>
                  props.navigation.navigate('Profile', {
                    user,
                  })
                }
                firstName={user.first_name}
                lastName={user.last_name}
              />
            )}
            {hasRightGroupAvatar && (
              <Avatar
                source={ group.logo_url}
                size={46}
                onSelectUser={() =>
                  console.log('on select user from paging view')
                }
                firstName={group.name}
                lastName=""
              />
            )}
          </StyledRightButton>
        </StyledRowView>
      </StyledHeader>
      <StyledBottomLine />
    </>
  );
});

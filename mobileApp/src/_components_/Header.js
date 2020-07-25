import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import SearchBar from './SearchBar';
import colors from './Global/colors';

export const DEVICE_WIDTH = Dimensions.get('window').width;

export const StyledHeader = styled.View`
  width: ${DEVICE_WIDTH};
  height: 80;
  background-color: ${colors.primary};
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledHeaderTitle = styled.Text`
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  letter-spacing: -0.0861539px;
  color: ${colors.white};
`;

export const StyledButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: #fff;
`;

export const StyledLeftButton = styled.TouchableOpacity`
  margin-left: 11;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const StyledRightButton = styled.TouchableOpacity`
  margin-right: 16;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const StyledSearchBarView = styled.View`
  border-radius: 8;
  align-self: center;
  align-self: center;
  justify-content: center;
  height: 30;
  background-color: ${props => props.backgroundColor};
`;

export const StyledIcon = styled.Image``;

export default (Header = props => {
  const {
    leftHeaderIcon,
    leftHeaderButtonAction,
    leftHeaderButtonTitle,
    rightHeaderIcon,
    rightHeaderButtonAction,
    rightHeaderButtonTitle,
    hasBar,
    value,
    placeholder,
    onChangeText,
    headerTitle,
    width,
    backgroundColor,
    inputColor,
  } = props;
  const hasLeftIcon = leftHeaderIcon !== undefined && leftHeaderIcon !== '';

  const hasRightIcon = rightHeaderIcon !== undefined && rightHeaderIcon !== '';

  return (
    <StyledHeader>
      <StyledLeftButton onPress={leftHeaderButtonAction}>
        {hasLeftIcon && <StyledIcon source={leftHeaderIcon} />}
        {leftHeaderButtonTitle !== '' && (
          <StyledButtonText>{leftHeaderButtonTitle}</StyledButtonText>
        )}
      </StyledLeftButton>
      {hasBar ? (
        <StyledSearchBarView backgroundColor={backgroundColor}>
          <SearchBar
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            width={width}
            backgroundColor={backgroundColor}
            inputColor={inputColor}
          />
        </StyledSearchBarView>
      ) : (
        <StyledHeaderTitle>{headerTitle}</StyledHeaderTitle>
      )}
      <StyledRightButton onPress={rightHeaderButtonAction}>
        {hasRightIcon && <StyledIcon source={rightHeaderIcon} />}
        {rightHeaderButtonTitle !== '' && (
          <StyledButtonText>{rightHeaderButtonTitle}</StyledButtonText>
        )}
      </StyledRightButton>
    </StyledHeader>
  );
});

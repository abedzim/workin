import React from 'react';
import { Dimensions, Platform, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import Header from './Header';
import colors from './Global/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.primary};
`;

const StyledScrollView = styled.ScrollView`
  padding-bottom: 30;
`;

const StyledOverlay = styled.View`
  height: ${DEVICE_HEIGHT};
  width: ${DEVICE_WIDTH};
  background-color: 'rgba(29, 30, 33,0.5)';
  z-index: 1;
  position: absolute;
`;

/*
View for Screen with scrolling content
With sticky header outside scroll
If there are textfields on the screen, use LayoutKeyboardAvoidingView
*/

const LayoutScrollView = ({
  overlay,
  hasBar,
  width,
  backgroundColor,
  inputColor,
  value,
  placeholder,
  onChangeText,
  headerTitle,
  leftHeaderIcon,
  leftHeaderButtonAction,
  leftHeaderButtonTitle,
  rightHeaderButtonAction,
  rightHeaderButtonTitle,
  rightHeaderIcon,
  myRef,
  canRefresh,
  refreshing,
  onRefresh,
  children,
}) => (
  <StyledSafeAreaView>
    {overlay && <StyledOverlay />}
    <Header
      hasBar={hasBar}
      width={width}
      backgroundColor={backgroundColor}
      inputColor={inputColor}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      headerTitle={headerTitle}
      leftHeaderIcon={leftHeaderIcon}
      leftHeaderButtonTitle={leftHeaderButtonTitle}
      rightHeaderIcon={rightHeaderIcon}
      rightHeaderButtonTitle={rightHeaderButtonTitle}
      leftHeaderButtonAction={leftHeaderButtonAction}
      rightHeaderButtonAction={rightHeaderButtonAction}
    />
    <StyledScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingBottom: Platform.OS === 'android' ? 60 : 50,
      }}
      style={{
        backgroundColor: colors.background,
      }}
      shouldPersistTaps="always"
      keyboardShouldPersistTaps="always"
      ref={myRef}
      refreshControl={
        canRefresh && (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        )
      }
    >
      {children}
    </StyledScrollView>
  </StyledSafeAreaView>
);

export default LayoutScrollView;

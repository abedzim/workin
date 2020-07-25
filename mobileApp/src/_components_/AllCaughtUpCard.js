import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import colors from './Global/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;

const StyledMainView = styled.View`
  width: ${DEVICE_WIDTH - 20};
  margin-top: 20;
  margin-bottom: 20;
  align-items: center;
  justify-content: center;
`;

const StyledRowView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledLineView = styled.View`
  height: 2;
  background-color: ${colors.lightNeutral};
  flex: 1;
  margin-left: 10;
  margin-right: 10;
`;

const StyledText = styled.Text`
  font-weight: 600;
  line-height: 26px;
  font-size: 16px;
  text-align: center;
  letter-spacing: -0.0861539px;
  color: ${colors.mediumNeutral};
  margin-left: 10;
  margin-right: 10;
`;

export default (AllCaughtUpCard = ({ section, shouldShow }) => {
  if (section.title === 'allCaughtUp' && shouldShow) {
    return (
      <StyledMainView>
        <StyledRowView>
          <StyledLineView />
          <StyledText>You're all caught up!</StyledText>
          <StyledLineView />
        </StyledRowView>
      </StyledMainView>
    );
  }
  return null;
});

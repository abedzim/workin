import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import AutoGrowTextField from './AutoGrowTextField';
import colors from './Global/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;

const StyledRowView = styled.View`
  width: ${DEVICE_WIDTH - 48};
  flex-direction: row;
  align-items: flex-start;
  margin-top: 2;
  margin-bottom: 24;
`;

const StyledView = styled.View``;

export default (NewComment = ({
  onChangeText,
  value,
  myRef,
  onFocus,
  onSubmit,
}) => (
  <StyledView>
    <StyledRowView>
      <AutoGrowTextField
        placeholder="Leave a comment..."
        onChangeText={commentValue => onChangeText(commentValue)}
        value={value}
        myRef={myRef}
        viewWidth={DEVICE_WIDTH - 48}
        width={DEVICE_WIDTH - 80}
        onFocus={onFocus}
        onSubmit={onSubmit}
        textColor={colors.mediumNeutral}
        shouldHaveSendButton
      />
    </StyledRowView>
  </StyledView>
));

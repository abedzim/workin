import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatIcon from '../assets/images/ChatIcon.png';
import ChatIconHighlighted from '../assets/images/ChatIconHighlighted.png';
import Icon from './Icon';
import colors from './Global/colors';

const StyledRowView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledReactionImage = styled.TouchableOpacity``;

const StyledReactionTitle = styled.Text`
  color: ${colors.darkNeutral};
  text-align: right;
  font-weight: 600;
  line-height: 11px;
  font-size: 10px;
  letter-spacing: -0.0553846px;
  margin-left: 6;
  margin-right: 6;
`;

const StyledTouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

function determineString(count) {
  switch (count) {
    case 0:
      return 'Comment';
    case 1:
      return '1 comment';
    default:
      return `${count} comments`;
  }
}

export default (CommentReactionItem = ({
  toggleOpen,
  open,
  commentCount,
  onPressReaction,
  userCommented,
}) => (
  <StyledRowView>
    <StyledRowView>
      <StyledTouchableWithoutFeedback onPress={toggleOpen}>
        <Ionicons
          name={open ? 'ios-arrow-down' : 'ios-arrow-up'}
          size={15}
          color={colors.darkNeutral}
        />
      </StyledTouchableWithoutFeedback>
      <StyledReactionTitle>{determineString(commentCount)}</StyledReactionTitle>
    </StyledRowView>
    <StyledReactionImage onPress={onPressReaction}>
      <Icon source={userCommented ? ChatIconHighlighted : ChatIcon} size={24} />
    </StyledReactionImage>
  </StyledRowView>
));

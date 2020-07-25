import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LikeIcon from '../assets/images/LikeIcon.png';
import LikeIconHighlighted from '../assets/images/LikeIconHighlighted.png';
import Icon from './Icon';
import colors from './Global/colors';

const StyledRowView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledReactionImage = styled.TouchableOpacity``;

const StyledReactionTitle = styled.Text`
  color: ${props => props.color};
  text-align: right;
  font-weight: 600;
  line-height: 11px;
  font-size: 10px;
  letter-spacing: -0.0553846px;
  margin-left: 6;
  margin-right: 6;
`;

const StyledTouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

const StyledArrow = styled.View`
  width: 0;
  height: 0;
  border-top-color: ${props => props.color};
  border-top-width: ${props => props.top};
  border-right-color: transparent;
  border-bottom-width: ${props => props.bottom};
  border-right-color: transparent;
  border-right-width: 6;
  border-left-color: transparent;
  border-left-width: 6;
  border-radius: 5;
`;

function determineString(count) {
  switch (count) {
    case 0:
      return 'Like';
    case 1:
      return '1 like';
    default:
      return `${count} likes`;
  }
}

export default (LikeReactionItem = ({
  onPressReaction,
  userLiked,
  isComment,
  likeCount,
  toggleOpen,
  open,
}) => (
  <StyledRowView>
    <StyledReactionImage onPress={onPressReaction}>
      <Icon source={userLiked ? LikeIconHighlighted : LikeIcon} size={24} />
    </StyledReactionImage>
    <StyledRowView>
      <StyledReactionTitle
        color={isComment ? colors.mediumNeutral : colors.darkNeutral}
      >
        {determineString(likeCount)}
      </StyledReactionTitle>
      <StyledTouchableWithoutFeedback onPress={toggleOpen}>
        <Ionicons
          name={open ? 'ios-arrow-down' : 'ios-arrow-up'}
          size={15}
          color={colors.darkNeutral}
        />
      </StyledTouchableWithoutFeedback>
    </StyledRowView>
  </StyledRowView>
));

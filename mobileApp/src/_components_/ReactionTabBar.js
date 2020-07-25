import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import colors from './Global/colors';
import LikeReactionItem from './LikeReactionItem';
import CommentReactionItem from './CommentReactionItem';

const DEVICE_WIDTH = Dimensions.get('window').width;

const StyledReactionTab = styled.View`
  width: ${DEVICE_WIDTH - 20};
  align-self: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-width: 2;
  border-color: ${colors.background};
  background-color: ${colors.white};
`;

const StyledRowView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${DEVICE_WIDTH - 48};
  margin-top: 6;
  margin-bottom: 6;
`;

export default (ReactionTabBar = ({
  likeCount,
  onPressLike,
  likesOpen,
  toggleLeftReaction,
  userLiked,
  commentCount,
  onPressComment,
  commentsOpen,
  toggleRightReaction,
  userCommented,
}) => (
  <StyledReactionTab>
    <StyledRowView>
      <LikeReactionItem
        iconName="ios-thumbs-up"
        likeCount={likeCount}
        onPressReaction={onPressLike}
        open={likesOpen}
        toggleOpen={toggleLeftReaction}
        userLiked={userLiked}
      />
      <CommentReactionItem
        iconName="ios-chatbubbles"
        commentCount={commentCount}
        onPressReaction={onPressComment}
        open={commentsOpen}
        toggleOpen={toggleRightReaction}
        userCommented={userCommented}
      />
    </StyledRowView>
  </StyledReactionTab>
));

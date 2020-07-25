import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import moment from 'moment';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from './Avatar';
import colors from './Global/colors';
import LikeReactionItem from './LikeReactionItem';

const DEVICE_WIDTH = Dimensions.get('window').width;

const StyledMainView = styled.View`
  width: ${DEVICE_WIDTH - 20};
  background-color: ${colors.offWhite};
  margin-top: 2;
`;

const StyledRowView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 14;
  padding-bottom: 9;
`;

const StyledName = styled.Text`
  margin-left: 9;
  color: ${colors.darkNeutral};
  font-weight: bold;
  line-height: 14px;
  font-size: 12px;
  letter-spacing: -0.0738462px;
`;

const StyledTime = styled.Text`
  text-align: right;
  font-size: 11;
  margin-top: 9;
  margin-right: 14;
  color: ${colors.mediumNeutral};
  font-weight: 600;
  line-height: 11px;
  font-size: 9px;
  letter-spacing: -0.0553846px;
`;

const StyledContent = styled.Text`
  width: ${DEVICE_WIDTH - 48};
  color: ${colors.darkNeutral};
  font-weight: 600;
  line-height: 18px;
  font-size: 11px;
  letter-spacing: -0.0738462px;
  align-self: center;
`;

const StyledLikeRowView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-top: 8;
  padding-bottom: 8;
  padding-left: 14;
  background: ${colors.offWhite};
  width: ${DEVICE_WIDTH - 48};
`;

const StyledButton = styled.TouchableOpacity`
  right: 16;
  top: 24;
  position: absolute;
`;

class CommentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likesOpen: false,
      userLiked: false,
    };
  }

  componentDidMount() {
    this.determineIfUserLiked();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('Comment Card Updating ', this.props);
    if (
      prevProps.comment.reactions.length !== this.props.comment.reactions.length
    ) {
      this.determineIfUserLiked();
    }
  }

  determineIfUserLiked = () => {
    // filter through likes, compare with currentUser Id and set accordingly
    if (this.props.currentUserId) {
      // console.log('CURRENT USER ID ', this.props.currentUserId);
      const filtered = this.props.comment.reactions.filter(
        reaction => reaction.user.id === this.props.currentUserId,
      );
      this.setState({ userLiked: filtered.length > 0 });
    }
  };

  onPressLike = () => {
    if (this.state.userLiked) {
      this.setState({
        userLiked: false,
      });
      this.props.onPressUnlike(this.props.comment);
    } else {
      this.setState({
        userLiked: true,
      });
      this.props.onPressLike(this.props.comment);
    }
  };

  render() {
    // console.log('Comment Card ', this.props);
    const {
      content,
      created_at,
      post_id,
      reactions,
      user,
    } = this.props.comment;
    const timeAgo = moment(created_at).fromNow();
    return (
      <StyledMainView>
        <StyledTime>{timeAgo}</StyledTime>
        <StyledRowView>
          <Avatar
            size={32}
            firstName={user.first_name}
            lastName={user.last_name}
            source={ user.avatar_url }
            onSelectUser={() =>
              console.log('selected profile from comment card')
            }
          />
          <StyledName>{user.full_name}</StyledName>
        </StyledRowView>
        {user.id === this.props.currentUserId && (
          <StyledButton
            onPress={() =>
              this.props.showCommentOptionModal(this.props.comment)
            }
          >
            <Ionicons name="ios-more" size={24} color={colors.darkNeutral} />
          </StyledButton>
        )}
        <StyledContent>{content}</StyledContent>
        <StyledLikeRowView>
          <LikeReactionItem
            isComment
            iconName="ios-thumbs-up"
            likeCount={this.props.comment.reactions.length}
            onPressReaction={() => this.onPressLike()}
            open={this.props.likesOpen}
            toggleOpen={() => this.props.onPressViewLikes()}
            userLiked={this.state.userLiked}
          />
        </StyledLikeRowView>
      </StyledMainView>
    );
  }
}

export default CommentCard;

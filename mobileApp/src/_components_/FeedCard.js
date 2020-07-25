import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import moment from 'moment';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from './Avatar';
import ReactionTabBar from './ReactionTabBar';
import PagingView from './PagingView';
import FeedCardMainImage from './FeedCardMainImage';
import colors from './Global/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;

const StyledMainView = styled.View`
  width: ${DEVICE_WIDTH - 20};
  background-color: ${colors.white};
  margin-top: 10;
`;

const StyledTouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

const StyledTouchable = styled.TouchableOpacity``;

const StyledTouchableArea = styled.View`
  width: ${DEVICE_WIDTH - 20};
  background-color: transparent;
  position: absolute;
  bottom: 0;
  height: ${props => props.height - 60};
`;

const StyledNameRowView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 14;
  margin-bottom: 11;
`;

const StyledName = styled.Text`
  margin-left: 8;
  line-height: 14px;
  font-size: 12px;
  letter-spacing: -0.0738462px;
  color: ${colors.darkNeutral};
`;

const StyledTime = styled.Text`
  color: ${colors.mediumNeutral};
  font-weight: 600;
  line-height: 11px;
  font-size: 9px;
  text-align: right;
  letter-spacing: -0.0553846px;
`;

const StyledButton = styled.TouchableOpacity`
  right: 16;
  top: 24;
  position: absolute;
`;

const StyledTitle = styled.Text`
  margin-left: 14;
  margin-bottom: 6;
  margin-right: 10;
  line-height: 16px;
  font-size: 14px;
  letter-spacing: -0.0861539px;
  color: ${colors.black};
`;

const StyledView = styled.View``;

const StyledContent = styled.Text`
  margin-left: 14;
  margin-right: 14;
  margin-bottom: 13;
  font-weight: 600;
  line-height: 20px;
  font-size: 12px;
  letter-spacing: -0.0676923px;
  color: ${colors.darkNeutral};
`;

class FeedCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      actionSheetVisible: false,
      selectedIndex: 0,
      likesOpen: false,
      commentsOpen: false,
      userLiked: false,
      userCommented: false,
      height: 0,
    };
  }

  componentDidMount() {
    // console.log('Component did mount');
    this.determineIfUserLiked();
    this.determineIfUserCommented();
    // this.props.getSinglePost(this.props.post.id);

    // console.log('ID ', this.props.post.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.post.reactions !== this.props.post.reactions) {
      // console.log('Feed Card Updating ', this.props.post);
      this.determineIfUserLiked();
      this.determineIfUserCommented();
    }
  }

  calculateHeight = e => {
    const height = e.nativeEvent.layout.height;
    this.setState({ height: height });
  };

  openModal = values => {
    this.setState({ modalVisible: true, selectedIndex: values.index });
  };

  determineIfUserLiked = () => {
    // console.log('DETERMINE IF USER LIKED RUNNING...', this.props.post);
    // filter through likes, compare with currentUser Id and set accordingly
    if (this.props.currentUserId && this.props.post.reactions.length > 0) {
      // console.log('currentUserId condition met...');
      const filtered = this.props.post.reactions.filter(
        reaction => reaction.user.id === this.props.currentUserId,
      );
      // console.log('filtered variable', filtered);
      // console.log(filtered.length > 0);
      this.setState({ userLiked: filtered.length > 0 });
    } else {
      this.setState({ userLiked: false });
    }
  };

  determineIfUserCommented = () => {
    // filter through comments, compare with current user if and set accordingly
    if (this.props.currentUserId && this.props.post.comments.length > 0) {
      const filtered = this.props.post.comments.filter(
        comment => comment.user.id === this.props.currentUserId,
      );
      this.setState({ userCommented: filtered.length > 0 });
    }
  };

  onPressLike = () => {
    // this.props.onPressLike(this.props.post);
    if (this.state.userLiked) {
      this.setState({
        userLiked: false,
      });
      this.props.onPressUnlike(this.props.post);
    } else {
      this.setState({
        userLiked: true,
      });
      this.props.onPressLike(this.props.post);
    }
  };

  toggleRightReaction = () => {
    if (!this.props.isViewingDetails) {
      this.props.showDetails(this.props.post);
    } else {
      this.props.onPressViewComments();
      this.setState({ commentsOpen: !this.state.commentsOpen });
    }
  };

  toggleLeftReaction = () => {
    // this.setState({ likesOpen: !this.state.likesOpen });
    // Show Modal for likes
    this.props.onPressViewLikes();
  };

  moreAction = () => {
    this.props.showPostOptionModal(this.props.post);
  };

  render() {
    // console.log('FEED CARD PROPS ', this.props.post);
    const {
      updated_at,
      title,
      images,
      body,
      category_id,
      group,
    } = this.props.post;
    const {
      avatar_url,
      first_name,
      last_name,
      full_name,
      id,
    } = this.props.post.user;
    const timeAgo = moment(updated_at).fromNow();
    return (
      <StyledMainView>
        <StyledView
          onLayout={e => {
            this.calculateHeight(e);
          }}
        >
          <PagingView
            modalVisible={this.state.modalVisible}
            closeModal={() => this.setState({ modalVisible: false })}
            startPage={this.state.selectedIndex}
            post={this.props.post}
          />
          <StyledTouchableWithoutFeedback
            onPress={() => this.props.showDetails(this.props.post)}
          >
            <StyledTouchableArea height={this.state.height} />
          </StyledTouchableWithoutFeedback>
          <StyledTime>{`${timeAgo}`}</StyledTime>
          <StyledNameRowView>
            <Avatar
              size={32}
              firstName={first_name}
              lastName={last_name}
              source={ avatar_url }
              onSelectUser={() => this.props.onSelectUser(this.props.post.user)}
            />
            <StyledName>{`${full_name}`}</StyledName>
            <StyledTouchable
              onPress={() => this.props.viewGroupDetails(group)}
            />
          </StyledNameRowView>
          <StyledButton onPress={this.moreAction}>
            <Ionicons name="ios-more" size={24} color={colors.darkNeutral} />
          </StyledButton>
          <StyledView pointerEvents="none">
            <StyledTitle>{title}</StyledTitle>
          </StyledView>
          {this.props.shouldTruncate ? (
            <StyledView pointerEvents="none">
              <StyledContent numberOfLines={5}>{body}</StyledContent>
            </StyledView>
          ) : (
            <StyledContent>{body}</StyledContent>
          )}
          <FeedCardMainImage
            images={images}
            openModal={value => this.openModal(value)}
          />
        </StyledView>
        <ReactionTabBar
          shouldShowComments
          onPressLike={() => this.onPressLike()}
          onPressComment={() => this.props.onPressComment(this.props.post)}
          toggleLeftReaction={() => this.toggleLeftReaction()}
          toggleRightReaction={() => this.toggleRightReaction()}
          likesOpen={this.state.likesOpen}
          commentsOpen={this.state.commentsOpen}
          commentCount={this.props.post.comments.length}
          likeCount={this.props.post.reactions.length}
          userLiked={this.state.userLiked}
          userCommented={this.state.userCommented}
        />
      </StyledMainView>
    );
  }
}

export default FeedCard;

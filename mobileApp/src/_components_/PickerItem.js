import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SInfo from 'react-native-sensitive-info';
import styled from 'styled-components/native';
import colors from './Global/colors';

const StyledOptionText = styled.Text`
  font-size: 18px;
  font-weight: 600;

  ${props =>
    props.active &&
    `
    color: ${colors.highlightSoftRed};
  `}
`;

const StyledOption = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  padding-left: 20px;
  height: 60;
  border-left-width: 4px;
  border-color: transparent;

  ${props =>
    props.active &&
    `
    border-left-width: 4px;
    border-color: ${colors.highlightSoftRed};
  `}
`;

const StyledIndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledIndicator = styled.View`
  width: 10;
  height: 10;
  border-radius: 5;
  background-color: ${colors.mediumAccent};
  margin-right: 5;
`;

class PickerItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unread: false,
    };
  }

  componentDidMount() {
    this.determineUnread(this.props.item);
  }

  determineItemTitle = (item, type) => {
    if (type === 'likes') {
      return item.user.full_name;
    } else if (type === 'messageRecipient') {
      return item.full_name;
    } else {
      return item.name;
    }
  };

  determineUnread = item => {
    // console.log('ITEM ID ', item.id);
    SInfo.getItem(`${item.id}`, {})
      .then(date => {
        // console.log('DATE ', date, item.name);
        if (date) {
          const unreadPosts = item.posts.filter(
            post => new Date(post.created_at) >= new Date(date),
          );
          this.setState({ unread: unreadPosts.length > 0 });
        }
      })
      .catch(err => console.log('Error getting date ', err));
  };

  render() {
    const { item, activeId, selectedId, selectOption, type } = this.props;
    return (
      <StyledOption
        onPress={() => {
          selectOption(item);
        }}
        active={(activeId && activeId === item.id) || selectedId === item.id}
      >
        <StyledIndicatorWrapper>
          {this.state.unread && <StyledIndicator />}
          <StyledOptionText
            active={
              (activeId && activeId === item.id) || selectedId === item.id
            }
          >
            {this.determineItemTitle(item, type)}
          </StyledOptionText>
        </StyledIndicatorWrapper>
      </StyledOption>
    );
  }
}
export default PickerItem;

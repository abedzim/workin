import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Animated, Dimensions, FlatList } from 'react-native';
import styled from 'styled-components/native';
import colors from './Global/colors';
import PickerItem from './PickerItem';
import BackArrowBlack from '../assets/images/BackArrowBlack.png';
import PeopleGreen from '../assets/images/PeopleGreen.png';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const StyledModalContainer = styled.View`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.background};
  z-index: 5000;
`;

const StyledHeaderView = styled.View`
  height: 150;
  width: ${DEVICE_WIDTH};
  background-color: ${colors.white};
  justify-content: center;
  padding-left: 10px;
  padding-top: 38;
  padding-bottom: 21;
`;

const StyledHeading = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  letter-spacing: -0.0861539px;
  margin-left: 10;
  color: ${colors.black};
`;

const StyledCloseButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledOptionSection = styled.View``;

const HeadingRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-left: 10;
`;

const StyledGroupImage = styled.Image``;

const StyledBackImage = styled.Image`
  margin-bottom: 14;
  margin-top: 38;
  margin-left: 10;
`;

const StyledBrowseMoreButton = styled.TouchableOpacity`
  margin-top: 10;
`;

const StyledBrowseMoreText = styled.Text`
  font-weight: bold;
  line-height: 16px;
  font-size: 14px;
  letter-spacing: -0.0861539px;
  text-decoration-line: underline;
  color: ${colors.darkNeutral};
  padding-left: 20px;
  height: 60;
`;

class PickerModal extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      translateX: new Animated.Value(-DEVICE_WIDTH),
      selectedId: 0,
    };
  }

  componentDidUpdate(prevProps) {
    const { translateX } = this.state;
    const { visible } = this.props;

    // if the modal is now visible and wasn't previously, start translateX
    if (visible && !prevProps.visible) {
      Animated.spring(translateX, {
        toValue: 0,
        friction: 20,
      }).start();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  cancelModal = () => {
    setTimeout(() => {
      this.props.onClose();
    }, 800);
    setTimeout(() => {
      // this.props.onClose();
      this.closeModal();
    }, 350);
  };

  closeModal = () => {
    const { translateX } = this.state;

    Animated.spring(translateX, {
      toValue: -DEVICE_WIDTH,
      friction: 20,
    }).start();
  };

  selectOption = option => {
    if (this.props.isSelectable) {
      this.setState({ selectedId: option.id }, () => {
        // show small delay so user can see their selection was made
        setTimeout(() => {
          this.props.onSelection(option);
        }, 800);
        setTimeout(() => {
          this.closeModal();
        }, 350);
      });
    }
  };

  render() {
    const {
      visible,
      title,
      activeId,
      isGroupPicker,
      onPress,
      type,
    } = this.props;
    const { translateX, selectedId } = this.state;

    return (
      <Modal visible={visible} transparent>
        <Animated.View
          style={{
            flex: 1,
            transform: [{ translateX }],
          }}
        >
          <StyledModalContainer>
            <StyledHeaderView>
              <StyledCloseButton onPress={this.cancelModal}>
                <StyledBackImage source={BackArrowBlack} />
              </StyledCloseButton>
              <HeadingRow>
                {isGroupPicker === true && (
                  <StyledGroupImage source={PeopleGreen} />
                )}
                <StyledHeading>{title}</StyledHeading>
              </HeadingRow>
            </StyledHeaderView>
            <StyledOptionSection>
              <FlatList
                style={{ height: DEVICE_HEIGHT - 225 }}
                extraData={this.state}
                data={this.props.options}
                renderItem={({ item }) => (
                  <PickerItem
                    item={item}
                    activeId={activeId}
                    selectedId={selectedId}
                    selectOption={() => this.selectOption(item)}
                    type={type}
                  />
                )}
                keyExtractor={item => `${item.id}`}
              />
              {isGroupPicker === true && (
                <StyledBrowseMoreButton onPress={() => onPress()}>
                  <StyledBrowseMoreText>
                    Browse More Groups...
                  </StyledBrowseMoreText>
                </StyledBrowseMoreButton>
              )}
            </StyledOptionSection>
          </StyledModalContainer>
        </Animated.View>
      </Modal>
    );
  }
}

export default PickerModal;

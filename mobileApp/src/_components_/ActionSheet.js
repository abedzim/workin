import React, { Component } from 'react';
import { Modal, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import ActionSheetItem from './ActionSheetItem';

import colors from './Global/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const StyledView = styled.View``;

const StyledTopView = styled.TouchableOpacity`
  height: ${props => props.height};
  background-color: transparent;
`;

const StyledActionSheet = styled.View`
  background-color: ${colors.white};
  border-top-left-radius: 15;
  border-top-right-radius: 15;
`;

const StyledTitle = styled.Text`
  color: ${colors.black};
  line-height: 20px;
  font-size: 22px;
  letter-spacing: -0.0861539px;
  padding-top: 28;
  padding-bottom: 28;
  padding-left: 20;
`;

const StyledDescription = styled.Text`
  line-height: 26px;
  font-size: 16px;
  text-align: center;
  letter-spacing: -0.0861539px;
  padding-bottom: 8;
`;

const StyledCancelButton = styled.TouchableOpacity`
  width: ${DEVICE_WIDTH};
  background-color: white;
  padding-top: 24;
  padding-bottom: 34;
`;

const StyledCancel = styled.Text`
  align-self: center;
  color: ${colors.mediumAccent};
  font-weight: 600;
  line-height: 18px;
  font-size: 18px;
  letter-spacing: -0.0861539px;
`;

class ActionSheet extends Component {
  constructor() {
    super();
    this.state = {
      height: DEVICE_HEIGHT - 100,
    };
  }

  calculateHeight = e => {
    const height = e.nativeEvent.layout.height;
    this.setState({ height: DEVICE_HEIGHT - height });
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
      >
        <StyledView>
          <StyledTopView
            height={this.state.height}
            onPress={() => this.props.closeModal()}
          />
          <StyledActionSheet
            ref={ref => (this.actionSheet = ref)}
            onLayout={e => {
              this.calculateHeight(e);
            }}
          >
            <StyledTitle>{this.props.title}</StyledTitle>
            {this.props.description && (
              <StyledDescription>{this.props.description}</StyledDescription>
            )}
            {this.props.actions.map((value, index) => (
              <ActionSheetItem
                key={index}
                title={value.title}
                icon={value.icon}
                onPress={value.onPress}
              />
            ))}
            <StyledCancelButton onPress={() => this.props.closeModal()}>
              <StyledCancel>Cancel</StyledCancel>
            </StyledCancelButton>
          </StyledActionSheet>
        </StyledView>
      </Modal>
    );
  }
}

export default ActionSheet;

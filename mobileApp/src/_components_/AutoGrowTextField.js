import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import colors from './Global/colors';

const StyledView = styled.View`
  background-color: ${colors.white};
  padding: 15px 10px;
  align-self: center;
  justify-content: space-between;
  flex-direction: row;
`;

const StyledTextInput = styled.TextInput`
  height: ${props => props.height};
  flex: 1;
  color: ${colors.darkNeutral};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.0984616px;
  margin-right: 4;
`;

const StyledIconView = styled.TouchableOpacity`
  align-self: flex-end;
`;

const StyledSendButton = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  text-align: right;
  letter-spacing: -0.0861539px;
  text-decoration-line: underline;
  text-decoration-color: ${props => props.color};
  color: ${props => props.color};
`;

class AutoGrowTextField extends Component {
  constructor() {
    super();

    this.state = {
      height: 24,
    };
  }

  updateSize = height => {
    if (height > 24) {
      this.setState({
        height,
      });
    }
  };

  onSubmit = () => {
    Keyboard.dismiss();
    this.props.onSubmit();
  };

  render() {
    const {
      viewWidth,
      placeholder,
      onChangeText,
      value,
      myRef,
      onFocus,
      shouldHaveSendButton,
      textColor,
      buttonTitle,
    } = this.props;
    return (
      <StyledView width={viewWidth}>
        <StyledTextInput
          placeholder={placeholder}
          placeholderTextColor={colors.mediumNeutral}
          onChangeText={onChangeText}
          height={this.state.height}
          editable
          multiline
          value={value}
          onContentSizeChange={e =>
            this.updateSize(e.nativeEvent.contentSize.height)
          }
          ref={myRef}
          onFocus={onFocus}
          blurOnSubmit
        />
        {shouldHaveSendButton && (
          <StyledIconView onPress={() => this.onSubmit()}>
            <StyledSendButton color={textColor}>
              {buttonTitle || 'Send'}
            </StyledSendButton>
          </StyledIconView>
        )}
      </StyledView>
    );
  }
}

export default AutoGrowTextField;

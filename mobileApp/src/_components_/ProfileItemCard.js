import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import styled from 'styled-components/native';
import colors from './Global/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;

const StyledView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${DEVICE_WIDTH - 10};
  background-color: ${colors.white};
  margin-left: 10;
  padding-left: 10;
  border-radius: 3;
  margin-top: 10;
  align-self: flex-end;
  height: 53;
`;

const StyledIconView = styled.TouchableOpacity`
  margin-right: 24;
`;

const StyledImage = styled.Image``;

const StyledInput = styled.TextInput`
  color: ${colors.darkNeutral};
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  font-size: 14px;
  letter-spacing: -0.0984616px;
  flex: 1;
`;

const StyledPickerButton = styled.TouchableOpacity`
  width: ${DEVICE_WIDTH - 70};
`;

const StyledLabel = styled.Text`
  color: ${colors.darkNeutral};
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  font-size: 14px;
  letter-spacing: -0.0984616px;
`;

const StyledPlaceholder = styled.Text`
  color: ${colors.mediumNeutral};
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  font-size: 14px;
  letter-spacing: -0.0984616px;
`;

const inputStyles = {
  color: colors.darkNeutral,
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: 19,
  fontSize: 14,
  letterSpacing: -0.0984616,
  flex: 1,
};

class ProfileItemCard extends Component {
  onPressIcon = () => {
    if (this.props.isMasked) {
      const el = this.refs.textfield.getElement();
      // el.focus()
      el.focus();
    } else if (this.props.isPicker) {
      this.props.onSelectPicker();
    } else {
      this.textField.focus();
    }
  };

  handleEditIcon = () => {
    this.setState({ isEditable: true });
  };
  render() {
    let maskedValue;
    maskedValue = this.props.value === 'Invalid date' ? '' : this.props.value;
    maskedValue = this.props.value === 'null' ? '' : this.props.value;
    return (
      <StyledView>
        {this.props.isMasked && (
          <TextInputMask
            keyboardType={'numeric'}
            type={this.props.type}
            options={this.props.options}
            value={maskedValue}
            placeholder={this.props.placeholder}
            onChangeText={value => this.props.onChangeText(value)}
            hasError={this.props.hasError}
            placeholderTextColor={colors.mediumNeutral}
            style={inputStyles}
            ref="textfield"
          />
        )}

        {!this.props.isMasked && !this.props.isPicker && (
          <StyledInput
            value={this.props.value === 'null' ? null : this.props.value}
            placeholder={this.props.placeholder}
            onChangeText={value => this.props.onChangeText(value)}
            hasError={this.props.hasError}
            placeholderTextColor={colors.mediumNeutral}
            ref={ref => (this.textField = ref)}
          />
        )}
        {this.props.isPicker && (
          <StyledPickerButton onPress={this.props.onSelectPicker}>
            {this.props.value && (
              <StyledLabel>
                {this.props.value === 'null' ? null : this.props.value}
              </StyledLabel>
            )}
            {(!this.props.value || this.props.value === 'null') && (
              <StyledPlaceholder>{this.props.placeholder}</StyledPlaceholder>
            )}
          </StyledPickerButton>
        )}
        <StyledIconView onPress={() => this.onPressIcon()}>
          <StyledImage source={this.props.icon} />
        </StyledIconView>
      </StyledView>
    );
  }
}

export default ProfileItemCard;

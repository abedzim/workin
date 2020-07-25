import React, { Component } from 'react';
import { Dimensions, Switch } from 'react-native';
import styled from 'styled-components/native';
import colors from './Global/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;

const StyledView = styled.View``;

const StyledListItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 85;
`;

const StyledListText = styled.Text`
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  font-size: 14px;
  letter-spacing: -0.0861539px;
  color: ${colors.black};
  width: 230;
`;

const StyledListSwitch = styled.View`
  margin-right: 20;
`;

const StyledSeparator = styled.View`
  height: 2;
  background-color: ${colors.background};
  width: ${DEVICE_WIDTH - 20};
  align-self: flex-end;
`;

class SwitchCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOn: false,
    };
  }

  componentDidMount() {
    this.determineIfOn();
  }

  determineIfOn = () => {
    const filtered = this.props.currentSettings.filter(
      el => el === this.props.value.key,
    );
    if (filtered.length > 0) {
      this.setState({ isOn: true });
    } else {
      this.setState({ isOn: false });
    }
  };

  handleSwitchChange = () => {
    this.props.onPress();
    this.setState({ isOn: !this.state.isOn });
    // Make call to toggle notification setting based on id/type/etc.
  };

  render() {
    return (
      <StyledView>
        <StyledListItem>
          <StyledListText>{this.props.value.value}</StyledListText>
          <StyledListSwitch>
            <Switch
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              value={this.state.isOn}
              ios_backgroundColor={colors.lightNeutral}
              trackColor={{
                false: colors.lightNeutral,
                true: colors.primary,
              }}
              onValueChange={() => this.handleSwitchChange()}
            />
          </StyledListSwitch>
        </StyledListItem>
        <StyledSeparator />
      </StyledView>
    );
  }
}

export default SwitchCard;

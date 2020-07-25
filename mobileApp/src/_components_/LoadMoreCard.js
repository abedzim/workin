import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import colors from './Global/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;

const StyledMainView = styled.View`
  width: ${DEVICE_WIDTH - 20};
  margin-top: 10;
  margin-bottom: 30;
  align-items: center;
  justify-content: center;
`;

const StyledTextLinkButton = styled.TouchableOpacity``;

const StyledTextLink = styled.Text`
  font-weight: 600;
  line-height: 26px;
  font-size: 16px;
  text-align: center;
  letter-spacing: -0.0861539px;
  color: ${colors.mediumNeutral};
  text-decoration-line: underline;
`;

export default (LoadMoreCard = ({ onPress }) => (
  <StyledMainView>
    <StyledTextLinkButton onPress={onPress}>
      <StyledTextLink>Load more.</StyledTextLink>
    </StyledTextLinkButton>
  </StyledMainView>
));

import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import colors from './Global/colors';
import EndOfPosts from '../assets/images/EndOfPosts.png';

const DEVICE_WIDTH = Dimensions.get('window').width;

const StyledMainView = styled.View`
  width: ${DEVICE_WIDTH - 20};
  margin-top: 10;
  margin-bottom: 30;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-weight: 600;
  line-height: 26px;
  font-size: 16px;
  text-align: center;
  letter-spacing: -0.0861539px;
  color: ${colors.mediumNeutral};
  margin-top: 10;
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

const StyledImage = styled.Image``;

export default (BottomOfPostsCard = ({ onPress }) => (
  <StyledMainView>
    <StyledImage source={EndOfPosts} />
    <StyledText>You've reached the bottom of this feed!</StyledText>
    <StyledTextLinkButton onPress={onPress}>
      <StyledTextLink>Scroll to top.</StyledTextLink>
    </StyledTextLinkButton>
  </StyledMainView>
));

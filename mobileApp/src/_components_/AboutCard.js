import React from 'react';
import styled from 'styled-components/native';
import colors from './Global/colors';

const StyledMainView = styled.View`
  padding-left: 7;
  padding-bottom: 17;
  padding-right: 10;
`;

const StyledText = styled.Text`
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  font-size: 12px;
  letter-spacing: -0.0861539px;
  color: ${colors.mediumNeutral};
`;

export default (AboutCard = ({ info }) => {
  return (
    <StyledMainView>
      {info.map(
        (value, index) =>
          !!value &&
          value !== ', ' &&
          value !== ', , ' && <StyledText key={index}>{value}</StyledText>,
      )}
    </StyledMainView>
  );
});

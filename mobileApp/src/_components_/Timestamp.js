import React from 'react';
import moment from 'moment';
import styled from 'styled-components/native';

// checks for current date, subtracts 3 days
// if timestamp is before 3 days, display date
// if within last 3 days, use timeago to show time
export default function createTimeStamp(date) {
  const StyledTimeStamp = styled.Text`
    text-align: right;
    color: gray;
    font-size: 13;
    padding-right: 8;
  `;
  return <StyledTimeStamp>{moment(date).fromNow()}</StyledTimeStamp>;
}

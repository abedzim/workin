import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import RemovePhoto from '../assets/images/RemovePhoto.png';
import { DEVICE_WIDTH } from './HeaderDetail';

const StyledView = styled.View`
  flex-direction: row;
  margin: 10px 4px;
`;

const StyledImageView = styled.View``;

const StyledImage = styled.Image`
  width: 80;
  height: 80;
  border-radius: 3;
  margin: 0px 6px;
`;

const StyledRemovePhoto = styled.Image`
  height: 25;
  width: 25;
`;

const StyledRemoveButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 100;
  bottom: -8;
  right: -6;
`;

export default (ImagePreview = props => {
  if (props.images.length > 0) {
    return (
      <StyledView>
        <ScrollView horizontal style={{ paddingBottom: 10 }}>
          {props.images.length > 0 &&
            props.images.map((value, index) => (
              <StyledImageView key={index}>
                <StyledRemoveButton onPress={() => props.onPressRemove(value)}>
                  <StyledRemovePhoto source={RemovePhoto} />
                </StyledRemoveButton>
                <StyledImage
                  source={
                    typeof value !== 'string'
                      ? value.file_url
                      :  value
                  }
                />
              </StyledImageView>
            ))}
        </ScrollView>
      </StyledView>
    );
  }
  return null;
});

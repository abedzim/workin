import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import colors from './Global/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const thirds = Dimensions.get('window').height / 3;
const IMAGE_HEIGHT = thirds - 50;

// console.log('IMAGE HEIGHT ', IMAGE_HEIGHT);

const StyledImageButton = styled.TouchableOpacity``;

const StyledMainImage = styled.Image`
  width: ${DEVICE_WIDTH - 48};
  height: ${IMAGE_HEIGHT};
  align-self: center;
  margin-top: 13;
  margin-bottom: 16;
`;

const StyledHalfImageRowView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 13;
  margin-bottom: 16;
`;

const StyledHalfImage = styled.Image`
  width: ${(DEVICE_WIDTH - 45) / 2};
  height: ${IMAGE_HEIGHT};
`;

const StyledHalfImageOverlay = styled.View`
  background-color: rgba(29, 30, 33, 0.5);
  width: ${(DEVICE_WIDTH - 45) / 2};
  height: ${IMAGE_HEIGHT};
  position: absolute;
  z-index: 1;
  justify-content: center;
`;

const StyledOverlayCount = styled.Text`
  color: ${colors.white};
  font-weight: 600;
  line-height: 37px;
  font-size: 32px;
  letter-spacing: -0.196923px;
  align-self: center;
`;

export default (FeedCardMainImage = ({ images, openModal }) => {
  //Should all be touchable view that opens paging with all images

  if (images.length === 0) {
    return null;
  } else if (images.length === 1) {
    return (
      <StyledImageButton
        onPress={() => openModal({ images: images, index: 0 })}
      >
        <StyledMainImage source={ images[0].file_url } />
      </StyledImageButton>
    );
  } else if (images.length === 2) {
    return (
      <StyledHalfImageRowView>
        <StyledImageButton
          onPress={() => openModal({ images: images, index: 0 })}
        >
          <StyledHalfImage source={ images[0].file_url } />
        </StyledImageButton>
        <StyledImageButton
          onPress={() => openModal({ images: images, index: 1 })}
        >
          <StyledHalfImage source={ images[1].file_url } />
        </StyledImageButton>
      </StyledHalfImageRowView>
    );
  } else {
    return (
      <StyledHalfImageRowView>
        <StyledImageButton
          onPress={() => openModal({ images: images, index: 0 })}
        >
          <StyledHalfImage source={ images[0].file_url } />
        </StyledImageButton>
        <StyledImageButton
          onPress={() => openModal({ images: images, index: 1 })}
        >
          <StyledHalfImageOverlay>
            <StyledOverlayCount>{`+${images.length - 2}`}</StyledOverlayCount>
          </StyledHalfImageOverlay>
          <StyledHalfImage source={ images[1].file_url } />
        </StyledImageButton>
      </StyledHalfImageRowView>
    );
  }
});

import React from 'react';
import { Modal, Dimensions, SafeAreaView, Image } from 'react-native';
import styled from 'styled-components/native';
import BackArrow from '../assets/images/BackArrow.png';
import colors from './Global/colors';
import Avatar from './Avatar';

const DEVICE_WIDTH = Dimensions.get('window').width;
const IMAGE_WIDTH = Dimensions.get('window').width - 20;
const IMAGE_HEIGHT = Dimensions.get('window').height / 2;

const StyledHeader = styled.View`
  background-color: ${colors.black};
  width: ${DEVICE_WIDTH};
  flex-direction: column;
  align-items: flex-start;
  padding-left: 12;
  padding-top: 38;
  padding-bottom: 16;
`;

const StyledNameRowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledName = styled.Text`
  margin-left: 8;
  line-height: 14px;
  font-size: 12px;
  letter-spacing: -0.0738462px;
  color: ${colors.white};
`;

const StyledGroupName = styled.Text`
  font-weight: 600;
  line-height: 14px;
  font-size: 12px;
  letter-spacing: -0.0738462px;
  color: ${colors.mediumNeutral};
`;

const StyledScrollView = styled.ScrollView`
  background-color: 'rgba(29, 30, 33, 0.85)';
`;

const StyledMainImage = styled.Image`
  width: ${IMAGE_WIDTH};
  height: ${IMAGE_HEIGHT};
  align-self: center;
  margin-top: 10;
`;

const StyledCloseButton = styled.TouchableOpacity`
  margin-bottom: 16;
`;

export default (PagingView = ({
  post,
  modalVisible,
  groupName,
  closeModal,
}) => {
  const { images, user } = post;
  const { full_name } = user;
  return (
    <SafeAreaView>
      <Modal animationType="slide" transparent visible={modalVisible}>
        <StyledHeader>
          <StyledCloseButton onPress={() => closeModal()}>
            <Image source={BackArrow} />
          </StyledCloseButton>
          <StyledNameRowView pointerEvents="none">
            <Avatar
              source={user.avatar_url}
              size={32}
              onSelectUser={() =>
                console.log('on select user from paging view')
              }
              firstName={user.first_name}
              lastName={user.last_name}
            />
            <StyledName>{`${full_name}, `}</StyledName>
            <StyledGroupName>{groupName}</StyledGroupName>
          </StyledNameRowView>
        </StyledHeader>
        <StyledScrollView>
          {images.map((value, index) => (
            <StyledMainImage key={index} source={ value.file_url } />
          ))}
        </StyledScrollView>
      </Modal>
    </SafeAreaView>
  );
});

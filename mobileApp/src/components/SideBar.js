import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';


export default SideBar = props => (
  <ScrollView>
    <ImageBackground
      source={require('../data/images/background.png')}
      style={{width: undefined, padding: 16, paddingTop: 48}}>
      <Image
        source={require('../data/images/zim.jpg')}
        style={styles.profile}
      />
      <Text style={styles.name}>Sophie Stewart</Text>

      <View style={{flexDirection: 'row'}}>
        <Text style={styles.followers}>734 Followers</Text>
        <Ionicons name="md-people" size={16} color="rgba(255, 255, 255, 0.8)" />
      </View>
    </ImageBackground>

    <View
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <DrawerNavigatorItems {...props} />
      {/* <View style={{flexDirection: 'row'}}>
      <Feather name="bar-chart" size={16} color="rgba(255, 255, 255, 0.8)" />
        <Text>Logout</Text>
      </View> */}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  name: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 8,
  },
  followers: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    marginRight: 4,
  },
});

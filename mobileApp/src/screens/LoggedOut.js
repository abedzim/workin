/**
 * Airbnb Clone App
 * @author: Andy
 * @Url: https://www.cubui.com
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import transparentHeaderStyle from '../styles/navigation';
import RoundedButton from '../components/buttons/RoundedButton';
import NavBarButton from '../components/buttons/NavBarButton';

const airbnbLogo = require('../img/mon-logo.png');
const ACCESS_TOKEN = 'access_token'
const ACCOUNT = 'my_id'

export default class LoggedOut extends Component {
  constructor(props) {
    super(props);

    this._checkAuthority();
  }

  async _checkAuthority() {
    const { navigation } = this.props,
          userAuthorizationToken = await AsyncStorage.getItem('res');

    navigation.navigate(userAuthorizationToken? 'Apps': 'Auth');
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
/**
 * Airbnb Clone App
 * @author: Andy
 * @Url: https://www.cubui.com
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import website_url from '../../config';
import {ListItem, Avatar} from 'react-native-elements';

export default class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      infos: [],
      id: this.props.navigation.getParam('user_id'),
      profile_id: ''
    };
  }

  async getInfo() {
    var url = website_url + 'api/user_followers/' + this.state.id + '/';

    let token = await AsyncStorage.getItem('res');
    const tokens = JSON.parse(token);

    let data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + tokens,
      },
    };
    this.setState({
      loading: true,
    });
    try {
      response = await fetch(url, data);
      let res = await response.json();
      if (response.status >= 200 && response.status <= 300) {
        this.setState({
          error: '',
          infos: res,
          profile_id: res.id,
          loading: false,
        });
      } else {
        let error = res;
        throw error;
      }
    } catch (e) {
      this.setState({error: e});
      //console.log('error: ' + e)
    }
  }

  componentDidMount() {
    this.getInfo();
    // this.fetchData();
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.infos}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.lisContainer}>
              <View style={styles.list}>
                {item.profile.mugshot ? (
                  <Avatar
                    size="medium"
                    rounded
                    source={{uri: item.profile.mugshot}}
                  />
                ) : (
                  <Avatar
                    size="medium"
                    rounded
                    source={{
                      uri:
                        'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
                    }}
                  />
                )}
                <View style={{marginHorizontal: 7}}>
                  <Text
                    onPress={() =>
                      this.props.navigation.push('CreateList', {
                        profile_id: item.id, 
                      })
                    }>
                    {item.username}
                  </Text>
                  <Text>{item.email}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.follow}>
                <Text style={{color: '#fff'}}>Follow</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    alignItems: 'center',
  },
  follow: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 45,
    paddingHorizontal: 13,
    paddingVertical: 5,
    backgroundColor: '#00ace6',
  },
});

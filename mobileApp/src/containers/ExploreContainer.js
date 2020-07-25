/**
 * Airbnb Clone App
 * @author: Andy
 * @Url: https://www.cubui.com
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Header,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  AsyncStorage,
  Dimensions,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Avatar, Card} from 'react-native-elements';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import colors from '../styles/colors';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';
import ActionSheet from 'react-native-actionsheet';

import website_url from '../../config';

const {width, height} = Dimensions.get('screen');

class ExploreContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: true,
      isLoadingMore: false,
      token: '',
      next_url: '',
      posts: [],
      users: [],
      jobs: [],
      profile: {},
      username: '',
    };
  }
  showActionSheet1 = () => {
    this.ActionSheet.show();
  };

  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'HOME',
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 13,
      alignSelf: 'center',
      textAlign: 'center',
      flex: 1,
    },
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
    },
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={{paddingLeft: 15}}>
        <Avatar
          size="small"
          rounded
          source={require('../data/images/zim1.jpg')}
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('InboxContainer')}
        style={{paddingRight: 15}}>
        <Entypo name="mail-with-circle" size={35} color="#666666"></Entypo>
      </TouchableOpacity>
    ),
  });

  getPosts(swipe_refresh = false) {
    this.setState({loading: true});
    var url = website_url + 'api/posts/';
    const tokens = JSON.parse(this.state.token);
    let data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + tokens,
      },
    };
    fetch(url, data)
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
          posts: jsonData,
          loading: false,
          refreshing: false,
        });
      })
      .catch(error => {
        //console.log('error: ' + error)
        this.setState({loading: false});
      });
  }

  getTopUsers(swipe_refresh = false) {
    this.setState({loading: true});
    var url = website_url + 'api/account/';
    const tokens = JSON.parse(this.state.token);
    let data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + tokens,
      },
    };
    fetch(url, data)
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
          users: jsonData,
          profile: jsonData.profile,
          loading: false,
        });
      })
      .catch(error => {
        //console.log('error: ' + error)
        this.setState({loading: false});
      });
  }

  getSelectedJobs(swipe_refresh = false) {
    this.setState({loading: true});
    var url = website_url + 'api/jobs/';
    const tokens = JSON.parse(this.state.token);
    let data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + tokens,
      },
    };
    fetch(url, data)
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
          jobs: jsonData,
          loading: false,
        });
      })
      .catch(error => {
        //console.log('error: ' + error)
        this.setState({loading: false});
      });
  }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      function() {
        this.getPosts();
      },
    );
  };

  onRefresh() {
    //Clear old data of the list
    this.setState({posts: []});
    //Call the Service to get the latest data
    this.getPosts();
    this.getTopUsers();
  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    AsyncStorage.getItem('res')
      .then(access_token => {
        this.setState({
          token: access_token,
        });
        this.getPosts();
        this.getTopUsers();
        this.getSelectedJobs();
      })
      .catch(e => {
        //console.log(e);
      });
  }

  async signOut() {
    try {
      await AsyncStorage.removeItem('res');
      await AsyncStorage.removeItem('my_id');
      navigation.navigate('Auth');
    } catch (e) {
      //console.log('Something goes Wrong!' + e)
    }
  }

  renderTimestamp = timestamp => {
    let prefix = '';
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000,
    );
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = 'just now...';
    } else if (timeDiff < 60 && timeDiff > 1) {
      // less than sixty minutes ago
      prefix = `${timeDiff} minutes ago`;
    } else if (timeDiff < 24 * 60 && timeDiff > 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} hours ago`;
    } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
      // less than 7 days ago
      prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
    } else {
      prefix = `${new Date(timestamp)}`;
    }
    return prefix;
  };

  render() {
    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.wrapper}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }>
        {/* <View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
            }}>
            <Text style={[styles.text, {fontSize: 22}]}>Jobs for you</Text>
            <TouchableOpacity>
              <Ionicon name="md-more" size={20}></Ionicon>
            </TouchableOpacity>
          </View>

          <View style={{marginLeft: 5}}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.state.jobs.slice(0, 6)}
              extraData={this.state}
              renderItem={({item}) => {
                return (
                  <View style={styles.yourJobs}>
                    <Text style={styles.text}>{item.title}</Text>
                    <Text
                      numberOfLines={1}
                      style={[styles.textThird, {flex: 1}]}>
                      {item.content}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Text>By</Text>
                        <Text> </Text>
                        <Text style={{color: '#ffa31a'}}>
                          @{item.user.username}
                        </Text>
                      </View>
                      <Text style={[styles.subText, {color: '#ffd699', marginTop: 10}]}>
                        {this.renderTimestamp(item.timestamp)}
                      </Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={item => item.id.toString()}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
            />
          </View>
        </View> */}

        <FlatList
          data={this.state.posts.slice(0, 1)}
          showsVerticalScrollIndicator={false}
          extraData={this.state.post}
          renderItem={({item}) => (
            <View style={[styles.post, {marginTop: 15}]}>
              <View style={styles.postTop}>
                <View style={styles.userInfos}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('CreateList', {
                        user_id: item.user.id,
                        username: item.user.username,
                        mugshot: item.user.profile.mugshot
                      })
                    }>
                    <Avatar
                      size="small"
                      rounded
                      source={{uri: item.user.profile.mugshot}}
                    />
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.text,
                      {marginLeft: 10, color: '#1a1a1a', fontSize: 15},
                    ]}
                    onPress={() =>
                      this.props.navigation.navigate('CreateList', {
                        profile_id: item.user.id,
                      })
                    }>
                    {item.user.username}
                  </Text>
                  <Text> </Text>
                  <Text> </Text>
                  <Text
                    style={{fontSize: 22, fontWeight: 'bold', marginTop: -13}}>
                    .
                  </Text>
                  <Text> </Text>
                  <Text> </Text>
                  <Text style={[styles.subText, styles.timestamp]}>
                    {this.renderTimestamp(item.timestamp)}
                  </Text>
                </View>
                <TouchableOpacity onPress={this.showActionSheet1}>
                  <Ionicon name="ios-more" size={18}></Ionicon>
                  <ActionSheet
                    ref={o => (this.ActionSheet = o)}
                    title={'Post options'}
                    options={['Edit', 'Delete', 'cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={index => {
                      /* do something */
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Text style={[styles.textSegond, styles.dataContent]}>
                {item.content}
              </Text>
              {/* <TouchableHighlight style={styles.cardP}>
                <View>
                  <Image
                    style={styles.postImage}
                    source={require('../data/images/08.jpg')}
                  />
                </View>
              </TouchableHighlight> */}
              <View style={styles.postStats}>
                <AntDesign
                  style={{marginRight: 15}}
                  name="like1"
                  size={22}
                  color="#ff3333"></AntDesign>
                <FontAwesome
                  name="comments-o"
                  size={22}
                  color="#d9d9d9"></FontAwesome>
              </View>
              <View style={styles.stats}>
                <View style={styles.statsImages}>
                  <Image
                    style={styles.postImageLike}
                    source={require('../data/images/zim.jpg')}
                  />
                  <Image
                    style={styles.postImageLike}
                    source={require('../data/images/zim1.jpg')}
                  />
                  <Image
                    style={styles.postImageLike}
                    source={require('../data/images/08.jpg')}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.textThird, {color: '#666666'}]}>
                    Liked by{' '}
                  </Text>
                  <Text style={[styles.textThird, {color: '#333333'}]}>
                    nina and 47 others
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
        />

        <View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
            }}>
            <Text style={[styles.text, {fontSize: 22}]}>Top profile</Text>
            <TouchableOpacity>
              <Ionicon name="md-more" size={20}></Ionicon>
            </TouchableOpacity>
          </View>

          <View style={{marginLeft: 5}}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.state.users.slice(1, 6)}
              extraData={this.state.users}
              renderItem={({item}) => {
                return (
                  <View style={styles.topUser}>
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
                    <Text style={styles.text}>{item.username}</Text>
                    <Text style={styles.subText}>Full-tack developer</Text>
                    <TouchableOpacity
                      style={styles.viewProfile}
                      onPress={() =>
                        this.props.navigation.push('CreateList', {
                          profile_id: item.id,
                        })
                      }>
                      <Text style={[styles.subText, {color: '#fff'}]}>
                        View profile
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={item => item.id.toString()}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
            />
          </View>
        </View>

        <FlatList
          data={this.state.posts.slice(1)}
          showsVerticalScrollIndicator={false}
          extraData={this.state.post}
          renderItem={({item}) => (
            <View style={styles.post}>
              <View style={styles.postTop}>
                <View style={styles.userInfos}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('CreateList', {
                        user_id: item.user.id,
                        username: item.user.username,
                      })
                    }>
                    <Avatar
                      size="small"
                      rounded
                      source={{uri: item.user.profile.mugshot}}
                    />
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.text,
                      {marginLeft: 10, color: '#1a1a1a', fontSize: 15},
                    ]}
                    onPress={() =>
                      this.props.navigation.navigate('CreateList', {
                        profile_id: item.user.id,
                      })
                    }>
                    {item.user.username}
                  </Text>
                  <Text> </Text>
                  <Text> </Text>
                  <Text
                    style={{fontSize: 22, fontWeight: 'bold', marginTop: -13}}>
                    .
                  </Text>
                  <Text> </Text>
                  <Text> </Text>
                  <Text style={[styles.subText, styles.timestamp]}>
                    {this.renderTimestamp(item.timestamp)}
                  </Text>
                </View>
                <TouchableOpacity onPress={this.showActionSheet1}>
                  <Ionicon name="ios-more" size={18}></Ionicon>
                  <ActionSheet
                    ref={o => (this.ActionSheet = o)}
                    title={'Post options'}
                    options={['Edit', 'Delete', 'cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={index => {
                      /* do something */
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Text style={[styles.textSegond, styles.dataContent]}>
                {item.content}
              </Text>
              {/* <TouchableHighlight style={styles.cardP}>
                <View>
                  <Image
                    style={styles.postImage}
                    source={require('../data/images/08.jpg')}
                  />
                </View>
              </TouchableHighlight> */}
              <View style={styles.postStats}>
                <AntDesign
                  style={{marginRight: 15}}
                  name="like1"
                  size={22}
                  color="#ff3333"></AntDesign>
                <FontAwesome
                  name="comments-o"
                  size={22}
                  color="#d9d9d9"></FontAwesome>
              </View>
              <View style={styles.stats}>
                <View style={styles.statsImages}>
                  <Image
                    style={styles.postImageLike}
                    source={require('../data/images/zim.jpg')}
                  />
                  <Image
                    style={styles.postImageLike}
                    source={require('../data/images/zim1.jpg')}
                  />
                  <Image
                    style={styles.postImageLike}
                    source={require('../data/images/08.jpg')}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.textThird, {color: '#666666'}]}>
                    Liked by{' '}
                  </Text>
                  <Text style={[styles.textThird, {color: '#333333'}]}>
                    nina and 47 others
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
        />
        <TouchableOpacity
          style={styles.circledButton}
          onPress={() => this.props.navigation.navigate('NewPost')}>
          <Ionicon name="md-create" size={20} color="orange" />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontFamily: 'K2D-SemiBold',
    color: '#262626',
  },
  textSegond: {
    fontFamily: 'K2D-Regular',
    color: '#262626',
  },
  textThird: {
    fontFamily: 'K2D-Light',
    color: '#262626',
  },
  subText: {
    fontFamily: 'K2D-Light',
    fontSize: 12,
    color: '#AEB5BC',
    // textTransform: 'uppercase',
    fontWeight: '300',
  },
  cardP: {
    width: width - 30,
    flexDirection: 'column',
    minHeight: width - 15,
    borderRadius: 13,
    marginHorizontal: 15,
  },
  dataContent: {
    marginHorizontal: 15,
    marginBottom: 15,
    color: '#1a1a1a',
  },
  image: {
    width: undefined,
    flex: 1,
    height: 100,
    borderRadius: 8,
    marginBottom: 2,
  },
  topUser: {
    width: 130,
    elevation: 3,
    borderRadius: 12,
    marginLeft: 10,
    paddingVertical: 25,
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  yourJobs: {
    width: 200,
    elevation: 3,
    borderRadius: 12,
    marginLeft: 10,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  viewProfile: {
    backgroundColor: '#ff9900',
    paddingHorizontal: 7,
    borderRadius: 17,
    marginTop: 10,
  },
  post: {
    marginHorizontal: 15,
    marginVertical: 7,
    elevation: 3,
    borderTopStartRadius: 7,
    borderBottomEndRadius: 7,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  topS: {
    marginLeft: 10,
  },
  postTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 7,
    alignItems: 'center',
    // borderBottomColor: 'gray',
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  userInfos: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 11,
    color: '#cccccc',
  },
  postContent: {
    paddingHorizontal: 15,
    marginTop: 7,
  },
  postImage: {
    width: undefined,
    flex: 1,
    height: width - 30,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  postStats: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: -4,
  },
  postImageLike: {
    width: 20,
    height: 20,
    borderRadius: 100,
    marginLeft: -7,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 20,
  },
  statsImages: {
    flexDirection: 'row',
    marginRight: 7,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 7,
    paddingHorizontal: 22,
  },
  circledButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f2f2f2',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    position: 'absolute',
    right: 5,
    bottom: 10,
  },
});

const ListingsQuery = gql`
  query {
    multipleListings {
      title
      description
    }
  }
`;

const ExploreContainerTab = graphql(ListingsQuery)(ExploreContainer);

export default ExploreContainerTab;

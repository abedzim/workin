import React from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  FlatList,
  AsyncStorage,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontiso from 'react-native-vector-icons/Fontisto';
import {BoxShadow} from 'react-native-shadow';
import {SearchBar} from 'react-native-elements';
import {Avatar, Card} from 'react-native-elements';
import {red} from 'ansi-colors';
import website_url from '../../config';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');

export default class Campings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteListings: [],
      username: '',
      activeIndex: 0,
      search: '',
      jobs: [],
      token: '',
    };
  }

  static navigationOptions = {
    header: null,
  };

  updateSearch = search => {
    this.setState({search});
  };

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
        this.getSelectedJobs();
      })
      .catch(e => {
        //console.log(e);
      });
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
    const {search} = this.state;
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#ff9000', '#ffe450']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.screenHeader}>
          <View
            style={{
              marginTop: 70,
              paddingHorizontal: 20,
              paddingVertical: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Ionicon
              name="ios-arrow-back"
              color="#fff"
              size={24}
              onPress={() => this.props.navigation.goBack()}></Ionicon>
          </View>
          <View style={{marginHorizontal: 15}}>
            <View>
              <Text style={[styles.textSegond, {fontSize: 32, marginLeft: 10}]}>
                Jobs
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <SearchBar
                placeholder="Search..."
                onChangeText={this.updateSearch}
                value={search}
                round
                lightTheme
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderBottomWidth: 0.1,
                  borderTopWidth: 0.1,
                }}
                inputContainerStyle={{
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  paddingTop: 5,
                  height: 35,
                  width: width - 120,
                }}
              />
              <View
                style={{
                  backgroundColor: '#ff9000',
                  borderRadius: 20,
                  height: 35,
                  width: 100,
                  marginTop: 8,
                  textAlignVertical: 'center',
                  paddingLeft: 20,
                  paddingTop: 6,
                  marginRight: -50,
                }}>
                <Ionicon
                  name="ios-options"
                  // style={{position: 'absolute', right: 14}}
                  color="#fff"
                  size={22}></Ionicon>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={{marginBottom: 10}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
            }}>
            <Text style={[styles.text, {fontSize: 22}]}>Top Companies</Text>
            <TouchableOpacity>
              <Ionicon name="md-more" size={20}></Ionicon>
            </TouchableOpacity>
          </View>

          <View style={{marginLeft: 5}}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.state.jobs.slice(0, 6)}
              extraData={this.state.jobs}
              renderItem={({item}) => {
                return (
                  <View style={styles.topUser}>
                    {item.user.profile.mugshot ? (
                      <Avatar
                        size="medium"
                        rounded
                        source={{uri: item.user.profile.mugshot}}
                      />
                    ) : (
                      <Avatar
                        size="medium"
                        rounded
                        source={{
                          uri:
                            'https://www.doz.com/cms/wp-content/uploads/2015/03/airbnb-logo.png',
                        }}
                      />
                    )}
                    {/* <Text style={styles.text}>{item.title}</Text> */}
                    <Text style={styles.text}>Airbnb</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Ionicon
                        name="ios-pin"
                        color="#AEB5BC"
                        size={16}></Ionicon>
                      <Text style={[styles.subText, {marginHorizontal: 5}]}>
                        Paris, France
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <Text style={[styles.subText, {color: '#ff9000'}]}>
                        15+ Jobs open
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            marginHorizontal: 15,
            marginBottom: 15,
          }}>
          <Text style={[styles.text, {fontSize: 22}]}>Jobs for you</Text>
          <TouchableOpacity>
            <Text style={[styles.textSegond, {color: '#ff9000'}]}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={this.state.jobs}
          extraData={this.state.jobs}
          renderItem={({item}) => {
            return (
              <View style={[styles.jobs]}>
                <View style={[{flexDirection: 'row'}]}>
                  {item.user.profile.mugshot ? (
                    <Avatar
                      size="medium"
                      rounded
                      source={{uri: item.user.profile.mugshot}}
                    />
                  ) : (
                    <Avatar
                      size="medium"
                      rounded
                      source={{
                        uri:
                          'https://www.doz.com/cms/wp-content/uploads/2015/03/airbnb-logo.png',
                      }}
                    />
                  )}
                  <View style={{marginLeft: 15}}>
                    <Text
                      style={styles.text}
                      onPress={() =>
                        this.props.navigation.navigate('JobDetail')
                      }>
                      {item.title}
                    </Text>
                    <Text style={styles.textThird}>Airbnb</Text>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Ionicon
                        name="ios-pin"
                        color="#AEB5BC"
                        size={16}></Ionicon>
                      <Text style={[styles.subText, {marginHorizontal: 5}]}>
                        Paris, France
                      </Text>
                    </View>

                    <Text style={[styles.textThird]}>{item.job_type}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{position: 'absolute', top: 10, right: 10}}>
                  <Ionicon
                    name="ios-bookmark"
                    color="#AEB5BC"
                    size={25}></Ionicon>
                </TouchableOpacity>

                <Text
                  style={[
                    styles.subText,
                    {
                      position: 'absolute',
                      right: 10,
                      bottom: 10,
                      color: '#ff9000',
                    },
                  ]}>
                  {this.renderTimestamp(item.timestamp)}
                </Text>
              </View>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  headerContainer: {
    top: 0,
    height: height * 0.15,
    width: width,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.15,
    paddingHorizontal: 14,
  },
  screenHeader: {
    width: width,
    height: height / 3,
    backgroundColor: '#ffe450',
    // opacity: 0.6,
    borderRadius: 35,
    marginTop: -70,
    marginBottom: 10,
  },
  topUser: {
    width: 150,
    elevation: 3,
    borderRadius: 12,
    marginLeft: 10,
    paddingVertical: 10,
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  jobs: {
    width: width - 30,
    elevation: 1,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 4,
    padding: 10,
  },
  viewProfile: {
    backgroundColor: '#ff9000',
    paddingHorizontal: 7,
    borderRadius: 17,
    marginTop: 10,
  },
  location: {
    height: 24,
    width: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7657',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  rvMarker: {
    backgroundColor: '#FFBA5A',
  },
  tentMarker: {
    backgroundColor: '#FF7657',
  },
  settings: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    flex: 1,
    paddingHorizontal: 14,
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  tab: {
    paddingHorizontal: 14,
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
  },
  activeTab: {
    borderBottomColor: '#FF7657',
  },
  activeTabTitle: {
    color: '#FF7657',
  },
  map: {
    flex: 1,
  },
  camping: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#A5A5A5',
    borderBottomWidth: 0.5,
    padding: 20,
  },
  campingDetails: {
    flex: 2,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  campingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  campingImage: {
    width: width * 0.3,
    height: width * 0.25,
    borderRadius: 6,
  },
  cards: {
    width: width / 3 - 10,
    height: 50,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    elevation: 7,
  },
  exp: {
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 25,
  },
  myMarker: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 83, 251, 0.2)',
  },
  myMarkerDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#3353FB',
  },
});

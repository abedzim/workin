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
      users: [],
      token: '',
    };
  }

  static navigationOptions = {
    header: null,
  };

  updateSearch = search => {
    this.setState({search});
  };

  segmentClicked(index) {
    this.setState({
      activeIndex: index,
    });
  }
  checkActive = index => {
    if (this.state.activeIndex !== index) {
      return {color: 'gray'};
    } else {
      return {};
    }
  };

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
          loading: false,
        });
      })
      .catch(error => {
        //console.log('error: ' + error)
        this.setState({loading: false});
      });
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
        this.getTopUsers();
      })
      .catch(e => {
        //console.log(e);
      });
  }

  renderSectionOne() {
    const {navigate} = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          width: width - 10,
          marginHorizontal: 14,
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigate('JobDetail')}
          style={{
            borderRadius: 16,
            elevation: 2,
            marginVertical: 7,
          }}>
          <View style={{margin: 5, flexDirection: 'row'}}>
            <View
              style={{
                borderWidth: 2,
                borderColor: '#f2f2f2',
                width: 32,
                height: 32,
                borderRadius: 100,
                margin: 7,
              }}>
              <Image
                style={{
                  flex: 1,
                  height: undefined,
                  width: undefined,
                  borderRadius: 100,
                }}
                source={require('../data/images/mon-logo-2.png')}></Image>
            </View>
            <View style={{margin: 4}}>
              <Text style={{fontSize: 18, color: '#333333'}}>
                Senior Service Designer
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: '#cccccc',
                  marginBottom: 5,
                  marginTop: -4,
                }}>
                30 min ago
              </Text>
              <Text style={{fontSize: 15, color: '#666666'}}>
                Workin Compagny
              </Text>
              <Text style={{fontSize: 14, color: '#bfbfbf'}}>
                Paris, France
              </Text>
              <View style={{flexDirection: 'row', marginVertical: 7}}>
                <Text
                  style={{
                    backgroundColor: '#ffa31a',
                    color: '#fff',
                    borderRadius: 13,
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                  }}>
                  Python
                </Text>
                <Text> </Text>
                <Text
                  style={{
                    backgroundColor: '#ffa31a',
                    color: '#fff',
                    borderRadius: 13,
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                  }}>
                  React-native
                </Text>
                <Text> </Text>
                <Text
                  style={{
                    backgroundColor: '#ffa31a',
                    color: '#fff',
                    borderRadius: 13,
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                  }}>
                  Javascript
                </Text>
              </View>
            </View>
            <Ionicon
              name="md-more"
              style={{position: 'absolute', right: 14}}
              color="#333333"
              size={22}></Ionicon>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderRadius: 16,
            elevation: 2,
            marginVertical: 7,
          }}>
          <View style={{margin: 5, flexDirection: 'row'}}>
            <View
              style={{
                borderWidth: 2,
                borderColor: '#f2f2f2',
                width: 32,
                height: 32,
                borderRadius: 100,
                margin: 7,
              }}>
              <Image
                style={{
                  flex: 1,
                  height: undefined,
                  width: undefined,
                  borderRadius: 100,
                }}
                source={require('../data/images/fb.png')}></Image>
            </View>
            <View style={{margin: 4}}>
              <Text style={{fontSize: 18, color: '#333333'}}>
                Backend Developer
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: '#cccccc',
                  marginBottom: 5,
                  marginTop: -4,
                }}>
                1 hour ago
              </Text>
              <Text style={{fontSize: 15, color: '#666666'}}>
                Facebook France
              </Text>
              <Text style={{fontSize: 14, color: '#bfbfbf'}}>Nice, France</Text>
              <View style={{flexDirection: 'row', marginVertical: 7}}>
                <Text
                  style={{
                    backgroundColor: '#ffa31a',
                    color: '#fff',
                    borderRadius: 13,
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                  }}>
                  Python
                </Text>
                <Text> </Text>
                <Text
                  style={{
                    backgroundColor: '#ffa31a',
                    color: '#fff',
                    borderRadius: 13,
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                  }}>
                  Vue
                </Text>
                <Text> </Text>
                <Text
                  style={{
                    backgroundColor: '#ffa31a',
                    color: '#fff',
                    borderRadius: 13,
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                  }}>
                  PHP
                </Text>
              </View>
            </View>
            <Ionicon
              name="md-more"
              style={{position: 'absolute', right: 14}}
              color="#333333"
              size={22}></Ionicon>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderRadius: 16,
            elevation: 2,
            marginVertical: 7,
          }}>
          <View style={{margin: 5, flexDirection: 'row'}}>
            <View
              style={{
                borderWidth: 2,
                borderColor: '#f2f2f2',
                width: 32,
                height: 32,
                borderRadius: 100,
                margin: 7,
              }}>
              <Image
                style={{
                  flex: 1,
                  height: undefined,
                  width: undefined,
                  borderRadius: 100,
                }}
                source={require('../data/images/06.jpg')}></Image>
            </View>
            <View style={{margin: 4}}>
              <Text style={{fontSize: 18, color: '#333333'}}>Babysitter</Text>
              <Text
                style={{
                  fontSize: 11,
                  color: '#cccccc',
                  marginBottom: 5,
                  marginTop: -4,
                }}>
                2 hours ago
              </Text>
              <Text style={{fontSize: 15, color: '#666666'}}>Particulier</Text>
              <Text style={{fontSize: 14, color: '#bfbfbf'}}>Lile, France</Text>
              <View style={{flexDirection: 'row', marginVertical: 7}}>
                <Text
                  style={{
                    backgroundColor: '#ffa31a',
                    color: '#fff',
                    borderRadius: 13,
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                  }}>
                  Belle
                </Text>
              </View>
            </View>
            <Ionicon
              name="md-more"
              style={{position: 'absolute', right: 14}}
              color="#333333"
              size={22}></Ionicon>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderRadius: 16,
            elevation: 2,
            marginVertical: 7,
          }}>
          <View style={{margin: 5, flexDirection: 'row'}}>
            <View
              style={{
                borderWidth: 2,
                borderColor: '#f2f2f2',
                width: 32,
                height: 32,
                borderRadius: 100,
                margin: 7,
              }}>
              <Image
                style={{
                  flex: 1,
                  height: undefined,
                  width: undefined,
                  borderRadius: 100,
                }}
                source={require('../data/images/auchan.png')}></Image>
            </View>
            <View style={{margin: 4}}>
              <Text style={{fontSize: 18, color: '#333333'}}>
                Agent de securité (Home)
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: '#cccccc',
                  marginBottom: 5,
                  marginTop: -4,
                }}>
                3 hours ago
              </Text>
              <Text style={{fontSize: 15, color: '#666666'}}>Auchan</Text>
              <Text style={{fontSize: 14, color: '#bfbfbf'}}>
                Paris, France
              </Text>
              <View style={{flexDirection: 'row', marginVertical: 7}}>
                <Text
                  style={{
                    backgroundColor: '#ffa31a',
                    color: '#fff',
                    borderRadius: 13,
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                  }}>
                  Grand
                </Text>
                <Text></Text>
                <Text
                  style={{
                    backgroundColor: '#ffa31a',
                    color: '#fff',
                    borderRadius: 13,
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                  }}>
                  Test
                </Text>
              </View>
            </View>
            <Ionicon
              name="md-more"
              style={{position: 'absolute', right: 14}}
              color="#333333"
              size={22}></Ionicon>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderSectionTwo() {
    return (
      <View>
        <Text>section 2</Text>
      </View>
    );
  }

  renderSection() {
    if (this.state.activeIndex == 0) {
      return (
        <View style={{flexDirection: 'row'}}>{this.renderSectionTwo()}</View>
      );
    } else if (this.state.activeIndex == 1) {
      return <View>{this.renderSectionOne()}</View>;
    }
  }

  renderHeader() {
    return <View style={styles.headerContainer}>{this.renderTabs()}</View>;
  }

  renderTabs() {
    const {filters} = this.props;
    const shadowOpt = {
      width: width / 3 - 10,
      height: 50,
      color: '#ff9900',
      border: 2,
      radius: 6,
      opacity: 0.7,
      x: 0,
      y: 3,
      style: {marginVertical: 5},
    };

    return (
      <View style={{marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 7,
          }}>
          <Button
            onPress={() => this.segmentClicked(0)}
            transparent
            active={this.state.activeIndex == 0}>
            <ImageBackground
              source={require('../data/images/users.jpg')}
              style={styles.cards}>
              <Text
                onPress={() => this.segmentClicked(0)}
                style={[
                  styles.exp,
                  this.state.activeIndex == 0
                    ? {
                        color: '#fff',
                        borderBottomWidth: 1,
                        borderBottomColor: '#fff',
                      }
                    : {color: '#fff'},
                ]}>
                All
              </Text>
            </ImageBackground>
          </Button>
          <Button
            onPress={() => this.segmentClicked(1)}
            transparent
            active={this.state.activeIndex == 1}>
            <ImageBackground
              source={require('../data/images/jobs.jpeg')}
              style={styles.cards}>
              <Text
                onPress={() => this.segmentClicked(1)}
                style={[
                  styles.exp,
                  this.state.activeIndex == 1
                    ? {
                        color: '#fff',
                        borderBottomWidth: 1,
                        borderBottomColor: '#fff',
                      }
                    : {color: '#fff'},
                ]}>
                Jobs
              </Text>
            </ImageBackground>
          </Button>
          <Button
            onPress={() => this.segmentClicked(2)}
            transparent
            active={this.state.activeIndex == 2}>
            <ImageBackground
              source={require('../data/images/project.jpeg')}
              style={styles.cards}>
              <Text
                onPress={() => this.segmentClicked(2)}
                style={[
                  styles.exp,
                  this.state.activeIndex == 2
                    ? {
                        color: '#fff',
                        borderBottomWidth: 1,
                        borderBottomColor: '#fff',
                      }
                    : {color: '#fff'},
                ]}>
                Projects
              </Text>
            </ImageBackground>
          </Button>
        </View>
      </View>
    );
  }

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
              marginHorizontal: 15,
              paddingVertical: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text></Text>
            {/* <Ionicon
              name="ios-settings"
              // style={{position: 'absolute', right: 14}}
              color="#fff"
              size={30}></Ionicon> */}
          </View>
          <View style={{marginHorizontal: 15}}>
            <View>
              <Text style={[styles.textSegond, {fontSize: 32, marginLeft: 10}]}>
                Search
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
            <Text style={[styles.text, {fontSize: 22}]}>Top of the week</Text>
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
            />
          </View>
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
            marginBottom: 15,
          }}>
          <Text style={[styles.text, {fontSize: 22}]}>Suggestion</Text>
          {/* <TouchableOpacity>
            <Ionicon name="md-more" size={20}></Ionicon>
          </TouchableOpacity> */}
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={this.state.users}
          extraData={this.state.users}
          renderItem={({item}) => {
            return (
              <View style={{marginVertical: 5}}>
                <View style={{flexDirection: 'row', marginHorizontal: 15}}>
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
                  <View style={{marginHorizontal: 15}}>
                    <Text
                      style={styles.text}
                      onPress={() =>
                        this.props.navigation.navigate('CreateList', {
                          profile_id: item.id,
                        })
                      }>
                      {item.profile.get_full_name_or_username}
                    </Text>
                    <Text style={styles.subText}>Full-stack developer</Text>
                  </View>
                </View>
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

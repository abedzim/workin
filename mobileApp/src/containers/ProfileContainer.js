import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FacebookTabBar from '../components/FacebookTabBar';
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import {BoxShadow} from 'react-native-shadow';
import website_url from '../../config';
import {Icon, Fab} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

var {height, width} = Dimensions.get('window');
const ACCESS_TOKEN = 'access_token';
const ACCOUNT = 'my_id';
var images = [
  require('../data/images/10.jpg'),
  require('../data/images/09.jpg'),
  require('../data/images/08.jpg'),
  require('../data/images/07.jpg'),
  require('../data/images/06.jpg'),
  require('../data/images/zim1.jpg'),
  require('../data/images/05.jpg'),
  require('../data/images/04.jpg'),
  require('../data/images/03.jpg'),
];

class MyTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      infos: {},
    };
  }

  getInfo() {
    var url = website_url + 'api/me/';
    let token = AsyncStorage.getItem('res');
    let id = AsyncStorage.getItem('my_id');
    this.setState({
      token: token,
      id: id,
    });

    this.setState({loading: true});

    fetch('http://10.0.2.2:8000/api/me')
      .then(res => res.json())
      .then(res => {
        this.setState({
          infos: res,
          profile: res.profile,
          overview: res.overview[0],
        });
        console.log(res.overview);
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  }

  componentWillMount() {
    this.getInfo();
    // this.fetchData();
  }

  render() {
    return (
      <Text
        style={[
          styles.text,
          {
            fontWeight: '200',
            fontSize: 16,
            alignSelf: 'center',
            textAlign: 'center',
            flexGrow: 1,
          },
        ]}>
        @{this.state.infos.username}{' '}
        <Octicons name="verified" size={14} color="#4db8ff"></Octicons>
      </Text>
    );
  }
}

export default class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      infos: {},
      profile: {},
      overview: [],
      image:
        'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
      error: null,
      activeIndex: 0,
      token: '',
      id: 'my_id',
      active: false,
    };
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: <MyTitle />,
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
    },
    headerLeft: <Text>{''}</Text>,
    headerRight: (
      <TouchableOpacity style={{paddingHorizontal: 12}}>
        <Ionicon name="ios-settings" size={24} color="#52575D"></Ionicon>
      </TouchableOpacity>
    ),
  });

  segmentClicked(index) {
    this.setState({
      activeIndex: index,
    });
  }
  checkActive = index => {
    if (this.state.activeIndex !== index) {
      return {color: 'grey'};
    } else {
      return {};
    }
  };

  renderSectionOne() {
    return images.map((image, index) => {
      return (
        <View
          key={index}
          style={[
            {width: width / 3},
            {height: width / 3},
            {marginBottom: 2},
            index % 3 !== 0 ? {paddingLeft: 2} : {paddingLeft: 0},
          ]}>
          <Image
            style={{
              flex: 1,
              alignSelf: 'stretch',
              width: undefined,
              height: undefined,
            }}
            source={image}></Image>
        </View>
      );
    });
  }

  async getInfo() {
    var url = website_url + 'api/me/';
    this.setState({loading: true});
    let token = await AsyncStorage.getItem('res');
    let id = await AsyncStorage.getItem('my_id');
    this.setState({
      token: token,
      id: id,
    });

    await fetch('http://10.0.2.2:8000/api/me')
      .then(res => res.json())
      .then(res => {
        this.setState({
          infos: res,
          profile: res.profile,
          overview: res.overview[0],
          id: res.profile.id,
        });
        console.log(res.overview);
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  }
  // fetchData= async()=>{
  //   const response = await fetch("http://10.0.2.2:8000/api/me");
  //   const all = response.json();
  //   this.setState({
  //     infos :all,
  //     profile: all.profile,
  //     image: all.profile.mugshot
  //   });
  //   console.log(all);
  // }

  componentDidMount() {
    this.getInfo();
    // this.fetchData();
  }

  Education() {
    return this.state.infos.education.map(function(educ, i) {
      return (
        <View key={i} style={{marginBottom: 15}}>
          <Text style={[styles.subText, {fontSize: 14, marginHorizontal: 10}]}>
            Paris University
          </Text>
          <Text style={[styles.textSegond, styles.cvContentHeader]}>
            {educ.title}
          </Text>
          <Text style={[styles.textSegond, styles.cvContent]}>{educ.content}</Text>
        </View>
      );
    });
  }
  Experience() {
    return this.state.infos.experience.map(function(exp, i) {
      return (
        <View key={i} style={{marginBottom: 15}}>
          <Text style={[styles.textSegond, styles.cvContentHeader]}>{exp.titre}</Text>
          <Text style={[styles.textSegond, styles.cvContent]}>{exp.content}</Text>
        </View>
      );
    });
  }

  renderSection() {
    if (this.state.activeIndex == 0) {
      return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {this.renderSectionOne()}
        </View>
      );
    } else if (this.state.activeIndex == 1) {
      return (
        <View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: width / 3 + 30, height: 'auto'}}>
              <View style={{marginBottom: 15}}>
                <Text style={[styles.text, styles.cvTitle]}>Contact me</Text>
                <Text style={[styles.textSegond, styles.cvContent]}>Mobile</Text>
                <Text style={[styles.textThird, styles.cvContent]}>
                  +33753336721
                </Text>
                <Text style={[styles.textSegond, styles.cvContent]}>Email</Text>
                <Text
                  onPress={() => Linking.openURL('mailto:monadresse@yahoo.fr')}
                  style={[styles.textThird, styles.cvContent, {color: '#006680'}]}>
                  monadresse@yahoo.fr
                </Text>
                <Text style={[styles.textSegond, styles.cvContent]}>Adresse</Text>
                <Text style={[styles.textThird, styles.cvContent]}>
                  Paris, France
                </Text>
              </View>
            </View>
            <View style={{width: width / 3 + width / 3 - 30, height: 'auto'}}>
              <View>
                <Text style={[styles.text, styles.cvTitle]}>Skills</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#ffa31a',
                      color: '#fff',
                      borderRadius: 13,
                      paddingVertical: 1,
                      paddingHorizontal: 7,
                    }}>
                    Python
                  </Text>
                  <Text> </Text>
                  <Text
                    style={{
                      backgroundColor: '#ffa31a',
                      color: '#fff',
                      borderRadius: 13,
                      paddingVertical: 1,
                      paddingHorizontal: 7,
                    }}>
                    Vue
                  </Text>
                  <Text> </Text>
                  <Text
                    style={{
                      backgroundColor: '#ffa31a',
                      color: '#fff',
                      borderRadius: 13,
                      paddingVertical: 1,
                      paddingHorizontal: 7,
                    }}>
                    PHP
                  </Text>
                </View>
              </View>
              <View>
                <Text style={[styles.text, styles.cvTitle]}>Languages</Text>
                <Text style={[styles.textSegond, styles.cvContent]}>
                  Anglais, Français, Chinois
                </Text>
              </View>
              <View style={{marginBottom: 15}}>
                <Text style={[styles.text, styles.cvTitle]}>Interests</Text>
                <Text style={[styles.textSegond, styles.cvContent]}>
                  Politics, Tech, Innovation, Sport
                </Text>
              </View>
            </View>
          </View>
          {/*-------------------------------------- EDUCATION ------------------------------------*/}
          <View style={{width: width, marginBottom: 30}}>
            <View>
              <View>
                <Text style={[styles.text, styles.cvTitle]}>Education</Text>
                <View style={styles.cvUnderline}></View>
                {this.Education()}
              </View>
              {/* -----------------------------------EXPERIENCE-------------------------------------- */}
              <View style={{marginBottom: 15}}>
                <Text style={[styles.text, styles.cvTitle]}>Experiences</Text>
                <View style={styles.cvUnderline}></View>
                {this.Experience()}
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  render() {
    const shadowOpt = {
      width: 120,
      height: 120,
      color: '#ff9900',
      border: 2,
      radius: 60,
      opacity: 0.7,
      x: 0,
      y: 3,
      style: {marginVertical: 5},
    };
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#ff9000', '#ffe450']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.screenHeader}>
        </LinearGradient>
          <View style={{alignSelf: 'center', marginTop: -83}}>
            <BoxShadow setting={shadowOpt}>
              <View style={styles.profileImage}>
                <Image
                  source={{
                    uri:
                      'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
                  }}
                  style={styles.image}
                  resizeMode="center"
                />
              </View>
            </BoxShadow>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, {fontWeight: '200', fontSize: 26}]}>
              {this.state.profile.get_full_name_or_username}{' '}
              {this.state.profile.age}
            </Text>
            <Text
              style={[
                styles.textSegond,
                {color: '#AEB5BC', fontSize: 16, marginBottom: 7},
              ]}>
              {this.state.profile.about_me}
            </Text>
            <TouchableOpacity
              style={styles.followbutton}
              onPress={() =>
                this.props.navigation.navigate('EditProfile', {
                  first_name: this.state.infos.first_name,
                  last_name: this.state.infos.last_name,
                  username: this.state.infos.username,
                  about_me: this.state.profile.about_me,
                  location: this.state.profile.location,
                  mugshot: this.state.profile.mugshot,
                  id: this.state.profile.id,
                })
              }>
              <Text style={[styles.text]}>Edit profile</Text>
            </TouchableOpacity>
            <Text
              style={[
                styles.textSegond,
                {
                  color: '#333333',
                  fontSize: 15,
                  marginHorizontal: 17,
                  textAlign: 'center',
                },
              ]}>
              {this.state.overview.content}
            </Text>

            <Text
              style={{color: '#006680', marginVertical: 7}}
              onPress={() => Linking.openURL('http://google.com')}>
              {this.state.profile.website}
            </Text>

            <View style={styles.stars}>
              <Ionicon name="ios-star" size={18} color="#ffc61a"></Ionicon>
              <Ionicon name="ios-star" size={18} color="#ffc61a"></Ionicon>
              <Ionicon name="ios-star" size={18} color="#ffc61a"></Ionicon>
              <Ionicon name="ios-star" size={18} color="#ffc61a"></Ionicon>
              <Ionicon name="ios-star-half" size={18} color="#ffc61a"></Ionicon>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.textSegond, {fontSize: 18, fontWeight: '900'}]}>
                48
              </Text>
              <Text style={[styles.text, styles.subText]}>Activities</Text>
            </View>
            <View
              style={[
                styles.statsBox,
                {
                  borderColor: '#DFD8C8',
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                },
              ]}>
              <Text style={[styles.textSegond, {fontSize: 18, fontWeight: '900'}]}>
                {this.state.profile.get_number_of_followers}
              </Text>
              <Text style={[styles.text, styles.subText]}>Followers</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.textSegond, {fontSize: 18, fontWeight: '900'}]}>
                {this.state.profile.get_number_of_following}
              </Text>
              <Text style={[styles.text, styles.subText]}>Following</Text>
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <View style={styles.segment}>
              <Button
                onPress={() => this.segmentClicked(0)}
                transparent
                active={this.state.activeIndex == 0}>
                <Ionicon
                  size={23}
                  name="md-grid"
                  style={[
                    this.state.activeIndex == 0
                      ? styles.activeSegment
                      : styles.inactiveSegment,
                  ]}></Ionicon>
              </Button>
              <Button
                onPress={() => this.segmentClicked(1)}
                transparent
                active={this.state.activeIndex == 1}>
                <Ionicon
                  size={25}
                  name="md-information-circle"
                  style={[
                    this.state.activeIndex == 1
                      ? styles.activeSegment
                      : styles.inactiveSegment,
                  ]}></Ionicon>
              </Button>
              <Button
                onPress={() => this.segmentClicked(2)}
                transparent
                active={this.state.activeIndex == 2}>
                <Ionicon
                  size={24}
                  name="logo-github"
                  style={[
                    this.state.activeIndex == 2
                      ? styles.activeSegment
                      : styles.inactiveSegment,
                  ]}></Ionicon>
              </Button>
            </View>

            {this.renderSection()}
          </View>
        </ScrollView>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: '#5067FF'}}
          position="bottomRight"
          onPress={() => this.setState({active: !this.state.active})}>
          <Icon name="share" />
          <Button style={{backgroundColor: '#dd5144'}}>
            <Icon name="logo-youtube" />
          </Button>
          <Button style={{backgroundColor: '#dd2a7b'}}>
            <Icon name="logo-instagram" />
          </Button>
          <Button disabled style={{backgroundColor: '#ff8005'}}>
            <Icon name="mail" />
          </Button>
        </Fab>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    marginTop: 10,
    width: 120,
    height: 120,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: '#fff',
  },
  screenHeader: {
    width: width,
    height: height / 4,
    backgroundColor: '#ffe450',
    // opacity: 0.6,
    borderRadius: 35,
    marginTop: -49,
    marginBottom: 10,
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 17,
  },
  stars: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  followbutton: {
    width: width / 1.5,
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth + StyleSheet.hairlineWidth,
    borderColor: '#f2f2f2',
    paddingHorizontal: 13,
    paddingVertical: 5,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  circledButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    position: 'absolute',
    right: 5,
    bottom: 15,
  },
  tabView: {
    flex: 1,
    padding: 10,
  },
  segment: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth + StyleSheet.hairlineWidth,
    borderTopColor: '#f2f2f2',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: StyleSheet.hairlineWidth + StyleSheet.hairlineWidth,
    padding: 7,
  },
  activeSegment: {
    color: 'orange',
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
  },
  inactiveSegment: {
    color: 'gray',
  },
  cvUnderline: {
    width: 40,
    marginBottom: 10,
    marginTop: -6,
    marginLeft: 10,
    borderTopWidth: 2,
    borderTopColor: '#006680',
  },
  cvTitle: {
    marginVertical: 7,
    marginLeft: 10,
    color: 'orange',
    fontSize: 17,
    color: '#333333',
  },
  cvContent: {
    marginHorizontal: 10,
    color: '#666666',
  },
  cvContentHeader: {
    color: '#333333',
    fontSize: 15,
    marginHorizontal: 10,
  },
});

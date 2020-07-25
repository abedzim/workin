import React, {Component} from 'react';
import {
  View,
  Image,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  Text,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Picker,
} from 'react-native';
import PhotoUpload from 'react-native-photo-upload';
import ImagePicker from 'react-native-image-picker';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicon from 'react-native-vector-icons/Ionicons';

import website_url from '../../config';

var {height, width} = Dimensions.get('window');

class MyTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Text
        style={[
          {
            fontWeight: '200',
            fontSize: 16,
            alignSelf: 'center',
            textAlign: 'center',
            flexGrow: 1,
            fontFamily: 'Spectral-Regular',
            color: '#262626',
          },
        ]}>
        @abed <Octicons name="verified" size={14} color="#4db8ff"></Octicons>
      </Text>
    );
  }
}

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    const {navigate} = this.props.navigation;
    this.state = {
      countries: [{name: 'Belgium', name: 'France', name: 'Italia'}],
      first_name: this.props.navigation.state.params.first_name, //.first_name,
      //   last_name: this.props.navigation.getParam.infos.last_name,
      last_name: this.props.navigation.state.params.last_name, //.about_me,
      //   image: this.props.navigation.getParam.image,
      about_me: this.props.navigation.state.params.about_me,
      location: this.props.navigation.state.params.location,
      mugshot: this.props.navigation.state.params.mugshot,
      user_id: this.props.navigation.state.params.id,
      //   error: '',
      //   loading: false,
    };
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: <MyTitle />,
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
    },
    headerLeft: (
      <TouchableOpacity style={{paddingHorizontal: 12}}>
        <Ionicon
          onPress={() => {
            navigation.goBack();
          }}
          name="ios-arrow-back"
          size={24}
          color="#52575D"></Ionicon>
      </TouchableOpacity>
    ),
    headerRight: <Text>{''}</Text>,
  });

  async updateProfile() {
    var url = website_url + 'api/profile/' + this.state.user_id + '/';

    const file = {
      uri: this.state.mugshot,
      name:
        Math.random()
          .toString(36)
          .substring(2) + '.jpg',
      type: 'image/jpg',
    };
    const data = new FormData();
    const token = await AsyncStorage.getItem('res');
    const tokens = JSON.parse(token);
    console.log(token);

    if (this.props.navigation.state.params.mugshot != this.state.mugshot) {
      data.append('mugshot', file);
    }
    data.append('first_name', this.state.first_name);
    data.append('last_name', this.state.last_name);
    data.append('about_me', this.state.about_me);
    data.append('location', this.state.location);
    this.setState({
      loading: true,
    });
    await fetch(url, {
      method: 'PUT',
      body: data,
      headers: {
        Accept: 'application/json',
        'content-Type':
          'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
        Authorization: 'Token ' + tokens,
      },
    }).then(res => {
      this.setState({
        loading: false,
      });
      this.props.navigation.push('Profile');
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        onStartShouldSetResponder={e => true}
        onResponderRelease={e => Keyboard.dismiss()}
        style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView>
            <View style={styles.container}>
              <View style={{backgroundColor: '#f7f7f7', paddingVertical: 30}}>
                <PhotoUpload
                  onResponse={response => {
                    let url = response.uri.split('//')[1];
                    this.setState({mugshot: url});
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      marginVertical: 10,
                      height: 120,
                      width: 120,
                      borderRadius: 100,
                    }}
                    source={{
                      uri:
                        'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
                    }}
                  />
                </PhotoUpload>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  borderBottomColor: '#f2f2f2',
                  borderBottomWidth: 1 / 3,
                  marginTop: 12,
                }}>
                <Text style={{width: width / 3}}>First name</Text>
                <TextInput
                  style={{
                    marginTop: -13.5,
                    width: width / 1.6,
                    fontFamily: 'Spectral-Regular',
                    color: 'blue',
                  }}
                  onChangeText={first_name =>
                    this.setState({first_name: first_name})
                  }
                  textAlign={'right'}
                  Type="form"
                  defaultValue={this.state.first_name}
                  placeholder="First Name"
                  placeholderTextColor= '#fff'
                  autoCorrect={false}
                  autoCapitalize="words"
                  blurOnSubmit={true}
                  keyboardAppearance="default"></TextInput>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  borderBottomColor: '#f2f2f2',
                  borderBottomWidth: 1 / 3,
                  marginTop: 13,
                }}>
                <Text style={{width: width / 3}}>Last name</Text>
                <TextInput
                  style={{
                    marginTop: -13.5,
                    width: width / 1.6,
                    fontFamily: 'Spectral-Regular',
                  }}
                  onChangeText={last_name =>
                    this.setState({last_name: last_name})
                  }
                  textAlign={'right'}
                  placeholderTextColor="#9a73ef"
                  Type="form"
                  placeholder="Last Name"
                  defaultValue={this.state.last_name}
                  autoCorrect={false}
                  autoCapitalize="words"
                  blurOnSubmit={true}
                  keyboardAppearance="default"></TextInput>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  borderBottomColor: '#f2f2f2',
                  borderBottomWidth: 1 / 3,
                  marginTop: 13,
                }}>
                <Text style={{width: width / 3}}>You are</Text>
                <TextInput
                  style={{
                    marginTop: -13.5,
                    width: width / 1.6,
                    fontFamily: 'Spectral-Regular',
                  }}
                  onChangeText={about_me => this.setState({about_me: about_me})}
                  textAlign={'right'}
                  Type="form"
                  placeholder="About Me"
                  defaultValue={this.state.about_me}
                  autoCorrect={false}
                  autoCapitalize="none"
                  blurOnSubmit={true}
                  multiline={true}
                  keyboardAppearance="default"></TextInput>
              </View>

              {/* <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  marginTop: 13,
                }}>
                <Text style={{width: width / 3}}>Location</Text>
                {
                  <Picker
                    style={{marginTop: -13.5, width: width / 1.6, textAlign: 'right'}}
                    itemStyle={{textAlign: 'right'}}
                    selectedValue={this.state.location}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({selectedValue: itemValue})
                    }>
                    {this.state.countries.map((item, key) => (
                      <Picker.Item
                        label={item.name}
                        value={item.name}
                        key={key}
                      />
                    ))}
                  </Picker>
                }
              </View> */}

              <TouchableOpacity
                onPress={this.updateProfile.bind(this)}
                style={{
                  marginHorizontal: 30,
                  marginTop: 30,
                  backgroundColor: '#ffa31a',
                  borderRadius: 25,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  text: {
    fontFamily: 'Spectral-Regular',
    color: '#262626',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {},
  save: {
    marginVertical: 9,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
  },

  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'cover',
    marginBottom: 10,
    height: 150,
    width: 150,
    borderRadius: 75,
  },
}));

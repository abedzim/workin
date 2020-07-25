import React, {Component} from 'react';

import {
  View,
  Keyboard,
  TouchableOpacity,
  Text,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  TextInput,
  StatusBar,
  LayoutAnimation,
  Image,
} from 'react-native';

// import {RkButton, RkText, RkTextInput } from 'react-native-ui-kitten';

import website_url from '../../config';

// import { scaleModerate, scaleVertical } from '../utils/scale';

const ACCESS_TOKEN = 'access_token';
const ACCOUNT = 'my_id';

export default class LogIn extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      identification: '',
      password: '',
      error: '',
      loading: false,
    };
  }

  async storeToken(accessToken, account) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      await AsyncStorage.setItem(ACCOUNT, account);
    } catch (e) {
      console.log('something goes wrong at storeToken()!' + e);
    }
  }

  async login() {
    // global.tracker.trackScreenView("LogIn")
    this.setState({loading: true});
    var url = website_url + 'api/signin/';
    let data = {
      method: 'POST',
      body: JSON.stringify({
        identification: this.state.identification,
        password: this.state.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      response = await fetch(url, data);
      if (response.status >= 200 && response.status <= 300) {
        let res = await response.json();
        this.props.navigation.navigate('Apps');
        // this.setState({ error: '', loading: false })
        this.storeToken(res.token, res.user.id.toString());
        const mine = JSON.stringify(res.token);
        const user = JSON.stringify(res.user.id);
        await AsyncStorage.setItem('res', mine);
        await AsyncStorage.setItem('my_id', user);
        Keyboard.dismiss();
        console.log(res);
        console.log(mine)
      } else {
        let res = await response.json();
        this.setState({loading: true});
        throw res;
      }
    } catch (e) {
      this.setState({error: e, loading: false});
      alert('error: ' + e.message);
    }
  }

  // _renderImage(image) {
  //   let contentHeight = scaleModerate(375, 1);

  //   let height = Dimensions.get('window').height - contentHeight;
  //   let width = Dimensions.get('window').width;

  //   image = (<Image style={[styles.image, { height, width }]}
  //     source={require('../img/mon-logo.png')} />);

  //   return image;
  // }

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Image
          source={require('../data/images/authHeader1.png')}
          style={{marginTop: -176, marginLeft: -50}}></Image>
        <Image
          source={require('../data/images/authFooter.png')}
          style={{position: 'absolute', bottom: -325, right: -225}}></Image>
        <Image
          source={require('../data/images/mon-logo-2.png')}
          style={{alignSelf: 'center', width: 82, height: 82}}></Image>
        {/* <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text> */}

        <View style={styles.errorMessage}>
          {/* {this.state.error && ( */}
          <Text style={styles.error}>{this.state.error}</Text>
          {/* )} */}
        </View>

        <View style={styles.form}>
          <View>
            {/* <Text style={styles.inputTitle}>Email or Username</Text> */}
            <TextInput
              placeholder="Email or Username"
              style={styles.input}
              autoCapitalize="none"
              onChangeText={identification => this.setState({identification})}
              value={this.state.identification}></TextInput>
          </View>

          <View style={{marginTop: 32}}>
            {/* <Text style={styles.inputTitle}>Password</Text> */}
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={password => this.setState({password})}
              value={this.state.password}></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.login.bind(this)}>
          <Text style={{color: '#FFF', fontWeight: '500'}}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignSelf: 'center', marginTop: 32}}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={{color: '#414959', fontSize: 13}}>
            New to SocialApp?{' '}
            <Text style={{fontWeight: '500', color: '#ffa31a'}}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: -32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  form: {
    marginBottom: 48,
    marginTop: -15,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
    paddingHorizontal: 15,
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#ffa31a',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#ffa31a',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});

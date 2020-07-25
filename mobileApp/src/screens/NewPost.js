import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import {
  buttonStyle,
  buttonTextStyle,
  inputStyle,
  formContainerStyle,
} from '../styles/forms';
import {iconStyle, textStyle, subHeaderStyle} from '../styles/styles';
import Header from '../components/Header';
import axios from 'axios';
import website_url from '../../config';

const createSubHeaderStyle = Object.assign({}, subHeaderStyle, {marginTop: 0});

let index = 0;

const movements = [
  {key: index++, section: true, label: 'Movement Types'},
  {key: index++, label: 'Cardio'},
  {key: index++, label: 'Conditioning'},
  {key: index++, label: 'Core'},
  {key: index++, label: 'Full Body'},
  {key: index++, label: 'Lower Body'},
  {key: index++, label: 'Upper Body'},
];

const difficulties = [
  {key: index++, section: true, label: 'Difficulty'},
  {key: index++, label: 'Novice'},
  {key: index++, label: 'Intermediate'},
  {key: index++, label: 'Advanced'},
];

export default class CreateScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Add',
    tabBarIcon: ({tintColor}) => (
      <IIcon name="md-add-circle" color={tintColor} style={iconStyle} />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      image : this.props.image,
      loading: false,
    };
  }

  // _handleSubmit() {
  //   let newMovement = {
  //     "content": this.state.content,
  //   }
  //   axios.post('http://10.0.2.2:8000/api/posts/', newMovement)
  //   .then(res => {
  //     alert('Saved!');
  //     this.setState({
  //       content: '',
  //     });
  //   })
  //   .catch(error => {
  //     alert('Uh oh, looks like your internet went out :(');
  //  });
  // }

  async upload(url){
    var send_url = website_url + 'api/posts/'
    const token = await AsyncStorage.getItem('res');
    const tokens = JSON.parse(token);
     const file = {
         uri: url,
         name : Math.random().toString(36).substring(2) + '.jpg',
         type: 'image/jpg'
     }

     const data = new FormData()
     data.append('image', file)
     data.append('content', this.state.content)
     this.setState({
        loading:true
     })
     await fetch(send_url, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
        'Authorization': 'Token ' + tokens,
      },
    }).then(res => {
      this.setState({
        loading:false
     })
     this.props.navigation.push();
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header title="QuickFit" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={formContainerStyle}>
              <Text style={createSubHeaderStyle}>ADD MOVEMENT</Text>
              <TextInput
                id="movementName"
                style={inputStyle}
                placeholder="Name"
                onChangeText={content => this.setState({content})}
                value={this.state.content}
              />
              <TouchableOpacity
                style={Object.assign({}, buttonStyle, {
                  marginTop: 10,
                  marginBottom: 10,
                })}
                onPress={() => this.upload(this.state.image)}>
                <Text style={buttonTextStyle}>New Exercise</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

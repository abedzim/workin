import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  mode = new Animated.Value(0);
  buttonSize = new Animated.Value(1);

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue: 0.95,
        duration: 300,
      }),
      Animated.timing(this.buttonSize, {
        toValue: 1,
      }),
      Animated.timing(this.mode, {
        toValue: this.mode._value === 0 ? 1 : 0,
      }),
    ]).start();
  };

  render() {
    const thermometerX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, -100],
    });

    const thermometerY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -100],
    });

    const timeX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, -24],
    });

    const timeY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -150],
    });

    const pulseX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, 50],
    });

    const pulseY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -100],
    });

    const rotation = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg'],
    });

    const sizeStyle = {
      transform: [{scale: this.buttonSize}],
    };

    return (
      <View style={{position: 'absolute', alignItems: 'center'}}>
        <Animated.View
          style={{position: 'absolute', left: thermometerX, top: thermometerY}}>
          <View
            style={styles.secondaryButton}
            onPress={() => this.props.navigation.navigate('JobsBoard')}>
            <TouchableOpacity>
              <Feather
                onPress={() => this.props.navigation.navigate('JobsBoard')}
                name="thermometer"
                size={24}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View style={{position: 'absolute', left: timeX, top: timeY}}>
          <View style={styles.secondaryButton}>
            <Feather name="clock" size={24} color="#FFF" />
          </View>
        </Animated.View>
        <Animated.View
          style={{position: 'absolute', left: pulseX, top: pulseY}}>
          <View style={styles.secondaryButton}>
            <Feather name="activity" size={24} color="#FFF" />
          </View>
        </Animated.View>
        <Animated.View
          style={[styles.button, sizeStyle]}
          onPress={this.handlePress}>
          <TouchableHighlight
            onPress={this.handlePress}
            underlayColor="#ff9000">
            {/* <Animated.View style={{transform: [{rotate: rotation}]}}> */}
            <Animated.View>
              {/* <FontAwesome5 name="plus" size={24} color="#FFF" /> */}
              <Image
                source={require('../data/images/mon-logo-4.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              {/* <Ionicon onPress={this.handlePress} size={30} name="md-grid" color="#fff"></Ionicon> */}
            </Animated.View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    borderRadius: 36,
    backgroundColor: '#ff9000',
    position: 'absolute',
    marginTop: -50,
    shadowColor: '#ff9000',
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  secondaryButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffe745',
  },
});

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
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import {BoxShadow} from 'react-native-shadow';

const {width, height} = Dimensions.get('screen');

export default class TripsContainer extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: '#ffad33',
    },
    headerLeft: (
      <TouchableOpacity style={{paddingHorizontal: 12, marginLeft: 12}}>
        <Ionicon
          onPress={() => {
            navigation.goBack();
          }}
          name="ios-arrow-back"
          size={24}
          color="#fff"></Ionicon>
      </TouchableOpacity>
    ),
    headerRight: null,
  });
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={{top: 0}}>
          <View style={styles.header}></View>
          <View
            style={{
              borderRadius: 16,
              elevation: 1,
              marginTop: -95,
              marginHorizontal: 25,
              padding: 10,
              backgroundColor: '#fff',
            }}>
            <View style={{margin: 5, flexDirection: 'row'}}>
              <View style={{margin: 4}}>
                <Text style={{fontSize: 18, color: '#333333'}}>
                  Backend Developer
                </Text>
                <Text
                  style={{fontSize: 15, color: '#666666', marginBottom: 10}}>
                  Facebook France
                </Text>
                <Text style={{fontSize: 14, color: '#bfbfbf'}}>
                  Nice, France
                </Text>
                <Text
                  style={{fontSize: 11, color: '#cccccc', marginBottom: 15}}>
                  Posted 2 days ago - 13 applications
                </Text>
                <LinearGradient
                  colors={['#ffad33', '#ff8533']}
                  style={{
                    padding: 7,
                    borderRadius: 45,
                    alignItems: 'center',
                    alignContent: 'center',
                  }}>
                  <TouchableOpacity
                    style={{height: undefined, width: undefined}}>
                    <Text style={{color: '#fff'}}>Apply for this job</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: '#f2f2f2',
                  width: 47,
                  height: 47,
                  borderRadius: 100,
                  margin: 7,
                  position: 'absolute',
                  right: 0,
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
            </View>
          </View>
        </View>

        <ScrollView>
          <View style={{marginTop: 30, marginHorizontal: 35}}>
            <Text style={{color: '#333333', fontSize: 17}}>
              Job Description
            </Text>
            <View
              style={{flexDirection: 'row', marginVertical: 7, marginTop: 15}}>
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
            <View style={{marginTop: 10}}>
              <Text style={{color: '#666666', fontSize: 15}}>Responsibilities</Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={{fontSize: 30, marginTop: -20, marginRight: 4}}>
                  .
                </Text>
                <Text style={{color: '#777777'}}>
                  Hoc inmaturo interitu ipse quoque sui pertaesus excessit e
                  vita aetatis nono anno atque vicensimo cum quadriennio
                  imperasset. natus apud Tuscos in Massa
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{fontSize: 30, marginTop: -20, marginRight: 4}}>
                  .
                </Text>
                <Text style={{color: '#777777'}}>
                  Hoc inmaturo interitu ipse quoque sui pertaesus excessit e
                  vita aetatis nono
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{fontSize: 30, marginTop: -20, marginRight: 4}}>
                  .
                </Text>
                <Text style={{color: '#777777'}}>
                  Hoc inmaturo interitu ipse quoque sui pertaesus excessit e
                  vita aetatis nono anno atque vicensimo cum quadriennio
                  imperasset. natus apud Tuscos in Massa
                </Text>
              </View>
            </View>

            <View style={{marginTop: 10}}>
              <Text style={{color: '#666666', fontSize: 15}}>Benefits</Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={{fontSize: 30, marginTop: -20, marginRight: 4}}>
                  .
                </Text>
                <Text style={{color: '#777777'}}>
                  Hoc inmaturo interitu ipse quoque sui pertaesus excessit e
                  vita aetatis nono anno atque vicensimo cum quadriennio
                  imperasset. natus apud Tuscos in Massa
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{fontSize: 30, marginTop: -20, marginRight: 4}}>
                  .
                </Text>
                <Text style={{color: '#777777'}}>
                  Hoc inmaturo interitu ipse quoque sui pertaesus excessit e
                  vita aetatis nono
                </Text>
              </View>
            </View>

            <View style={{marginTop: 10}}>
              <Text style={{color: '#666666', fontSize: 15}}>Qualities</Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={{fontSize: 30, marginTop: -20, marginRight: 4}}>.</Text>
                <Text style={{color: '#777777'}}>
                  Hoc inmaturo interitu ipse quoque sui pertaesus excessit e
                  vita aetatis nono anno atque vicensimo cum quadriennio
                  imperasset. natus apud Tuscos in Massa
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{fontSize: 30, marginTop: -20, marginRight: 4}}>.</Text>
                <Text style={{color: '#777777'}}>
                  Hoc inmaturo interitu ipse quoque sui pertaesus excessit e
                  vita aetatis nono
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{fontSize: 30, marginTop: -20, marginRight: 4}}>.</Text>
                <Text style={{color: '#777777'}}>
                  Hoc inmaturo interitu ipse quoque sui pertaesus excessit e
                  vita aetatis nono anno atque vicensimo cum quadriennio
                  imperasset. natus apud Tuscos in Massa
                </Text>
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffad33',
    borderRadius: 40,
    height: height / 5,
    marginTop: -60,
  },
});

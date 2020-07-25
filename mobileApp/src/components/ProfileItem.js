import React, { Component } from "react";
import styles from "../styles/styles";

import { Text, View, Image, TouchableOpacity } from "react-native";

// import config from '../config'
import Demo from "../data/demo.js";
import Icon from 'react-native-vector-icons/Ionicons'


class ProfileItem extends Component {
	static navigationOptions = {
		title: 'Home',
	  };
	constructor() {
		super();
		this.state = {
			liked: false,
		}
	}
	likeToggle() {
		this.setState({
			liked: !this.state.liked
		})
	}
	render() {
		const heartIconColor = (this.state.liked) ? '#ff5050' : null;
		const {
			age,
			info1,
			info2,
			info3,
			info4,
			location,
			matches,
			name
		} = Demo[7];
		return (
			<View style={styles.containerProfileItem}>

				<Text style={styles.name}>{name}, {age}</Text>

				{/* <Text style={styles.descriptionProfileItem}>
						{age} - {location}
					</Text> */}

				<View style={styles.followInfos}>
					<View style={styles.followNumbers}>
						<Text style={{ marginHorizontal: 20 }}>Followers</Text>
						<Text style={styles.followNbrs}>718k</Text>
					</View>
					<View style={styles.followNumbers}>
						<Text style={{ marginHorizontal: 20 }}>Following</Text>
						<Text style={styles.followNbrs}>302</Text>
					</View>
				</View>

				{/* <View style={styles.info}>
					<Text style={styles.iconProfile}>
						<Image style={{ width: 15, height: 15 }} source={config.images.userIcon} />
					</Text>
					<Text style={styles.infoContent}>{info1}</Text>
				</View> */}

				<View style={styles.info}>
					<Text style={styles.iconProfile}>
						<Icon name="ios-school" size={15} color="blue" />
					</Text>
					<Text style={styles.infoContent}>{info2}</Text>
				</View>

				<View style={styles.info}>
					<Text style={styles.iconProfile}>
						<Icon name="ios-briefcase" size={15} color="#b36b00" />
					</Text>
					<Text style={styles.infoContent}>{info3}</Text>
				</View>

				<View style={styles.info}>
					<Text style={styles.iconProfile}>
						<Icon name="ios-pin" size={15} color="pink" />
					</Text>
					<Text style={styles.infoContent}>{info4}</Text>
				</View>

				<TouchableOpacity style={styles.circledButton}>
					<Icon name="ios-chatbubbles" size={20} color="orange" />
				</TouchableOpacity>
			</View>
		);
	};
}
export default ProfileItem;

import { StyleSheet, Dimensions } from "react-native";

const PRIMARY_COLOR = "#ff9012";
const SECONDARY_COLOR = "#5636B8";
const WHITE = "#FFFFFF";
const GRAY = "#757E90";
const DARK_GRAY = "#363636";
const BLACK = "#000000";

const ONLINE_STATUS = "#46A575";
const OFFLINE_STATUS = "#D04949";

const STAR_ACTIONS = "#FFA200";
const LIKE_ACTIONS = "#B644B2";
const DISLIKE_ACTIONS = "#363636";
const FLASH_ACTIONS = "#5028D7";

const ICON_FONT = "fontawesome";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
	// COMPONENT - CARD ITEM
	containerCardItem: {
		backgroundColor: WHITE,
		borderRadius: 8,
		alignItems: "center",
		margin: 10,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},
	matchesCardItem: {
		marginTop: -35,
		backgroundColor: PRIMARY_COLOR,
		paddingVertical: 7,
		paddingHorizontal: 20,
		borderRadius: 20
	},
	matchesTextCardItem: {
		fontFamily: ICON_FONT,
		color: WHITE
	},
	descriptionCardItem: {
		color: GRAY,
		textAlign: "center"
	},
	status: {
		paddingBottom: 10,
		flexDirection: "row",
		alignItems: "center"
	},
	statusText: {
		color: GRAY,
		fontSize: 12
	},
	online: {
		width: 6,
		height: 6,
		backgroundColor: ONLINE_STATUS,
		borderRadius: 3,
		marginRight: 4
	},
	offline: {
		width: 6,
		height: 6,
		backgroundColor: OFFLINE_STATUS,
		borderRadius: 3,
		marginRight: 4
	},
	actionsCardItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15
	},
	button: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: WHITE,
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
		shadowOpacity: 0.15,
		shadowRadius: 20,
		shadowColor: DARK_GRAY,
		shadowOffset: { height: 10, width: 0 }
	},
	miniButton: {
		width: 10,
		height: 10,
		borderRadius: 30,
		backgroundColor: WHITE,
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
		shadowOpacity: 0.15,
		shadowRadius: 20,
		shadowColor: DARK_GRAY,
		shadowOffset: { height: 10, width: 0 }
	},
	star: {
		fontFamily: ICON_FONT,
		color: STAR_ACTIONS
	},
	like: {
		fontSize: 25,
		color: LIKE_ACTIONS
	},
	dislike: {
		fontSize: 25,
		fontFamily: ICON_FONT,
		color: DISLIKE_ACTIONS
	},
	flash: {
		fontFamily: ICON_FONT,
		color: FLASH_ACTIONS
	},

	// COMPONENT - CITY
	city: {
		backgroundColor: WHITE,
		paddingVertical: 7,
		paddingHorizontal: 20,
		borderRadius: 20,
		shadowOpacity: 0.05,
		elevation :0.3,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},
	cityText: {
		fontFamily: ICON_FONT,
		color: DARK_GRAY,
		fontSize: 13
	},

	// COMPONENT - FILTERS
	filters: {
		backgroundColor: WHITE,
		paddingVertical: 7,
		paddingHorizontal: 20,
		borderRadius: 20,
		shadowOpacity: 0.05,
		elevation :0.3,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},
	filtersText: {
		fontFamily: ICON_FONT,
		color: DARK_GRAY,
		fontSize: 13
	},

	// COMPONENT - MESSAGE
	containerMessage: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
		paddingHorizontal: 10,
		width: DIMENSION_WIDTH - 100
	},
	avatar: {
		borderRadius: 30,
		width: 60,
		height: 60,
		marginRight: 20,
		marginVertical: 15
	},
	message: {
		color: GRAY,
		fontSize: 12,
		paddingTop: 5
	},

	// COMPONENT - PROFILE ITEM
	containerProfileItem: {
		backgroundColor: WHITE,
		paddingHorizontal: 10,
		paddingBottom: 25,
		margin: 20,
		borderRadius: 8,
		marginTop: -35,
		elevation: 7,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},
	matchesProfileItem: {
		marginTop: -25,
		backgroundColor: PRIMARY_COLOR,
		paddingVertical: 7,
		paddingHorizontal: 20,
		borderRadius: 20,
		alignSelf: "center"
	},
	matchesTextProfileItem: {
		fontFamily: ICON_FONT,
		color: WHITE,
		fontSize: 17
	},
	name: {
		paddingTop: 15,
		paddingBottom: 5,
		color: DARK_GRAY,
		fontSize: 20,
		textAlign: "center",
		fontFamily: "Sarpanch-Bold"
	},
	descriptionProfileItem: {
		color: GRAY,
		textAlign: "center",
		paddingBottom: 5,
		fontSize: 13
	},
	info: {
		paddingVertical: 4,
		flexDirection: "row",
		alignItems: "center"
	},
	followInfos: {
        width: 100 + '%',
        height: 50,
        backgroundColor: '#fff',
        // borderColor: '#ffaa00',
        // borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 5,
        flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	followNumbers: {
		flexDirection: 'column',
	},
	followNbrs: {
		color: GRAY,
		textAlign: "center",
		paddingBottom: 5,
		fontSize: 13
	},
	iconProfile: {
		paddingHorizontal: 10,
		paddingVertical: 7,
		marginTop: -2
	},
	infoContent: {
		color: GRAY,
		fontSize: 13,
		fontWeight: '700'
	},

	// CONTAINER - GENERAL
	bg: {
		flex: 1,
		resizeMode: "cover",
		width: DIMENSION_WIDTH,
		height: DIMENSION_HEIGHT,
	},
	top: {
		paddingTop: 10,
		marginHorizontal: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 40
	},
	title: { paddingBottom: 10, fontSize: 22, color: DARK_GRAY },
	icon: {
		fontFamily: ICON_FONT,
		fontSize: 20,
		color: DARK_GRAY,
		paddingRight: 10
	},

	// CONTAINER - HOME
	containerHome: {
		marginHorizontal: 10,
	},
	card: {
		paddingLeft: 0,
		paddingRight: 0,
		paddingTop: 10,
		paddingBottom: 10
	},

	// CONTAINER - MATCHES
	containerMatches: {
		justifyContent: "space-between",
		flex: 1,
		paddingHorizontal: 10
	},

	// CONTAINER - MESSAGES
	containerMessages: {
		justifyContent: "space-between",
		flex: 1,
		paddingHorizontal: 10
	},

	// CONTAINER - PROFILE
	containerProfile: { marginHorizontal: 0 },
	photo: {
		width: DIMENSION_WIDTH,
		height: 400,
	},
	topIconLeft: {
		paddingLeft: 5,
		flex: 1
		// transform: [{ rotate: "90deg" }]
	},
	topIconRight: {
		paddingRight: 5,
		flex: 1
	},
	actionsProfile: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center"
	},
	iconButton: {
		alignItems: "center",
		justifyContent: "center",
		width: 25,
		height: 25,
	},
	textButton: {
		fontFamily: ICON_FONT,
		fontSize: 15,
		color: WHITE,
		paddingLeft: 5
	},
	circledButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#fff',
		elevation: 10,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
		position: 'absolute', 
		right: 5,
		bottom: 15
	},
	roundedButton: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		backgroundColor: SECONDARY_COLOR,
		paddingHorizontal: 20
	},

	// MENU
	tabButton: {
		paddingTop: 20,
		paddingBottom: 30,
		alignItems: "center",
		justifyContent: "center",
		flex: 1
	},
	tabButtonText: {
		textTransform: "uppercase"
	},
	iconMenu: {
		fontFamily: ICON_FONT,
		height: 20,
		paddingBottom: 7,
		alignContent: 'center'

	}
});

 
import React from "react";
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import LoggedOut from '../screens/LoggedOut';
import LogIn from '../screens/LogIn';
import ForgotPassword from '../screens/ForgotPassword';
import CreateList from '../screens/CreateList';
import JobsBoard from '../screens/JobsBoard';
import TurnOnNotifications from '../screens/TurnOnNotifications';
import Register from '../screens/Register'
import EditProfile from '../screens/EditProfile';
import LoggedInTabNavigator from './LoggedInTabNavigator';
import Feather from 'react-native-vector-icons/Feather'
import SideBar from '../components/SideBar'
import InboxContainer from '../containers/InboxContainer';
import ProfileContainer from '../containers/ProfileContainer';
import SavedContainer from '../containers/SavedContainer';
import TripsContainer from '../containers/TripsContainer';
import { Dimensions } from "react-native";

const Explorer = createStackNavigator({
  LoggedIn: {
    screen: LoggedInTabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  // LogIn: { screen: LogIn },
  // Register: { screen: Register },
  // ForgotPassword: { screen: ForgotPassword },
  // TurnOnNotifications: { screen: TurnOnNotifications },
});

const Menu = createDrawerNavigator (
  {
    Profile: {
        screen: Explorer,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Feather name="user" size={16} color={tintColor} />
        }
    },
    Jobs: {
        screen: JobsBoard,
        navigationOptions: {
            title: "Messages",
            drawerIcon: ({ tintColor }) => <Feather name="message-square" size={16} color={tintColor} />
        }
    },
    Activity: {
        screen: InboxContainer,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Feather name="activity" size={16} color={tintColor} />
        }
    },
    List: {
        screen: SavedContainer,
        navigationOptions: {
            title: "Lists",
            drawerIcon: ({ tintColor }) => <Feather name="list" size={16} color={tintColor} />
        }
    },
    Report: {
        screen: TripsContainer,
        navigationOptions: {
            title: "Reports",
            drawerIcon: ({ tintColor }) => <Feather name="bar-chart" size={16} color={tintColor} />
        }
    }
},
{
    contentComponent: props => <SideBar {...props} />,

    drawerWidth: Dimensions.get("window").width * 0.85,
    hideStatusBar: false,

    contentOptions: {
        activeBackgroundColor: "rgba(212,118,207, 0.2)",
        activeTintColor: "#53115B",
        itemsContainerStyle: {
            marginTop: 16,
            marginHorizontal: 8
        },
        itemStyle: {
            borderRadius: 4
        }
    }
}
)

const Authenticate = createStackNavigator({
  LogIn: { screen: LogIn },
  Register: { screen: Register },
  ForgotPassword: { screen: ForgotPassword },
  TurnOnNotifications: { screen: TurnOnNotifications },
})


all =  createSwitchNavigator(
    {
      LoggedOut: { screen: LoggedOut },
      Apps: { screen: Menu},
      Auth: { screen: Authenticate },
      
    },
    {
      initialRouteName: 'LoggedOut',
    }
);
const AppRouteConfigs = createAppContainer(all);

export default AppRouteConfigs;
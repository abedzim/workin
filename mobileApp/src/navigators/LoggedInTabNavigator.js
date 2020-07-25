/**
 * Airbnb Clone App
 * @author: Andy
 * @Url: https://www.cubui.com
 */

import React from 'react';
import PropTypes from 'prop-types';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import ExploreContainer from '../containers/ExploreContainer';
import InboxContainer from '../containers/InboxContainer';
import ProfileContainer from '../containers/ProfileContainer';
import SavedContainer from '../containers/SavedContainer';
import TripsContainer from '../containers/TripsContainer';
import CreateList from '../screens/CreateList';
import JobDetail from '../screens/JobDetail';
import EditProfile from '../screens/EditProfile';
import Followers from '../screens/Followers';
import ProfileView from '../screens/ProfileView';
import NewPost from '../screens/NewPost';
import JobsBoard from '../screens/JobsBoard';
import colors from '../styles/colors';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';
import {Image} from 'react-native';
import WorkinButton from '../components/WorkinButton';

const Jobs = createStackNavigator({
  JobsBoard: {
    screen: JobsBoard
  },
  JobDetail: {
    screen: JobDetail,
  },
});

const ExploreTab = createStackNavigator(
  {
    ExploreContainer: {
      screen: ExploreContainer,
      // navigationOptions: {
      //   header: null,
      // },
    },
    CreateList: {
      screen: CreateList,
      // navigationOptions: {
      //   title: 'Profile',
      //   header: null //this will hide the header
      // },
    },
    ProfileView: {
      screen: ProfileView,
    },
    InboxContainer: {
      screen: InboxContainer,
    },
    JobDetail: {
      screen: JobDetail,
    },
    EditProfile: {
      screen: EditProfile,
    },
    Followers: {
      screen: Followers,
    },
    NewPost: {
      screen: NewPost,
    },
    Jobs: {
      screen: JobsBoard
    }
  },
  {
    mode: 'modal',
  },
);

const Search = createStackNavigator({
  SavedContainer: {
    screen: SavedContainer,
  },
  JobDetail: {
    screen: JobDetail,
  },
  CreateList: {
    screen: CreateList,
    // navigationOptions: {
    //   title: 'Profile',
    //   header: null //this will hide the header
    // },
  },
  Followers: {
    screen: Followers,
  },
});

const Profile = createStackNavigator({
  Profile: {
    screen: ProfileContainer,
  },
  EditProfile: {
    screen: EditProfile,
  },
  Followers: {
    screen: Followers,
  },
});

ExploreTab.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "Jobs") {
        tabBarVisible = false;
      } 
      else if (route.routeName === "JobDetail") {
        tabBarVisible = false;
      } 
      else if (route.routeName === "CreateList") {
        tabBarVisible = false;
      } 
      else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

const CustomTabBarIcon = (name, size) => {
  const icon = ({tintColor}) => (
    <Icon name={name} size={size} color={tintColor} />
  );

  icon.propTypes = {
    tintColor: PropTypes.string.isRequired,
  };

  return icon;
};

const LoggedInTabNavigator = createBottomTabNavigator(
  {
    Explore: {
      screen: ExploreTab,
      navigationOptions: {
        // tabBarLabel: 'EXPLORE',
        tabBarIcon: CustomTabBarIcon('home', 25),
      },
    },
    Saved: {
      screen: Search,
      navigationOptions: {
        // tabBarLabel: 'SAVED',
        tabBarIcon: CustomTabBarIcon('search1', 25),
      },
    },
    Trips: {
      // screen: TripsContainer,
      screen: () => null,
      // navigationOptions: {
      //   // tabBarLabel: 'TRIPS',
      //   tabBarIcon: ({ focused, horizontal, tintColor }) => {
      //     return (
      //       <Image
      //         source={
      //           focused
      //             ? require('../data/images/mon-logo-2.png')
      //             : require('../data/images/mon-logo-3.png')
      //         }
      //         style={{
      //           width: 30,
      //           height: 30,
      //         }}
      //       />
      //     );
      //   },
      // },
      navigationOptions: {
        tabBarIcon: <WorkinButton />,
      },
    },
    Inbox: {
      screen: InboxContainer,
      navigationOptions: {
        // tabBarLabel: 'INBOX',
        tabBarIcon: CustomTabBarIcon('bells', 25),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        // tabBarLabel: 'PROFILE',
        tabBarIcon: CustomTabBarIcon('user', 25),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: colors.orange,
      inactiveTintColor: '#a9a9a9',
      scrollEnabled: true,
    },
    tabBarPosition: 'bottom',
  },
);

export default LoggedInTabNavigator;

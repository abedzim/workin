/**
 * @format
 */

import {AppRegistry, StatusBar, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Warning: Async Storage has been extracted'
  ]);
StatusBar.setBarStyle('light-content', true);
AppRegistry.registerComponent(appName, () => App);

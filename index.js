import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import App from './src/App';
import { name as appName } from './app.json';

import player from './src/services/player'

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => player);

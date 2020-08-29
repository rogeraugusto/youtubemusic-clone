import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';
import AppContainer from './hooks';

import Player from './components/Player';

const App: React.FC = () => (
  <AppContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <Routes />
    <Player />
  </AppContainer>
);

export default App;

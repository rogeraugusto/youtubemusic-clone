import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PlayerProvider } from './player';

const AppProvider: React.FC = ({ children }) => {
  return (
    <NavigationContainer>
      <PlayerProvider>{children}</PlayerProvider>
    </NavigationContainer>
  );
};

export default AppProvider;

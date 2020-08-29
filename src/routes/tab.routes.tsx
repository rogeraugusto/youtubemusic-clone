import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Main from './app.routes';
import Explore from '../pages/Explore';
import Library from '../pages/Library';

const Tab = createMaterialBottomTabNavigator();

const TabRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      activeColor="#fff"
      barStyle={{ backgroundColor: '#212121' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName = '';
          if (route.name === 'Main') {
            iconName = 'home';
          } else if (route.name === 'Explore') {
            iconName = 'explore';
          } else if (route.name === 'Library') {
            iconName = 'library-music';
          }
          return <Icon name={iconName} color={color} size={25} />;
        },
      })}
    >
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  );
};

export default TabRoutes;

import React, { useEffect } from 'react';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';

import changeNavigationBarColor from 'react-native-navigation-bar-color';

import Header from '../components/Header';
import Home from '../pages/Home';
import AlbumDetails from '../pages/AlbumDetails';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  useEffect(() => {
    async function changeColorNavigation(): Promise<void> {
      changeNavigationBarColor('#212121', false, true);
    }
    changeColorNavigation();
  }, []);

  return (
    <App.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#212121' },
      }}
      initialRouteName="Home"
    >
      <App.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: (props) => <Header {...props} /> }}
      />
      <App.Screen
        name="AlbumDetails"
        component={AlbumDetails}
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} />,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => navigation.goBack()}
              tintColor="white"
            />
          ),
        })}
      />
    </App.Navigator>
  );
};

export default AppRoutes;

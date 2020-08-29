import React from 'react';
import { StatusBar } from 'react-native';
import logoImg from '../../assets/logo.png';

import {
  Container,
  Logo,
  LeftContent,
  RigthContent,
  HeaderButton,
  HeaderAvatar,
  Avatar,
} from './styles';

const Header: React.FC = ({ children }) => {
  const isMainScreem = children === 'Home';
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#212121" />
      <LeftContent>{isMainScreem && <Logo source={logoImg} />}</LeftContent>
      <RigthContent isMainScreem={isMainScreem}>
        <HeaderButton icon="cast" onPress={() => false} />
        <HeaderButton icon="magnify" onPress={() => false} />
        {isMainScreem && (
          <HeaderAvatar>
            <Avatar
              source={{
                uri:
                  'https://www.shareicon.net/data/256x256/2016/09/01/822712_user_512x512.png',
              }}
            />
          </HeaderAvatar>
        )}
      </RigthContent>
    </Container>
  );
};

export default Header;

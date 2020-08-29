import styled, { css } from 'styled-components/native';
import { Button, IconButton } from 'react-native-paper';

import { FlatList } from 'react-native';

import { Track } from '../types';

interface Title {
  length: number;
}

interface TrackState {
  isSelected: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #000;
`;

export const Header = styled.View`
  flex-direction: row;
  background-color: #242424;
  padding: 0 15px;
  min-height: 185px;
  align-items: center;
`;

export const HeaderCover = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 4px;
`;

export const HeaderInfo = styled.View`
  margin-left: 10px;
  justify-content: center;
`;

export const HeaderTitle = styled.Text<Title>`
  font-family: 'youtube-sans-bold';
  color: #fff;
  line-height: 33px;
  font-weight: 400;

  margin-top: 10px;
  font-size: 26px;
  max-width: 180px;

  ${(props) =>
    props.length > 15 &&
    css`
      margin-top: -8px;
    `}
  ${(props) =>
    props.length > 25 &&
    css`
      font-size: 18px;
    `}
  ${(props) =>
    props.length > 45 &&
    css`
      max-width: 240px;
    `}
`;
export const HeaderDescription = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 13px;
  color: #aaaaaa;
  font-weight: 400;
  letter-spacing: 0.4px;
`;

export const HeaderAlbumDescription = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 13px;
  color: #aaaaaa;
  font-weight: 400;
  letter-spacing: 0.4px;
`;

export const HeaderActionIcons = styled.View`
  flex-direction: row;
`;

export const HeaderIcon = styled(IconButton).attrs({
  color: '#FFF',
  size: 20,
})`
  margin-right: 25px;
  margin-left: -5px;
  margin-top: 10px;
  padding: 0;
`;

export const PlayButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 5px;
`;

export const ShuffleButton = styled(Button).attrs({
  uppercase: true,
  color: 'white',
  labelStyle: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    letterSpacing: 0,
    color: '#222',
  },
})`
  flex: 1;
  margin: 0 10px;
  border-radius: 5px;
  height: 40px;
`;

export const ShuffleIconButton = styled(IconButton).attrs({
  size: 25,
  color: '#222',
})`
  margin: 2px -15px;
`;

export const PlaybackButton = styled(Button).attrs({
  uppercase: true,
  color: 'white',
  labelStyle: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    fontWeight: '900',
    letterSpacing: 0,
  },
})`
  flex: 1;
  margin: 0 10px;
  border-color: white;
  border-radius: 5px;
  height: 41px;
`;

export const PlayBackIconButton = styled(IconButton).attrs({
  size: 25,
  color: '#fff',
})`
  margin: 2px -15px;
`;

export const AlbumText = styled.Text`
  color: #f2f2f2;
  font-size: 16px;
  padding: 0 15px;
  font-family: 'Roboto-Regular';
  margin-bottom: 10px;
`;

export const TracksContainer = styled.View`
  flex: 1;
`;

export const TrackList = styled(FlatList as new () => FlatList<Track>).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const TrackContainer = styled.View<TrackState>`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2px;
  align-items: center;
  padding: 5px 15px;

  ${(props) =>
    props.isSelected &&
    css`
      background-color: #212121;
    `};
`;

export const TrackContent = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  flex: 1;
  flex-direction: row;
`;

export const TrackCover = styled.Image<TrackState>`
  width: 45px;
  height: 45px;
  border-radius: 2px;
  opacity: 0.9;

  ${(props) => (props.isSelected ? 'opacity: 0.5;' : '')}
`;

export const TrackOverlay = styled.View`
  position: absolute;
  opacity: 1;
  width: 100%;
  height: 100%;
`;

export const TrackOverlayGif = styled.Image`
  width: 25px;
  height: 25px;
  margin: 10px 10px;
`;

export const TrackOverlayDashedLine = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: white;
  margin: 18px 10px;
`;

export const TrackInfo = styled.View`
  margin-left: 15px;
  justify-content: center;
`;

export const TrackTitle = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 13px;
  color: #f2f2f2;
  font-weight: bold;
  letter-spacing: 0.4px;
`;

export const TrackDescription = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 13px;
  color: #aaaaaa;
  font-weight: 400;
  letter-spacing: 0.4px;
`;

export const TrackActionButton = styled(IconButton).attrs({
  size: 23,
  color: '#aaaaaa',
})`
  margin-left: auto;
`;

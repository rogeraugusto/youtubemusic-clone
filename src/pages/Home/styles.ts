import styled, { css } from 'styled-components/native';

import { TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';

import { Recommendation } from '../types';

interface AlbumCover {
  shape: string;
  isPlaying: boolean;
}

interface TextStyle {
  shape: string;
}

const textCentered = css<TextStyle>`
  ${(props) =>
    props.shape === 'rounded' ? 'text-align: center;' : 'text-align: left;'}
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #000;
`;

export const RecommendationContainer = styled(
  FlatList as new () => FlatList<Recommendation>,
).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const RecommendationTitle = styled.Text`
  font-size: 26px;
  color: #fff;
  font-family: 'youtube-sans-bold';
  margin: 15px 15px 15px;
`;

export const RecommendationAlbumContainer = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  padding: 0;
  margin: 0 0 30px 15px;
`;

export const AlbumContent = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  position: relative;
  margin: 0 15px 0 0;
`;

export const AlbumItem = styled.View`
  margin: 0;
`;

export const AlbumCover = styled.Image<AlbumCover>`
  width: 140px;
  height: 140px;
  opacity: 0.9;

  ${(props) =>
    props.shape === 'rounded' ? 'border-radius: 100px;' : 'border-radius: 6px;'}

  ${(props) => (props.isPlaying ? 'opacity: 0.5;' : '')}
`;

export const AlbumOverlay = styled.View`
  position: absolute;
  opacity: 1;
  width: 100%;
  height: 100%;
`;

export const AlbumOverlayIcon = styled(IconButton).attrs({
  color: '#FFF',
  size: 46,
  animated: true,
})`
  margin: auto auto;
`;

export const AlbumOverlayGif = styled.Image`
  width: 45px;
  height: 45px;
  margin: auto auto;
`;

export const AlbumOverlayDashedLine = styled.Text`
  font-size: 25px;
  font-weight: 500;
  color: white;
  margin: 70px auto;
`;

export const AlbumInfo = styled.View`
  margin-top: 5px;
`;

export const AlbumTitle = styled.Text`
  color: #ffffff;
  font-family: 'Roboto-Regular';
  font-size: 14px;
  font-weight: 500;
  max-width: 140px;

  ${textCentered}
`;

export const AlbumDescription = styled.Text`
  color: #aaaaaa;
  font-family: 'Roboto-Regular';
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.4px;
  max-width: 140px;

  ${textCentered}
`;

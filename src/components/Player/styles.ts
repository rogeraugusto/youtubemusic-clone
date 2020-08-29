import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { IconButton } from 'react-native-paper';

export const Container = styled.View``;

export const Content = styled.View`
  background: #212121;
  height: ${74 + getBottomSpace()}px;
  width: 100%;

  flex-direction: row;
  align-items: center;
  padding: 0 15px ${getBottomSpace()}px;
  position: absolute;
  bottom: 55px;
`;

export const CoverImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 4px;
`;

export const MusicInfo = styled.View`
  margin-left: 15px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const Author = styled.Text`
  font-size: 14px;
  color: #c4c4c4;
  margin-top: 3px;
`;

export const Controls = styled.View`
  flex-direction: row;
  margin-left: auto;
`;

export const ControlButton = styled(IconButton).attrs({
  size: 24,
  color: '#FFF',
  animated: true,
})`
  margin-left: 10px;
`;

export const ProgressBarContent = styled.View`
  flex: 1;
  flex-direction: row;
  position: absolute;
  height: 1px;
  background-color: gray;
  bottom: 54px;
  left: 0;
  right: 0;
`;

export const ProgressBarPosition = styled.View``;

export const ProgressBarRemaining = styled.View``;

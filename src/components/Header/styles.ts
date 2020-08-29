import styled, { css } from 'styled-components/native';
import { IconButton } from 'react-native-paper';

interface RigthContentProps {
  isMainScreem: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;

  flex-direction: row;
  align-items: center;
`;

export const LeftContent = styled.View`
  flex-direction: row;
`;

export const Logo = styled.Image`
  width: 90px;
  height: 23px;
`;

export const RigthContent = styled.View<RigthContentProps>`
  flex-direction: row;
  align-items: center;
  margin-left: auto;

  ${(props) =>
    !props.isMainScreem &&
    css`
      margin-right: -15px;
    `}
`;

export const HeaderButton = styled(IconButton).attrs({
  color: '#FFF',
  size: 22,
})`
  margin-left: 10px;
`;

export const HeaderAvatar = styled.TouchableOpacity.attrs({
  hitSlop: { top: 5, left: 5, right: 5, bottom: 5 },
})`
  margin-left: 10px;
`;

export const Avatar = styled.Image`
  width: 22px;
  height: 22px;
  margin-left: 0px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
`;

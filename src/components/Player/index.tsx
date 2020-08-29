import React, { useState, useMemo } from 'react';
import TrackPlayer, {
  TrackPlayerEvents,
  useTrackPlayerEvents,
  useTrackPlayerProgress,
  usePlaybackState,
  STATE_PLAYING,
  STATE_BUFFERING,
} from 'react-native-track-player';

import { usePlayer } from '../../hooks/player';

import {
  Container,
  Content,
  CoverImage,
  MusicInfo,
  Title,
  Author,
  Controls,
  ControlButton,
  ProgressBarContent,
  ProgressBarPosition,
  ProgressBarRemaining,
} from './styles';

const events = [
  TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
  TrackPlayerEvents.REMOTE_PLAY,
  TrackPlayerEvents.REMOTE_PAUSE,
  TrackPlayerEvents.REMOTE_STOP,
];

const Player: React.FC = () => {
  const [trackTitle, setTrackTitle] = useState('');
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackArtist, setTrackArtist] = useState('');

  const playbackState = usePlaybackState();

  const { player, togglePlayback, stopPlayer, skipToNext } = usePlayer();

  const { position, duration } = useTrackPlayerProgress();

  useTrackPlayerEvents(events, async (event: any) => {
    switch (event.type) {
      case TrackPlayerEvents.PLAYBACK_TRACK_CHANGED: {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const { title, artist, artwork } = track || {};

        if (track) {
          setTrackTitle(title);
          setTrackArtist(artist);
          setTrackArtwork(artwork);
        }

        break;
      }
      case TrackPlayerEvents.REMOTE_PLAY:
      case TrackPlayerEvents.REMOTE_PAUSE:
        togglePlayback();
        break;
      case TrackPlayerEvents.REMOTE_STOP:
        stopPlayer();
        break;
      default:
        return event.type;
    }
  });

  const playingIcon = useMemo(
    () =>
      playbackState === STATE_PLAYING || playbackState === STATE_BUFFERING
        ? 'pause'
        : 'play',
    [playbackState],
  );

  return (player && (
    <Container>
      <Content>
        <CoverImage
          source={{
            uri: trackArtwork,
          }}
        />
        <MusicInfo>
          <Title>{trackTitle}</Title>
          <Author>{trackArtist}</Author>
        </MusicInfo>

        <Controls>
          <ControlButton icon={playingIcon} onPress={() => togglePlayback()} />
          <ControlButton icon="skip-next" onPress={skipToNext} />
        </Controls>
      </Content>
      <ProgressBarContent>
        <ProgressBarPosition
          style={{ flex: position, backgroundColor: 'white' }}
        />
        <ProgressBarRemaining
          style={{ flex: duration - position, backgroundColor: 'grey' }}
        />
      </ProgressBarContent>
    </Container>
  )) as React.ReactElement;
};

export default Player;

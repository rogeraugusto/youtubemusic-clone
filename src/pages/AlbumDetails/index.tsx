import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import TrackPlayer, {
  usePlaybackState,
  TrackPlayerEvents,
  useTrackPlayerEvents,
  STATE_PLAYING,
  STATE_BUFFERING,
  STATE_STOPPED,
} from 'react-native-track-player';

import { usePlayer } from '../../hooks/player';

import playingGif from '../../assets/playing.gif';

import { Album, Track } from '../types';

import {
  Container,
  Header,
  HeaderCover,
  HeaderInfo,
  HeaderTitle,
  HeaderDescription,
  HeaderAlbumDescription,
  HeaderActionIcons,
  HeaderIcon,
  PlayButtons,
  ShuffleButton,
  ShuffleIconButton,
  PlaybackButton,
  PlayBackIconButton,
  AlbumText,
  TracksContainer,
  TrackList,
  TrackContainer,
  TrackContent,
  TrackCover,
  TrackOverlay,
  TrackOverlayGif,
  TrackOverlayDashedLine,
  TrackInfo,
  TrackTitle,
  TrackDescription,
  TrackActionButton,
} from './styles';

interface Params {
  album: Album;
}

const events = [TrackPlayerEvents.PLAYBACK_TRACK_CHANGED];

const AlbumDetails: React.FC = () => {
  const [tracklist, setTrackList] = useState<Track[]>([]);
  const { togglePlayback } = usePlayer();
  const route = useRoute();

  const playbackState = usePlaybackState();

  const routeParams = route.params as Params;

  const { album } = routeParams;

  useEffect(() => {
    async function loadTracks(): Promise<void> {
      const currentTrackId = await TrackPlayer.getCurrentTrack();

      const { tracks } = album;
      const mappedTracks = tracks.map((track: Track) => {
        return {
          ...track,
          selected: currentTrackId
            ? Number(currentTrackId) === Number(track.id)
            : false,
        };
      });
      setTrackList(mappedTracks);
    }

    loadTracks();
  }, [album]);

  useTrackPlayerEvents(events, async (event: any) => {
    if (event.type === TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      const currentTrack = await TrackPlayer.getTrack(event.nextTrack);
      const { id } = currentTrack || {};

      if (currentTrack) {
        const mappedTracks = tracklist.map((track: Track) => {
          return {
            ...track,
            selected: track.id === id,
          };
        });

        setTrackList(mappedTracks);
      }
    }
  });

  const handlePlay = async (shuffle?: boolean): Promise<void> => {
    const currentQueue = await TrackPlayer.getQueue();

    const findIndex = shuffle
      ? Math.floor(Math.random() * tracklist.length)
      : 0;

    let queueId = '';
    if (currentQueue.length > 0) {
      queueId = currentQueue[findIndex].id;
    }

    const { id: trackId } = tracklist[findIndex];

    togglePlayback(queueId === trackId ? undefined : album, trackId);
  };

  const handlePlaySelectedTrack = async (id: string): Promise<void> => {
    const currentQueue = await TrackPlayer.getQueue();

    const findIndex = currentQueue.findIndex((track) => track.id === id);

    togglePlayback(currentQueue[findIndex] ? undefined : album, id);
  };

  const renderHeader = (): React.ReactElement => {
    return (
      <>
        <Header>
          <HeaderCover
            source={{
              uri: album.artwork.url,
            }}
          />
          <HeaderInfo>
            <HeaderTitle length={album.title.length}>{album.title}</HeaderTitle>
            <HeaderDescription>{album.description}</HeaderDescription>
            <HeaderAlbumDescription>
              Playlist • {album.tracks.length} músicas
            </HeaderAlbumDescription>
            <HeaderActionIcons>
              <HeaderIcon icon="plus-box-multiple" onPress={() => false} />
              <HeaderIcon icon="download" onPress={() => false} />
              <HeaderIcon icon="dots-vertical" onPress={() => false} />
            </HeaderActionIcons>
          </HeaderInfo>
        </Header>
        <PlayButtons>
          <ShuffleButton
            mode="contained"
            onPress={() => handlePlay(true)}
            icon={() => <ShuffleIconButton icon="shuffle-variant" />}
          >
            Shuffle
          </ShuffleButton>
          <PlaybackButton
            mode="outlined"
            onPress={() => handlePlay()}
            icon={() => <PlayBackIconButton icon="play" />}
          >
            Play
          </PlaybackButton>
        </PlayButtons>
        {album.text && <AlbumText>{album.text}</AlbumText>}
      </>
    );
  };

  const renderIcon = (item: Track): React.ReactElement => {
    if (item.selected) {
      if (
        !(playbackState === STATE_PLAYING || playbackState === STATE_BUFFERING)
      ) {
        if (playbackState === STATE_STOPPED) {
          return <View />;
        }
        return <TrackOverlayDashedLine> - - - </TrackOverlayDashedLine>;
      }
      return <TrackOverlayGif source={playingGif} />;
    }

    return <View />;
  };

  return (
    <Container>
      <TracksContainer>
        <TrackList
          data={tracklist}
          keyExtractor={(track) => track.id}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item: track }) => (
            <TrackContainer
              isSelected={track.selected && playbackState !== STATE_STOPPED}
            >
              <TrackContent onPress={() => handlePlaySelectedTrack(track.id)}>
                <TrackCover
                  isSelected={track.selected && playbackState !== STATE_STOPPED}
                  source={{
                    uri: track.artwork,
                  }}
                />
                <TrackOverlay>{renderIcon(track)}</TrackOverlay>
                <TrackInfo>
                  <TrackTitle>{track.title}</TrackTitle>
                  <TrackDescription>
                    {`${track.artist} • ${
                      track.duration && (track.duration / 60).toFixed(2)
                    }`}
                  </TrackDescription>
                </TrackInfo>
              </TrackContent>
              <TrackActionButton icon="dots-vertical" onPress={() => false} />
            </TrackContainer>
          )}
        />
      </TracksContainer>
    </Container>
  );
};

export default AlbumDetails;

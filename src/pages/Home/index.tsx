import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import TrackPlayer, {
  usePlaybackState,
  TrackPlayerEvents,
  useTrackPlayerEvents,
  STATE_PLAYING,
  STATE_BUFFERING,
  STATE_STOPPED,
} from 'react-native-track-player';

import { useNavigation } from '@react-navigation/native';
import {
  Container,
  RecommendationContainer,
  RecommendationTitle,
  RecommendationAlbumContainer,
  AlbumContent,
  AlbumItem,
  AlbumCover,
  AlbumOverlay,
  AlbumOverlayIcon,
  AlbumOverlayGif,
  AlbumOverlayDashedLine,
  AlbumInfo,
  AlbumTitle,
  AlbumDescription,
} from './styles';

import api from '../../services/api';

import { usePlayer } from '../../hooks/player';

import playingGif from '../../assets/playing.gif';

import { Recommendation, Album, Track } from '../types';

const events = [TrackPlayerEvents.PLAYBACK_TRACK_CHANGED];

const Main: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const { togglePlayback } = usePlayer();

  const playbackState = usePlaybackState();

  const navigation = useNavigation();

  useEffect(() => {
    async function loadRecommendations(): Promise<void> {
      const response = await api.get('/recommendations');

      const mappedRecommendation = response.data.map(
        (recommendation: Recommendation) => {
          const mappedAlbums = recommendation.albums.map((album: Album) => {
            return { ...album, isPlaying: false };
          });
          return { ...recommendation, albums: mappedAlbums };
        },
      );

      setRecommendations(mappedRecommendation);
    }

    loadRecommendations();
  }, []);

  useTrackPlayerEvents(events, async (event: any) => {
    if (event.type === TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      const currentTrack = await TrackPlayer.getTrack(event.nextTrack);
      const { id } = currentTrack || {};

      if (currentTrack) {
        const mappedRecommendation = recommendations.map(
          (recommendation: Recommendation) => {
            const mappedAlbums = recommendation.albums.map((album: Album) => {
              const trackIds = album.tracks.map((track: Track) => track.id);
              return { ...album, isPlaying: trackIds.includes(id) };
            });

            return { ...recommendation, albums: mappedAlbums };
          },
        );

        setRecommendations(mappedRecommendation);
      }
    }
  });

  async function handleAlbumPress(album: Album): Promise<void> {
    if (album.type === 'mix') {
      togglePlayback(album);
    } else {
      navigation.navigate('AlbumDetails', { album });
    }
  }

  const renderIcon = (item: Album): React.ReactElement => {
    if (item.isPlaying) {
      if (
        !(playbackState === STATE_PLAYING || playbackState === STATE_BUFFERING)
      ) {
        if (playbackState === STATE_STOPPED) {
          if (item.type !== 'mix') {
            return <View />;
          }
          return <AlbumOverlayIcon icon="play" />;
        }
        return <AlbumOverlayDashedLine> - - - </AlbumOverlayDashedLine>;
      }
      return <AlbumOverlayGif source={playingGif} />;
    }

    if (item.type === 'mix') {
      return <AlbumOverlayIcon icon="play" />;
    }

    return <View />;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <Container>
        <RecommendationContainer
          data={recommendations}
          keyExtractor={(item) => item.id}
          onRefresh={() => false}
          refreshing={false}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 60,
          }}
          renderItem={({ item: recommendation }) => (
            <>
              <RecommendationTitle>{recommendation.title}</RecommendationTitle>
              <RecommendationAlbumContainer>
                {recommendation.albums.map((album: Album) => (
                  <AlbumContent
                    key={album.id}
                    onPress={() => handleAlbumPress(album)}
                  >
                    <>
                      <AlbumItem>
                        <AlbumCover
                          isPlaying={
                            album.isPlaying && playbackState !== STATE_STOPPED
                          }
                          shape={album.artwork.shape}
                          source={{ uri: album.artwork.url }}
                        />

                        <AlbumOverlay>{renderIcon(album)}</AlbumOverlay>
                      </AlbumItem>
                      <AlbumInfo>
                        <AlbumTitle shape={album.artwork.shape}>
                          {album.title}
                        </AlbumTitle>
                        <AlbumDescription shape={album.artwork.shape}>
                          {album.description}
                        </AlbumDescription>
                      </AlbumInfo>
                    </>
                  </AlbumContent>
                ))}
              </RecommendationAlbumContainer>
            </>
          )}
        />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Main;

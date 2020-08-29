import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

import { Album } from '../pages/types';

interface PlayerContextData {
  player: boolean;
  togglePlayback(albumToPlay?: Album, trackId?: string): Promise<void>;
  skipToNext(): void;
  skipToPrevious(): void;
  stopPlayer(): void;
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

const PlayerProvider: React.FC = ({ children }) => {
  const [player, setPlayer] = useState(false);
  const playbackState = usePlaybackState();

  useEffect(() => {
    async function setupTrackPlayer(): Promise<void> {
      await TrackPlayer.setupPlayer({
        waitForBuffer: true,
      });
      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_STOP,
        ],
        notificationCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_STOP,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
        ],
      });
    }

    setupTrackPlayer();
  }, []);

  const togglePlayback = useCallback(
    async (albumToPlay, trackId) => {
      if (albumToPlay) {
        await TrackPlayer.reset();
        await TrackPlayer.add([...albumToPlay.tracks]);
      }

      if (trackId) {
        await TrackPlayer.skip(trackId);
      }

      if (
        playbackState === TrackPlayer.STATE_PAUSED ||
        playbackState === TrackPlayer.STATE_STOPPED ||
        trackId !== undefined ||
        albumToPlay
      ) {
        await TrackPlayer.play();
        setPlayer(true);
      } else {
        await TrackPlayer.pause();
      }
    },
    [playbackState],
  );

  const skipToNext = useCallback(async () => {
    const trackList = await TrackPlayer.getQueue();
    const currentTrackId = await TrackPlayer.getCurrentTrack();

    const currentIndex = trackList.findIndex(
      (track) => Number(track.id) === Number(currentTrackId),
    );

    if (trackList[currentIndex + 1]) {
      await TrackPlayer.skipToNext();
      await TrackPlayer.play();
    }
  }, []);

  const skipToPrevious = useCallback(async () => {
    const trackList = await TrackPlayer.getQueue();
    const currentTrackId = await TrackPlayer.getCurrentTrack();

    const currentIndex = trackList.findIndex(
      (track) => Number(track.id) === Number(currentTrackId),
    );

    if (trackList[currentIndex - 1]) {
      await TrackPlayer.skipToPrevious();
      await TrackPlayer.play();
    }
  }, []);

  const stopPlayer = useCallback(async () => {
    await TrackPlayer.stop();
    await TrackPlayer.reset();
    setPlayer(false);
  }, []);

  const value = React.useMemo(
    () => ({
      player,
      togglePlayback,
      skipToNext,
      skipToPrevious,
      stopPlayer,
    }),
    [player, togglePlayback, skipToNext, skipToPrevious, stopPlayer],
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

function usePlayer(): PlayerContextData {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error(`usePlayer must be used within a PlayerProvider`);
  }

  return context;
}

export { PlayerProvider, usePlayer };

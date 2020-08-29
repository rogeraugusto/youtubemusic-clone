import TrackPlayer from 'react-native-track-player';

export default async (): Promise<void> => {
  TrackPlayer.addEventListener('remote-play', async () => {
    await TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', async () => {
    await TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-next', async () => {
    const trackList = await TrackPlayer.getQueue();
    const currentTrackId = await TrackPlayer.getCurrentTrack();

    const currentIndex = trackList.findIndex(
      (track) => Number(track.id) === Number(currentTrackId),
    );

    if (trackList[currentIndex + 1]) {
      await TrackPlayer.skipToNext();
      await TrackPlayer.play();
    }
  });

  TrackPlayer.addEventListener('remote-previous', async () => {
    const trackList = await TrackPlayer.getQueue();
    const currentTrackId = await TrackPlayer.getCurrentTrack();

    const currentIndex = trackList.findIndex(
      (track) => Number(track.id) === Number(currentTrackId),
    );

    if (trackList[currentIndex - 1]) {
      await TrackPlayer.skipToPrevious();
      await TrackPlayer.play();
    }
  });

  TrackPlayer.addEventListener('remote-stop', async () => {
    await TrackPlayer.stop();
    await TrackPlayer.reset();
  });

  TrackPlayer.addEventListener('remote-jump-forward', async () => {
    const duration = await TrackPlayer.getDuration();
    let newPosition = await TrackPlayer.getPosition();
    newPosition += 10;
    if (newPosition > duration) {
      newPosition = duration;
    }
    await TrackPlayer.seekTo(newPosition);
  });

  TrackPlayer.addEventListener('remote-jump-backward', async () => {
    let newPosition = await TrackPlayer.getPosition();
    newPosition -= 10;
    if (newPosition < 0) {
      newPosition = 0;
    }
    await TrackPlayer.seekTo(newPosition);
  });
};

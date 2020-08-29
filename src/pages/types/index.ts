export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  artwork: string;
  duration: number | undefined;
  selected: boolean;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  text?: string;
  type?: string;
  isPlaying: boolean;
  artwork: {
    url: string;
    shape: string;
  };
  tracks: Track[];
}

export interface Recommendation {
  id: string;
  title: string;
  albums: Album[];
}

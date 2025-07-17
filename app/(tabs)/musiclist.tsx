import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { getAudioMetadata } from '@missingcore/audio-metadata';
import MusicCardList from '../Comps/MusicCardList';

interface MusicFile {
  music: {
    albumId: string;
    creationTime: number;
    duration: number;
    filename: string;
    id: string;
    mediaType: string;
    modificationTime: number;
    uri: string;
  };
  metadata: {
    album?: string;
    albumArtist?: string;
    artist?: string;
    name?: string;
    track?: string;
    year?: string;
    artwork?: string;
  };
}

export default function HomeScreen() {
  const [musiclist, setMusiclist] = useState<MusicFile[]>([]);

  useEffect(() => {
    const getMetadata = async (filepath: string) => {
      const wantedTags = ['album', 'albumArtist', 'artist', 'name', 'track', 'year', 'artwork'] as const;
      return getAudioMetadata(filepath, wantedTags);
    };

    const getMusicFiles = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need access to your media library.');
        return;
      }

      const media = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,
      });

      const filteredMusic = media.assets.filter((music) => music.uri.includes('/Download'));

      console.log('Filtered Music:', filteredMusic);

      // ✅ Fetch metadata for all songs concurrently
      let musiclistarr:MusicFile[] =[]
      const musicWithMetadata = await Promise.all(
        filteredMusic.map(async (music) => {
          const metadata = await getMetadata(music.uri);
          const musiclistFile = {music, metadata}
          musiclistarr.push(musiclistFile)
        })
      );
      setMusiclist([...musiclistarr]);
    };

    getMusicFiles();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MusicCardList musics={musiclist} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
});

import * as React from 'react';
import { View, StyleSheet, Animated, Easing, Text, TouchableOpacity } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { Audio } from 'expo-av';
import { useState } from 'react';

interface MusicData {
    metadata: {
        fileType: string;
        format: string;
        metadata?: {
            artwork: string;
        };
    };
    music: {
        albumId: string;
        creationTime: number;
        duration: number;
        filename: string;
        height: number;
        id: string;
        mediaType: string;
        modificationTime: string;
        uri: string;
        width: number;
    };
}

interface Props {
    musics: MusicData[];
}

const ScrollingText = ({ text }: { text: string }) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scrollX, {
                    toValue: -150, // Adjust for text length
                    duration: 4000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(scrollX, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View style={{ flexDirection: 'column', overflow: 'hidden' }}>
            <Animated.Text style={[styles.animatedText, { transform: [{ translateX: scrollX }] }]}>
                {text} {/* Repeat for smooth looping */}
            </Animated.Text>
        </Animated.View>
    );
};

const MusicCardList: React.FC<Props> = ({ musics }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    // async function playSound(path:string) {
    //     console.log('Loading Sound');
    //     const { sound } = await Audio.Sound.createAsync( require(path)
    //     );
    //     // setSound(sound);
    
    //     console.log('Playing Sound');
    //     await sound.playAsync();
    // }

    return (

        <>
            {musics.map((music) => (
                <View key={music.music.id} style={styles.container}>
                    <TouchableOpacity >
                        <Card.Title
                            title={<ScrollingText text={music.music.filename} />}
                            subtitle={<Text style={styles.text}>{`Duration: ${(music.music.duration / 60).toFixed(2)} min`}</Text>}
                            left={(props) =>
                                music.metadata?.metadata?.artwork ? (
                                    <Avatar.Image {...props} source={{ uri: music.metadata.metadata.artwork }} />
                                ) : (
                                    <Avatar.Icon {...props} icon="music" />
                                )
                            }
                            right={(props) => <IconButton {...props} icon="delete" onPress={() => { }} />}
                        />
                    </TouchableOpacity>
                </View>
            ))}
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    animatedText: {
        fontSize: 16,
        color: '#000',
        width: 200, // Adjust as needed
    },
    text: {
        fontSize: 14,
        color: '#000',
    },
});

export default MusicCardList;

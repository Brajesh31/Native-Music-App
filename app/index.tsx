import { View, Text, StyleSheet, Button} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
export default function HomeScreen() {

  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        onPress={()=>{router.push("/(tabs)/musiclist")}}  
        title='Get staretd'
      />
      <Button
        onPress={()=>{router.push("/about")}}  
        title='go to about page'
      />
            <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap:3
  },
});

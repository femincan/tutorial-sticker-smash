import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CircleButton({ onPress }: { onPress?: () => any }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.button}>
        <MaterialIcons name='add' size={38} color='#25292e' />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 42,
    padding: 3,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
  },
});

import { MaterialIcons } from '@expo/vector-icons';
import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function IconButton({
  children,
  icon,
  onPress,
}: PropsWithChildren<{
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress?: () => any;
}>) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <MaterialIcons name={icon} size={24} color='#fff' />
      <Text style={styles.label}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    marginTop: 12,
  },
});

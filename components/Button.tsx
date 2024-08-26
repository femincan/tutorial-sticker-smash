import { FontAwesome } from '@expo/vector-icons';
import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Button({
  children,
  theme,
  onPress,
}: PropsWithChildren<{
  theme?: 'primary' | (string & {});
  onPress?: () => any;
}>) {
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.container,
          { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={onPress}
        >
          <FontAwesome
            name='picture-o'
            size={18}
            color={'#25292e'}
            style={styles.icon}
          />
          <Text style={[styles.label, { color: '#25292e' }]}>{children}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.label}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    paddingRight: 8,
  },
  label: {
    color: '#fff',
    fontSize: 16,
  },
});

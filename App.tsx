import { useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { saveToLibraryAsync, usePermissions } from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import domToImage from 'dom-to-image';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

export default function App() {
  const [status, requestPermission] = usePermissions();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<number>();
  const imageRef = useRef<View>(null);

  if (status === null) {
    requestPermission();
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer
              placeholderImageSource={require('./assets/images/background-image.png')}
              selectedImage={selectedImage}
            />
            {pickedEmoji && (
              <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
            )}
          </View>
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton
                icon='refresh'
                onPress={() => {
                  setShowAppOptions(false);
                  setPickedEmoji(undefined);
                  setSelectedImage(undefined);
                }}
              >
                Reset
              </IconButton>
              <CircleButton onPress={() => setIsModalVisible(true)} />
              <IconButton
                icon='save-alt'
                onPress={async () => {
                  if (Platform.OS !== 'web') {
                    try {
                      const localURI = await captureRef(imageRef, {
                        height: 440,
                        quality: 1,
                      });

                      await saveToLibraryAsync(localURI);

                      if (localURI) {
                        alert('Saved!!');
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  } else {
                    try {
                      const dataURL = await domToImage.toPng(
                        imageRef.current as unknown as Node,
                        {
                          quality: 0.95,
                          width: 320,
                          height: 440,
                        }
                      );

                      let link = document.createElement('a');
                      link.download = 'sticker-smash.png';
                      link.href = dataURL;
                      link.click();
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }}
              >
                Save
              </IconButton>
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button theme='primary' onPress={pickImage}>
              Choose a photo
            </Button>
            <Button onPress={() => setShowAppOptions(true)}>
              Use this photo
            </Button>
          </View>
        )}
        <EmojiPicker
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        >
          <EmojiList
            onSelect={(item) => {
              setPickedEmoji(item);
            }}
            onCloseModal={() => setIsModalVisible(false)}
          />
        </EmojiPicker>
      </GestureHandlerRootView>
      <StatusBar style='dark' backgroundColor='#ffd33d' />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    position: 'relative',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

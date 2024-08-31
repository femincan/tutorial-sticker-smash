import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

function clamp(val: number, min: number, max: number) {
  'worklet';

  return Math.min(Math.max(val, min), max);
}

const maxWidth = 320;
const maxHeight = 440;

export default function EmojiSticker({
  imageSize,
  stickerSource,
}: {
  imageSize: number;
  stickerSource: number;
}) {
  const translationX = useSharedValue(50);
  const translationY = useSharedValue(50);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const isActive = useSharedValue(false);
  const scale = useSharedValue(1);
  const startScale = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
    ],
  }));

  const drag = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        0,
        maxWidth - imageSize * scale.value
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        0,
        maxHeight - imageSize * scale.value
      );
    });

  const imageStyle = useAnimatedStyle(() => ({
    width: imageSize,
    height: imageSize,
    transform: [{ scale: scale.value }],
  }));

  const borderStyle = useAnimatedStyle(() => {
    return {
      borderStyle: isActive.value ? 'solid' : undefined,
      borderColor: isActive.value ? '#fff' : undefined,
      borderWidth: isActive.value ? 2 : undefined,
    };
  });

  const pinch = Gesture.Pinch()
    .onStart(() => {
      isActive.value = true;
      startScale.value = scale.value;
    })
    .onUpdate((event) => {
      console.log(event.scale);
      scale.value = clamp(startScale.value + event.scale, 0.5, 3);
    })
    .onEnd(() => {
      isActive.value = false;
    });

  return (
    <GestureDetector gesture={Gesture.Exclusive(pinch, drag)}>
      <Animated.View
        style={[containerStyle, borderStyle, { top: 0, position: 'absolute' }]}
      >
        <Animated.Image
          source={stickerSource}
          style={imageStyle}
          resizeMode='contain'
        />
      </Animated.View>
    </GestureDetector>
  );
}

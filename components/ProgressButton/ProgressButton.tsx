import { RefObject } from 'react';

import { View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

import { IconContainer, ProgressButtonContainer, TextContainer } from './ProgressButton.styles';

type Props<T> = {
  readonly animatedIndex: SharedValue<number>;
  readonly progressLength: number;
  readonly handlePress: (index: number) => void;
  readonly finalText: string;
  readonly iconName: keyof typeof Ionicons.glyphMap;
};

export function ProgressButton<T>({
  animatedIndex,
  progressLength,
  handlePress,
  finalText,
  iconName,
}: Props<T>) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const btnAnimation = useAnimatedStyle(() => {
    return {
      width: withSpring(animatedIndex.value === progressLength - 1 ? 140 : 60),
      height: 60,
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });
  const iconAnimation = useAnimatedStyle(() => {
    return {
      opacity: withSpring(animatedIndex.value === progressLength - 1 ? 0 : 1),
      height: 30,
      width: 30,
      transform: [
        {
          translateX: withTiming(animatedIndex.value === progressLength - 1 ? 100 : 0),
        },
      ],
    };
  });
  const textAnimation = useAnimatedStyle(() => {
    return {
      opacity: withSpring(animatedIndex.value === progressLength - 1 ? 1 : 0),
      transform: [
        {
          translateX: withTiming(animatedIndex.value === progressLength - 1 ? 0 : -100),
        },
      ],
    };
  });

  const btnPress = () => {
    handlePress(animatedIndex.value + 1);
  };

  const pressGesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.95);
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
      runOnJS(btnPress)();
    });

  return (
    <GestureDetector gesture={pressGesture}>
      <ProgressButtonContainer style={btnAnimation}>
        <TextContainer style={textAnimation}>{finalText}</TextContainer>
        <IconContainer style={iconAnimation}>
          <Ionicons name={iconName} size={30} color={theme.textPrimary} />
        </IconContainer>
      </ProgressButtonContainer>
    </GestureDetector>
  );
}

import { FC } from 'react';

import {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { OnboardingScreenData } from '@/types/Onboarding';

import {
  HeaderText,
  Image,
  ImageContainer,
  ScreenContainer,
  SubText,
  TextBlock,
} from './OnboardinScreen.styles';

type Props = {
  readonly item: OnboardingScreenData;
  readonly index: number;
  readonly width: number;
  readonly x: SharedValue<number>;
};

export const OnboardingScreen: FC<Props> = ({ item, index, width, x }) => {
  const scrollAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );

    const translateY = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [100, 0, 100],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <ScreenContainer $width={width}>
      <ImageContainer style={scrollAnimation}>
        <Image source={item.image} $width={width} accessibilityLabel={item.headline} />
      </ImageContainer>
      <TextBlock style={scrollAnimation}>
        <HeaderText> {item.headline} </HeaderText>
        <SubText>{item.subText}</SubText>
      </TextBlock>
    </ScreenContainer>
  );
};

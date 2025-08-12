import { ImageSourcePropType } from 'react-native';

export type OnboardingScreenData = {
  readonly id: string;
  readonly headline: string;
  readonly subText: string;
  readonly image: ImageSourcePropType;
};

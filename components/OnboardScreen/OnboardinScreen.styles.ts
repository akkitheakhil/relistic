import Animated from 'react-native-reanimated';
import styledComponent from 'styled-components/native';

export const ScreenContainer = styledComponent.View<{ $width: number }>`
  width: ${({ $width }) => $width}px;
  justify-content: space-around;
  align-items: center;
`;

export const ImageContainer = styledComponent(Animated.View)`
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const Image = styledComponent.Image<{ $width: number }>`
  width: ${({ $width }) => $width * 0.8}px;
  height: ${({ $width }) => $width * 0.8}px;
  resize-mode: contain;
`;

export const HeaderText = styledComponent.Text`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.textPrimary}
`;

export const SubText = styledComponent.Text`
   text-align: center;
   font-size: 16px;
   margin-horizontal: 24px;
   color: ${({ theme }) => theme.textSecondary}
`;

export const TextBlock = styledComponent(Animated.View)`

`;

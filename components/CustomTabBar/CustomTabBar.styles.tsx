import Animated from 'react-native-reanimated';
import styledComponent from 'styled-components/native';

export const Wrapper = styledComponent.View`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 24px;
`;

export const TabBarContainer = styledComponent.View`
  flex-direction: row;
  background-color: transparent;
  border-radius: 28px;
  padding: 6px;
`;

export const Indicator = styledComponent(Animated.View)`
  position: absolute;
  left: 6px;
  top: 6px;
  bottom: 6px;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 22px;
`;

export const TabBarItem = styledComponent.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 10px 0;
`;

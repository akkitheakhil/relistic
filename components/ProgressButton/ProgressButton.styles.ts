import Animated from 'react-native-reanimated';
import styledComponents from 'styled-components/native';

export const ProgressButtonContainer = styledComponents(Animated.View)`
  background-color: ${({ theme }) => theme.primary};
  padding: 10px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  overflow: hidden; 
`;

export const TextContainer = styledComponents(Animated.Text)`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 16px;
  position: absolute;
  font-weight: bold;
`;

export const IconContainer = styledComponents(Animated.View)`
 position: absolute;
`;

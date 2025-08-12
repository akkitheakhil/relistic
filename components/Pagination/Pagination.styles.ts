import Animated from 'react-native-reanimated';
import styledComponents from 'styled-components/native';

export const PaginationContainer = styledComponents.View`
  flex-direction: row;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const PaginationDotContainer = styledComponents(Animated.View)`
  height: 10px;
  background-color: ${({ theme }) => theme.textPrimary};
  margin-horizontal: 5px;
  border-radius: 5px;
`;

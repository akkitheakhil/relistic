import Animated from "react-native-reanimated";
// eslint-disable-next-line import/no-named-as-default
import styled from "styled-components/native";

export const Wrapper = styled.View`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 24px;
`;

export const TabBarContainer = styled.View`
  flex-direction: row;
  background-color: transparent;
  border-radius: 28px;
  padding: 6px;
`;

export const Indicator = styled(Animated.View)`
  position: absolute;
  left: 6px;
  top: 6px;
  bottom: 6px;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 22px;
`;

export const TabBarItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 10px 0; 
`;

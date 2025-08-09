import React, { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';

import { Indicator, TabBarContainer, TabBarItem, Wrapper } from './CustomTabBar.styles';

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home-outline',
  list: 'list-outline',
  reminders: 'notifications-outline',
  profile: 'person-outline',
};

const PADDING = 6;
const PILL_WIDTH_RATIO = 0.8;

export const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const theme = useTheme();

  const [barW, setBarW] = useState(0);
  const innerW = Math.max(0, barW - PADDING * 2);
  const itemW = innerW / state.routes.length;
  const pillW = itemW * PILL_WIDTH_RATIO;
  const offsetToCenter = (itemW - pillW) / 2;

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(state.index * itemW + offsetToCenter) }],
    width: pillW,
  }));

  return (
    <Wrapper>
      <TabBarContainer onLayout={(e) => setBarW(e.nativeEvent.layout.width)}>
        <Indicator style={indicatorStyle} />
        {state.routes.map((route, i) => {
          const isFocused = state.index === i;
          return (
            <TabBarItem
              key={route.key}
              activeOpacity={0.85}
              onPress={() => {
                const evt = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !evt.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            >
              <Ionicons
                name={ICONS[route.name]}
                size={22}
                color={isFocused ? theme.textPrimary : theme.textSecondary}
              />
            </TabBarItem>
          );
        })}
      </TabBarContainer>
    </Wrapper>
  );
};

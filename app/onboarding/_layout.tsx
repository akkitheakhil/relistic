import React, { useCallback } from 'react';

import { FlatList, View, ViewToken, useWindowDimensions } from 'react-native';

import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';

import { OnboardingScreen } from '@/components/OnboardScreen';
import { Pagination } from '@/components/Pagination';
import { ProgressButton } from '@/components/ProgressButton';
import WaveBackground from '@/components/WaveBackground/WaveBackground';
import { ONBOARDING_SCREEN_DATA } from '@/constants/onboardingScreenData';
import { useAppStore } from '@/store/app-store';
import { OnboardingScreenData } from '@/types/Onboarding';

type OnboardingViewToken = ViewToken<OnboardingScreenData>[];
const SCREEN_DATA: OnboardingScreenData[] = ONBOARDING_SCREEN_DATA;

const OnboardingScreens = () => {
  const theme = useTheme();
  const { setHasSeenOnboarding } = useAppStore();
  const { width, height } = useWindowDimensions();
  const scrollRef = useAnimatedRef<FlatList<OnboardingScreenData>>();
  const x = useSharedValue(0);
  const scrollIndex = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: OnboardingViewToken; changed: OnboardingViewToken }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        scrollIndex.value = viewableItems[0].index;
      }
    },
    [],
  );

  const handleProgressBtnPress = (index: number) => {
    if (scrollRef.current && scrollIndex.value < SCREEN_DATA.length - 1) {
      scrollRef.current.scrollToIndex({ index });
    }

    if (scrollRef.current && scrollIndex.value >= SCREEN_DATA.length - 1) {
      setHasSeenOnboarding(true);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <WaveBackground
        x={x}
        position="top"
        layers={3}
        colors={theme.primaryGradient}
        backgroundColor={theme.background}
        bottomFadeStart={.7}
        bottomFadeSize={2.6}
        bottomFadeOpacityFrom={0}
        bottomFadeOpacityTo={1}
      />
      <Animated.FlatList
        ref={scrollRef}
        data={SCREEN_DATA}
        renderItem={({ item, index }) => <OnboardingScreen {...{ item, index, width, x }} />}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        horizontal
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        removeClippedSubviews
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={2}
        onScroll={onScroll}
      ></Animated.FlatList>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 20,
          paddingVertical: 20,
          marginBottom: 20,
        }}
      >
        <Pagination {...{ data: SCREEN_DATA, width, x }} />
        <ProgressButton
          animatedIndex={scrollIndex}
          progressLength={SCREEN_DATA.length}
          handlePress={handleProgressBtnPress}
          finalText="Get Started"
          iconName="arrow-forward"
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreens;

// src/components/LottieSplash.tsx
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { useColorScheme } from "react-native";
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import styled, { useTheme } from "styled-components/native";
import splashAnimationDark from "../../assets/animations/splash-screen-animation-dark.json";
import splashAnimationLight from "../../assets/animations/splash-screen-animation.json";

type Props = { onFinish?: () => void };

const Container = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
`;

const LottieSplash: React.FC<Props> = ({ onFinish }) => {
    const colorScheme = useColorScheme();
    const theme = useTheme();
    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);
    const lottieRef = useRef<LottieView | null>(null);


    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
    }));

    const animation =
        colorScheme === "dark" ? splashAnimationDark : splashAnimationLight;

    useEffect(() => {
        // Safety timeout in case onAnimationFinish doesn't fire
        const t = setTimeout(() => fadeOut(), 5000);
        return () => clearTimeout(t);
    }, []);

    const fadeOut = () => {
        opacity.value = withTiming(0, { duration: 320, easing: Easing.out(Easing.cubic) }, () => {
            runOnJS(onFinish || (() => {}))();
        });
        scale.value = withTiming(1.03, { duration: 320, easing: Easing.out(Easing.cubic) });
    };

    return (
        <Container style={animatedStyle}>
            <LottieView
                ref={(r) => { lottieRef.current = r; }}
                source={animation}
                autoPlay
                loop={false}
                onAnimationFinish={fadeOut}
                style={{ width: "80%", aspectRatio: 1, backgroundColor: theme.background }}
            />
        </Container>
    );
};

export default LottieSplash;

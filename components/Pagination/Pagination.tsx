import { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { PaginationContainer, PaginationDotContainer } from './Pagination.styles';

type Props<T> = {
  readonly data: T[];
  readonly x: SharedValue<number>;
  readonly width: number;
};

type PaginationDotProps = {
  readonly index: number;
  readonly x: SharedValue<number>;
  readonly width: number;
};

function PaginationDot<T>({ index, x, width }: PaginationDotProps) {
  const animation = useAnimatedStyle(() => {
    const dotWidth = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [10, 20, 10],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      width: dotWidth,
    };
  });
  return <PaginationDotContainer style={animation}></PaginationDotContainer>;
}

export function Pagination<T>({ data, x, width }: Props<T>) {
  return (
    <PaginationContainer>
      {data.map((_, i) => (
        <PaginationDot key={i} x={x} width={width} index={i} />
      ))}
    </PaginationContainer>
  );
}

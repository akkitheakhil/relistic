import styledComponent, { css } from 'styled-components/native';

export type Position = 'top' | 'bottom';

export const WaveContainer = styledComponent.View<{ $position: Position }>`
  position: absolute;
  left: 0;
  right: 0;
  ${({ $position }) =>
    $position === 'top'
      ? css`
          top: 0;
        `
      : css`
          bottom: 0;
        `}
`;
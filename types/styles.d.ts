import 'styled-components/native';

import type { AppTheme } from '@/theme/colors';

/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

import "styled-components/native";
import type { AppTheme } from "@/theme/colors";

declare module "styled-components/native" {
    export interface DefaultTheme extends AppTheme {}
}
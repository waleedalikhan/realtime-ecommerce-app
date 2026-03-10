import React from "react";
import Svg, { Path } from "react-native-svg";
import { colors } from "@/lib/theme";

const amber400 = colors.amber[400];
const stone400 = colors.stone[400];

export const IconLI: React.FC<{ color?: string }> = ({ color = amber400 }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconOT: React.FC<{ color?: string }> = ({ color = amber400 }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconSC: React.FC<{ color?: string }> = ({ color = amber400 }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 12.75L11.25 15 15 9.75m-3-7.5A6.5 6.5 0 0112 3c1.912 0 3.605.834 4.75 2.086 1.146 1.252 1.855 2.96 1.855 4.75 0 3.59-2.91 6.5-6.5 6.5H4.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconHamburger: React.FC<{ color?: string }> = ({
  color = stone400,
}) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 6h16M4 12h16M4 18h16"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconX: React.FC<{ color?: string }> = ({ color = stone400 }) => (
  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 18L18 6M6 6l12 12"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const IconLoader: React.FC<{ color?: string }> = ({
  color = colors.black,
}) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill={color}>
    <Path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" />
  </Svg>
);

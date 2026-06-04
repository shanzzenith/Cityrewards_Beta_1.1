import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface LeafLogoProps {
  size?: number;
  color?: string;
}

export default function LeafLogo({ size = 28, color = '#1A5F4F' }: LeafLogoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Path
        d="M14 2C8 2 4 8 4 14c0 3 1 5.5 3 7.5C9 23.5 11.5 25 14 25c1.5 0 3-.5 4-1.5 1-.8 2-2 2.5-3.5C22 17 22 14 20 10c-1-2-3-5-6-8z"
        fill={color}
        opacity={0.15}
      />
      <Path
        d="M14 3C9 3 5 8.5 5 14c0 2.8 1 5.2 2.5 7C9 22.8 11.5 24 14 24c1.2 0 2.5-.4 3.5-1.2 1-.8 1.8-1.8 2.3-3.2C21.5 16.5 21.5 13.5 19.5 9.5c-1-2-2.8-4.5-5.5-6.5z"
        fill={color}
      />
      <Path
        d="M14 6v16M14 6C12 9 10 12 10 15.5M14 6C16 9 18 12 18 15.5"
        stroke="white"
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

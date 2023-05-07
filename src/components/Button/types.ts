import { CSSProperties } from 'react';

export interface ButtonProps {
  onClick?: () => void;
  style?: CSSProperties;
  disabled?: boolean;
}

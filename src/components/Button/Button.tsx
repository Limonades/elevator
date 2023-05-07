import { FC, PropsWithChildren } from 'react';

import { ButtonProps } from '@/components/Button/types';

import styles from './styles.module.scss'

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  onClick,
  style,
  disabled = false,
}) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={style}
      disabled={disabled}
      type='button'
    >
      {children}
    </button>
  );
};

export default Button;

import { FC, useEffect, useState } from 'react';

import { ANIMATION_DURATION } from '@/configs/animation';
import { ElevatorProps } from '@/components/Building/Elevator/types';

import styles from './styles.module.scss'

export const Elevator: FC<ElevatorProps> = ({
  queue,
  elevatorIndex,
  removeFinished
}) => {
  const [position, setPosition] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const startElevator = () => {
    setIsMoving(true);
    setPosition(queue[0]);

    setTimeout(() => {
      setIsMoving(false);
    }, ANIMATION_DURATION)
  }

  useEffect(() => {
    if (queue.length && !isMoving) {
      startElevator();
    }
  }, [queue]);

  useEffect(() => {
    if (queue.length && !isMoving) {
      removeFinished(elevatorIndex);
    }
  }, [isMoving]);

  return (
    <div className={styles.elevator} style={{
      'transition': `transform ${ANIMATION_DURATION}ms ease`,
      'transform': `translateY(-${position * 50}px)`,
    }}/>
  );
};

export default Elevator;

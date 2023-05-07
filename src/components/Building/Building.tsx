import { FC, useState, MouseEvent } from 'react';
import uniqid from 'uniqid';

import { FLOORS } from '@/configs/building';
import { findNextElevatorIndex, isNextSameFloorDetect } from '@/components/Building/utils';
import { ElevatorData } from '@/components/Building/types';
import Elevator from '@/components/Building/Elevator';
import Button from '@/components/Button';

import styles from './styles.module.scss'

export const Building: FC = () => {
  const [elevators, setElevators] = useState<ElevatorData[]>([{
    position: 0,
    queue: [],
    id: uniqid(),
    isMoving: false
  }]);

  const removeFirstFromQueue = (elevatorIndex: number): void => {
    setElevators((prev) => {
      return prev.map((item, index) => {
        const [first, ...rest] = item.queue;

        if (index === elevatorIndex) {
          return {
            ...item,
            position: first,
            queue: rest,
            isMoving: !!rest.length
          }
        }

        return item;
      })
    });
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    const { floor } = e.currentTarget.dataset;

    if (floor) {
      const floorNumber = Number(floor);
      const nextElevatorIndex = findNextElevatorIndex(elevators, floorNumber);

      if (!isNextSameFloorDetect(elevators, floorNumber)) {
        setElevators((prev) => {
          return prev.map((item, index) => {
            if (index === nextElevatorIndex) {
              return {
                ...item,
                queue: [...item.queue, floorNumber],
              }
            }

            return item;
          })
        });
      }
    }
  }

  const addElevator = (): void => {
    setElevators((prev) => [...prev, {
      position: 0,
      queue: [],
      id: uniqid(),
      isMoving: false
    }]);
  }

  const removeElevator = (): void => {
    setElevators((prev) => prev.slice(0, -1));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.floors}>
        {FLOORS.map((_, index) => {
          const floorName = FLOORS.length - index;

          return (
            <button
              key={index}
              onClick={handleClick}
              data-floor={floorName - 1}
              className={styles.floor}
              type='button'
            >
              {floorName}
            </button>
          )
        })}
      </div>

      {elevators.map((elevator, index) => {
        const { queue, id } = elevator;

        return (
          <Elevator
            queue={queue}
            elevatorIndex={index}
            removeFinished={removeFirstFromQueue}
            key={id}
          />
        )
      })}

      <div className={styles.buttonsContainer}>
        <Button onClick={removeElevator} disabled={elevators.length <= 1}>
          -
        </Button>
        <Button onClick={addElevator} disabled={elevators.length >= FLOORS.length - 1}>
          +
        </Button>
      </div>
    </div>
  );
};

export default Building;

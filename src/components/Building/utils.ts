import { ElevatorData } from '@/components/Building/types';

export const findShortestQueueIndex = (array: ElevatorData[]): number => {
  return array.reduce((
    acc,
    currentValue,
    currentIndex,
    array
  ) => {
    if (currentValue.queue.length < array[acc].queue.length) {
      return currentIndex;
    } else {
      return acc;
    }
  }, 0);
}

export const findShortestWayIndex = (
  elevators: ElevatorData[],
  floor: number
): number => {
  let minDifference = Math.abs(elevators[0].position - floor);
  let index = 0;

  for (let i = 1; i < elevators.length; i++) {
    const difference = Math.abs(elevators[i].position - floor);

    if (difference < minDifference) {
      minDifference = difference;
      index = i;
    }
  }

  return index
}

export const findNextElevatorIndex = (
  elevators: ElevatorData[],
  floor: number
): number => {
  const isAllStopped = elevators.every((item) => !item.isMoving);
  let nextElevatorIndex;

  if (isAllStopped) {
    nextElevatorIndex = findShortestWayIndex(elevators, floor);
  } else {
    nextElevatorIndex = findShortestQueueIndex(elevators);
  }

  return nextElevatorIndex;
}

export const isNextSameFloorDetect = (
  elevators: ElevatorData[],
  floor: number
): boolean => {
  return elevators.some((item) => {
    const { queue, position } = item;
    const { length } = queue;

    const isNextSameFloor = length && queue[length - 1] === floor;
    const isAlreadyOnFloor = !length && position === floor;

    return isNextSameFloor || isAlreadyOnFloor;
  })
}

export interface ElevatorProps {
  queue: number[],
  elevatorIndex: number,
  removeFinished: (index: number) => void;
}

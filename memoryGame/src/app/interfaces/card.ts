import { CardState } from '../enums/card-state';

export interface Card {
  id: number;
  emoji: string;
  state: CardState;
}

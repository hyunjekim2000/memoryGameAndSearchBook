import { Component, OnInit } from '@angular/core';
import { Card } from '../interfaces/card';
import { CardState } from '../enums/card-state';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  emojis = [
    '🐵',
    '🐶',
    '🦊',
    '🐱',
    '🦁',
    '🐯',
    '🐴',
    '🦄',
    '🦓',
    '🦌',
    '🐮',
    '🐷',
    '🐭',
    '🐹',
    '🐻',
    '🐨',
    '🐼',
    '🐽',
    '🐸',
    '🐰',
    '🐙',
  ];
  cards: Card[] = [];
  selectedCards: Card[] = [];
  win = false;
  hellMode = false;

  ngOnInit() {
    this.init();
  }

  init() {
    const pickEmoji = [...this.emojis].sort(() => Math.random() - 0.5);
    const selected = this.hellMode
      ? pickEmoji.slice(0, this.emojis.length)
      : pickEmoji.slice(0, 8);

    const duplicateEmojis = [...selected, ...selected];
    const shuffledEmojis = duplicateEmojis.sort(() => Math.random() - 0.5);

    this.cards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      state: CardState.COVERED,
    }));

    this.selectedCards = [];
    this.win = false;
  }

  peek(card: Card) {
    if (card.state !== CardState.COVERED) return;

    if (this.selectedCards.length === 2) {
      this.selectedCards.forEach((c) => (c.state = CardState.COVERED));
      this.selectedCards = [];
    }

    card.state = CardState.PEEKING;
    this.selectedCards.push(card);

    if (this.selectedCards.length < 2) return;

    const [first, second] = this.selectedCards;

    if (first.emoji === second.emoji) {
      first.state = second.state = CardState.CLEARED;
      this.selectedCards = [];
      this.win = this.cards.every((card) => card.state === CardState.CLEARED);
      return;
    }

    setTimeout(() => {
      if (
        this.selectedCards.length !== 2 ||
        this.selectedCards[0] !== first ||
        this.selectedCards[1] !== second
      ) {
        return;
      }

      first.state = second.state = CardState.COVERED;
      this.selectedCards = [];
    }, 1500);
  }

  checkMatch(): boolean {
    return (
      this.selectedCards.length == 2 &&
      this.selectedCards[0].emoji === this.selectedCards[1].emoji
    );
  }

  getCardState(card: Card): string {
    return card.state.toString();
  }

  toggleHellMode() {
    this.hellMode = !this.hellMode;
    this.init();
  }
}

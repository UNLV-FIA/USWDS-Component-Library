import { Component, input } from '@angular/core';
import { CardType, MediaCardFormat } from './card.types';

@Component({
  selector: 'ngx-uswds-card',
  imports: [],
  templateUrl: './uswds-card.html',
  styleUrl: './uswds-card.scss',
})
export class UswdsCard {
  cardType = input<CardType>('NonMedia');
  mediaCardType = input<MediaCardFormat>('None');
  headerText = input<string>('');
  mediaItem = input<string>('');
  mediaText = input<string>('');
}

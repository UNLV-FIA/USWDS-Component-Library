import { Component, input } from '@angular/core';
import { MediaCardFormat } from './card.types';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'ngx-uswds-card',
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './uswds-card.html',
  styleUrl: './uswds-card.scss',
})
export class UswdsCard {
  mediaCardType = input<MediaCardFormat>('None');
  asAList = input<boolean>(false);
}

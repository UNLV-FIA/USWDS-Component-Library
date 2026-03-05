import { Component, input, Optional, computed, Host } from '@angular/core';
import { GridFormats, MediaCardFormat } from './card.types';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { UswdsCardGroup } from '../uswds-card-group/uswds-card-group';

@Component({
  selector: 'ngx-uswds-card',
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './uswds-card.html',
  styleUrl: './uswds-card.scss',
})
export class UswdsCard {
  constructor(@Optional() @Host() private cardGroup: UswdsCardGroup | null) {}
  mediaCardType = input<MediaCardFormat>('None');
  gridFormat = input<GridFormats>(['tablet-lg:grid-col-6', 'widescreen:grid-col-4']);
  asAList = computed(() => {
    return !!this.cardGroup;
  });
}

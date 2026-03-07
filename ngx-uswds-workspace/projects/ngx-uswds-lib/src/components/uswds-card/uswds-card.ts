import { Component, input, Optional, computed, Host } from '@angular/core';
import { GridFormats, MediaCardFormat } from './card.types';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { UswdsCardGroup } from '../uswds-card-group/uswds-card-group';

@Component({
  selector: 'ngx-uswds-card, li[ngx-uswds-card]',
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './uswds-card.html',
  host: {
    '[class]': 'hostClasses()',
  },
  styleUrl: './uswds-card.scss',
})
export class UswdsCard {
  constructor(@Optional() @Host() private cardGroup: UswdsCardGroup | null) {}
  mediaCardType = input<MediaCardFormat>('None');
  gridFormat = input<GridFormats>(['tablet-lg:grid-col-6', 'widescreen:grid-col-4']);
  asAList = computed(() => {
    return !!this.cardGroup;
  });
  hostClasses = computed(() => {
    const classes: string[] = ['usa-card'];

    switch (this.mediaCardType()) {
      case 'FlagDefault':
        classes.push('usa-card--flag', 'flex-1');
        break;
      case 'FlagRightInset':
        classes.push('usa-card--flag', 'flex-1', 'usa-card--media-right');
        break;
      case 'MediaWHeader':
        classes.push('usa-card--header-first');
        break;
    }

    for (const gridClass of this.gridFormat()) {
      classes.push(gridClass);
    }
    return classes.join(' ');
  });
}

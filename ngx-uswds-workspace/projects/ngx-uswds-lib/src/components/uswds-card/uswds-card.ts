import { Component, input, Optional, computed, Host } from '@angular/core';
import { GridFormats, MediaCardFormat } from './uswds-card.types';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { UswdsCardGroup } from '../uswds-card-group/uswds-card-group';

/**
 * @class
 * @description
 * An angular standalone component that renders a U.S. Web Design System card.
 * Cards allow users to subset or summarize a larger idea. These acts as an entry point for detailed information.
 * The summary may contain various content types including but not limited to text, images, button and links.
 *
 * Often cards are apart of a collection of similar cards. However, a single standalone card is allowed.
 * Users are able to project their own content to the 3 core parts of a card: card-header, card-media, card-body, card-footer. View usage in the example
 * @example
 * <ngx-uswds-card mediaCardType="MediaWHeader">
 *  <span card-header>Media with header first Standalone Card</span>
 *  <span card-media>
 *    <img src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
 *      alt="A placeholder image" /></span>
 *  <span card-body>
 *    <p>
 *      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
 *      possimus similique nemo odit doloremque laudantium?
 *    </p>
 *  </span>
 *  <span card-footer>
 *    <ngx-uswds-button type="button">
 *      <span>Visit Florida Keys</span>
 *    </ngx-uswds-button>
 *  </span>
 * </ngx-uswds-card>
 * @selector ngx-uswds-card, li[ngx-uswds-card]
 * @input {MediaCardFormat} [mediaCardType = 'None'] - Determines the type of card to create
 * @input {GridFormats} [gridFormat = ['tablet-lg:grid-col-6', 'widescreen:grid-col-4']] - Determines the sizing of a card in a grid based on selectors.
 *
 */

@Component({
  selector: 'ngx-uswds-card, li[ngx-uswds-card]',
  imports: [CommonModule, NgTemplateOutlet],
  standalone: true,
  templateUrl: './uswds-card.html',
  host: {
    '[class]': 'hostClasses()',
  },
  styleUrl: './uswds-card.scss',
})
export class UswdsCard {
  constructor(@Optional() @Host() private cardGroup: UswdsCardGroup | null) {}

  /**
   * Determines the type of card to generate.
   * Accepted Values:
   * - 'None'
   * - 'MediaWHeader'
   * - 'Inset'
   * - 'Exdent'
   * - 'FlagDefault'
   * - 'FlagRightInset';
   */
  // v8 ignore next
  mediaCardType = input<MediaCardFormat>('None');
  // v8 ignore next
  gridFormat = input<GridFormats>(['tablet-lg:grid-col-6', 'widescreen:grid-col-4']);

  // v8 ignore next
  hostClasses = computed(() => this.buildHostClass());

  buildHostClass = () => {
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
  };
}

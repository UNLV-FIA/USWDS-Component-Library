import { Component, ContentChildren, QueryList } from '@angular/core';
import { UswdsCard } from '../uswds-card/uswds-card';
import { CommonModule } from '@angular/common';
/***
 * @class
 * @description
 * An angular component that renders a group of cards, ensuring consistent sizing. Use this when trying to create a group of cards
 * @selector  ngx-uswds-card-group
 * @example
 <ngx-uswds-card-group>
    <ngx-uswds-card mediaCardType="None" gridFormat="tablet:grid-col-12">
      <span card-header>Standard Card</span>
      <span card-body>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          possimus similique nemo odit doloremque laudantium?
        </p>
      </span>
      <span card-footer>
        <ngx-uswds-button type="button">
          <span>Visit Florida Keys</span>
        </ngx-uswds-button>
      </span>
    </ngx-uswds-card>

    <ngx-uswds-card mediaCardType="None">
      <span card-header>Card with Media</span>
      <span card-media>
        <img src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
          alt="A placeholder" /></span>
      <span card-body>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          possimus similique nemo odit doloremque laudantium?
        </p>
      </span>
      <span card-footer>
        <ngx-uswds-button type="button">
          <span>Visit Florida Keys</span>
        </ngx-uswds-button>
      </span>
    </ngx-uswds-card>

    <ngx-uswds-card mediaCardType="MediaWHeader" gridFormat="tablet:grid-col-12">
      <span card-header>Media with Header</span>
      <span card-media>
        <img src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
          alt="A placeholder" /></span>
      <span card-body>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          possimus similique nemo odit doloremque laudantium?
        </p>
      </span>
      <span card-footer>
        <ngx-uswds-button type="button">
          <span>Visit Florida Keys</span>
        </ngx-uswds-button>
      </span>
    </ngx-uswds-card>

    <ngx-uswds-card mediaCardType="Inset" gridFormat="tablet:grid-col-6">
      <span card-header>Inset Card</span>
      <span card-media>
        <img src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
          alt="A placeholder" /></span>
      <span card-body>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          possimus similique nemo odit doloremque laudantium?
        </p>
      </span>
      <span card-footer>
        <ngx-uswds-button type="button">
          <span>Visit Florida Keys</span>
        </ngx-uswds-button>
      </span>
    </ngx-uswds-card>

    <ngx-uswds-card mediaCardType="Exdent">
      <span card-header>Exdent Media</span>
      <span card-media>
        <img src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
          alt="A placeholder" /></span>
      <span card-body>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          possimus similique nemo odit doloremque laudantium?
        </p>
      </span>
      <span card-footer>
        <ngx-uswds-button type="button">
          <span>Visit Florida Keys</span>
        </ngx-uswds-button>
      </span>
    </ngx-uswds-card>
  </ngx-uswds-card-group>
*/

@Component({
  selector: 'ngx-uswds-card-group',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './uswds-card-group.html',
  styleUrl: './uswds-card-group.scss',
})
export class UswdsCardGroup {
  // v8 ignore next 2
  @ContentChildren(UswdsCard)
  itemList!: QueryList<UswdsCard>;

  cards(): UswdsCard[] {
    return this.itemList.toArray();
  }
}

import { Component } from '@angular/core';

/***
 * @class
 * @description
 * An angular component that renders a group of cards, ensuring consistent sizing. Use this when trying to create a group of cards
 * @selector  ngx-uswds-card-group
 * @example
  <ngx-uswds-card-group>
      <li ngx-uswds-card mediaCardType="None" [gridFormat]="['tablet:grid-col-12', 'mobile-lg:grid-col-6']">
        <span card-header>Card</span>
        <span card-body>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum tenetur quo cupiditate, eaque qui
            officia recusandae.
          </p>
        </span>
        <span card-footer>
          <ngx-uswds-button type="button">
            <span>Visit Florida Keys</span>
          </ngx-uswds-button>
        </span>
      </li>

      <li ngx-uswds-card mediaCardType="None" [gridFormat]="['tablet:grid-col-6', 'mobile-lg:grid-col-3']">
        <span card-header>Card With Media None</span>
        <span card-media>
          <img src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image" /></span>
        <span card-body>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum tenetur quo cupiditate, eaque qui
            officia recusandae.
          </p>
        </span>
        <span card-footer>
          <ngx-uswds-button type="button">
            <span>Visit Florida Keys</span>
          </ngx-uswds-button>
        </span>
      </li>

      <li ngx-uswds-card mediaCardType="MediaWHeader">
        <span card-header>Media with header first</span>
        <span card-media>
          <img src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image" /></span>
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
      </li>

      <li ngx-uswds-card mediaCardType="Inset">
        <span card-header>Inset Media</span>
        <span card-media>
          <img src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image" /></span>
        <span card-body>
          <p>
            Etiam vitae sodales metus. Fusce id orci dignissim, efficitur risus eget, tempus odio.
            Donec lectus ante, auctor eget cursus sed, convallis quis magna. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus. Mauris mattis tellus bibendum aliquet
            malesuada.
          </p>
        </span>
        <span card-footer>
          <ngx-uswds-button type="button">
            <span>Visit Florida Keys</span>
          </ngx-uswds-button>
        </span>
      </li>


      <li ngx-uswds-card mediaCardType="Exdent">
        <span card-header>Exdent Media</span>
        <span card-media>
          <img src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image" /></span>
        <span card-body>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Tempore possimus similique nemo odit doloremque laudantium?
          </p>
        </span>
        <span card-footer>
          <ngx-uswds-button type="button">
            <span>Visit Florida Keys</span>
          </ngx-uswds-button>
        </span>
      </li>

      <li ngx-uswds-card mediaCardType="FlagDefault">
        <span card-header>Exdent Media</span>
        <span card-media>
          <img src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image" /></span>
        <span card-body>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Tempore possimus similique nemo odit doloremque laudantium?
          </p>
        </span>
        <span card-footer>
          <ngx-uswds-button type="button">
            <span>Visit Florida Keys</span>
          </ngx-uswds-button>
        </span>
      </li>

      <li ngx-uswds-card mediaCardType="FlagRightInset">
        <span card-header>Exdent Media</span>
        <span card-media>
          <img src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image" /></span>
        <span card-body>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Tempore possimus similique nemo odit doloremque laudantium?
          </p>
        </span>
        <span card-footer>
          <ngx-uswds-button type="button">
            <span>Visit Florida Keys</span>
          </ngx-uswds-button>
        </span>
      </li>

    </ngx-uswds-card-group>
*/

@Component({
  selector: 'ngx-uswds-card-group',
  imports: [],
  standalone: true,
  templateUrl: './uswds-card-group.html',
  styleUrl: './uswds-card-group.scss',
})
export class UswdsCardGroup {}

import { Component, input, computed } from '@angular/core';
import { FooterVariant } from './footer-types';
import { footer } from '@uswds/uswds/js';

@Component({
  selector: 'ngx-uswds-footer',
  standalone: true,
  imports: [],
  templateUrl: './uswds-footer.html',
  styleUrl: './uswds-footer.scss',
})
export class UswdsFooter {
  variant = input<FooterVariant>();
  assetsPath = input<string>('/assets/img');
  agency = input<string>();
  logoImagePath = input<string>();

  ngOnInit() {
    footer.on();
  }

  defaultLogoImagePath = computed(() => `${this.assetsPath()}/logo-img.png`);
  facebookImagePath = computed(() => `${this.assetsPath()}/usa-icons/facebook.svg`);
  twitterImagePath = computed(() => `${this.assetsPath()}/usa-icons/twitter.svg`);
  youtubeImagePath = computed(() => `${this.assetsPath()}/usa-icons/youtube.svg`);
  instagramImagePath = computed(() => `${this.assetsPath()}/usa-icons/instagram.svg`);
  rssFeedImagePath = computed(() => `${this.assetsPath()}/usa-icons/rss_feed.svg`);
}

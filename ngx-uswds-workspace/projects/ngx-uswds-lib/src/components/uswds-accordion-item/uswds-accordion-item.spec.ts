import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsAccordion } from '../uswds-accordion/uswds-accordion';
import { UswdsAccordionItem } from './uswds-accordion-item';

// Test Host Components

@Component({
  standalone: true,
  imports: [UswdsAccordion, UswdsAccordionItem],
  template: `
    <ngx-uswds-accordion variant="bordered">
      <ngx-uswds-accordion-item heading="Rich">
        <p>Hello</p>
        <ul>
          <li>Item</li>
        </ul>
      </ngx-uswds-accordion-item>
    </ngx-uswds-accordion>
  `,
})
class RichContentHost {}

@Component({
  standalone: true,
  imports: [UswdsAccordion, UswdsAccordionItem],
  template: `
    <ngx-uswds-accordion>
      <ngx-uswds-accordion-item heading="Default Level">
        <p>Content</p>
      </ngx-uswds-accordion-item>
    </ngx-uswds-accordion>
  `,
})
class DefaultHeadingLevelHost {}

@Component({
  standalone: true,
  imports: [UswdsAccordion, UswdsAccordionItem],
  template: `
    <ngx-uswds-accordion [headingLevel]="2">
      <ngx-uswds-accordion-item heading="H2 Item">
        <p>Content</p>
      </ngx-uswds-accordion-item>
    </ngx-uswds-accordion>
  `,
})
class HeadingLevel2Host {}

@Component({
  standalone: true,
  imports: [UswdsAccordion, UswdsAccordionItem],
  template: `
    <ngx-uswds-accordion [headingLevel]="3">
      <ngx-uswds-accordion-item heading="H3 Item">
        <p>Content</p>
      </ngx-uswds-accordion-item>
    </ngx-uswds-accordion>
  `,
})
class HeadingLevel3Host {}

@Component({
  standalone: true,
  imports: [UswdsAccordion, UswdsAccordionItem],
  template: `
    <ngx-uswds-accordion [headingLevel]="5">
      <ngx-uswds-accordion-item heading="H5 Item">
        <p>Content</p>
      </ngx-uswds-accordion-item>
    </ngx-uswds-accordion>
  `,
})
class HeadingLevel5Host {}

@Component({
  standalone: true,
  imports: [UswdsAccordion, UswdsAccordionItem],
  template: `
    <ngx-uswds-accordion [headingLevel]="6">
      <ngx-uswds-accordion-item heading="H6 Item">
        <p>Content</p>
      </ngx-uswds-accordion-item>
    </ngx-uswds-accordion>
  `,
})
class HeadingLevel6Host {}

@Component({
  standalone: true,
  imports: [UswdsAccordion, UswdsAccordionItem],
  template: `
    <ngx-uswds-accordion [headingLevel]="3">
      <ngx-uswds-accordion-item heading="Override" [headingLevel]="2">
        <p>Content</p>
      </ngx-uswds-accordion-item>
      <ngx-uswds-accordion-item heading="Default">
        <p>Content</p>
      </ngx-uswds-accordion-item>
    </ngx-uswds-accordion>
  `,
})
class HeadingLevelOverrideHost {}

// Helpers

function getPanel(nativeEl: HTMLElement, index: number): HTMLElement {
  return nativeEl.querySelectorAll('.usa-accordion__content')[index] as HTMLElement;
}

// Test Suite

describe('UswdsAccordionItem', () => {
  describe('Content projection', () => {
    let fixture: ComponentFixture<RichContentHost>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [RichContentHost],
      }).compileComponents();
      fixture = TestBed.createComponent(RichContentHost);
      fixture.detectChanges();
    });

    it('should render projected HTML content', () => {
      const el = fixture.nativeElement;
      const panel = getPanel(el, 0);
      expect(panel.querySelector('p')!.textContent).toBe('Hello');
      expect(panel.querySelector('li')!.textContent).toBe('Item');
    });
  });

  describe('Heading level rendering', () => {
    it('should render h2 wrapper when headingLevel is 2', async () => {
      await TestBed.configureTestingModule({
        imports: [HeadingLevel2Host],
      }).compileComponents();
      const fixture = TestBed.createComponent(HeadingLevel2Host);
      fixture.detectChanges();

      const heading = fixture.nativeElement.querySelector('h2.usa-accordion__heading');
      expect(heading).toBeTruthy();
      expect(heading.querySelector('button')!.textContent!.trim()).toBe('H2 Item');
    });

    it('should render h3 wrapper when headingLevel is 3', async () => {
      await TestBed.configureTestingModule({
        imports: [HeadingLevel3Host],
      }).compileComponents();
      const fixture = TestBed.createComponent(HeadingLevel3Host);
      fixture.detectChanges();

      const heading = fixture.nativeElement.querySelector('h3.usa-accordion__heading');
      expect(heading).toBeTruthy();
      expect(heading.querySelector('button')!.textContent!.trim()).toBe('H3 Item');
    });

    it('should render h4 wrapper by default (headingLevel = 4)', async () => {
      await TestBed.configureTestingModule({
        imports: [DefaultHeadingLevelHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(DefaultHeadingLevelHost);
      fixture.detectChanges();

      const heading = fixture.nativeElement.querySelector('h4.usa-accordion__heading');
      expect(heading).toBeTruthy();
    });

    it('should render h5 wrapper when headingLevel is 5', async () => {
      await TestBed.configureTestingModule({
        imports: [HeadingLevel5Host],
      }).compileComponents();
      const fixture = TestBed.createComponent(HeadingLevel5Host);
      fixture.detectChanges();

      const heading = fixture.nativeElement.querySelector('h5.usa-accordion__heading');
      expect(heading).toBeTruthy();
      expect(heading.querySelector('button')!.textContent!.trim()).toBe('H5 Item');
    });

    it('should render h6 wrapper when headingLevel is 6', async () => {
      await TestBed.configureTestingModule({
        imports: [HeadingLevel6Host],
      }).compileComponents();
      const fixture = TestBed.createComponent(HeadingLevel6Host);
      fixture.detectChanges();

      const heading = fixture.nativeElement.querySelector('h6.usa-accordion__heading');
      expect(heading).toBeTruthy();
      expect(heading.querySelector('button')!.textContent!.trim()).toBe('H6 Item');
    });

    it('should allow an individual item to override the parent headingLevel', async () => {
      await TestBed.configureTestingModule({
        imports: [HeadingLevelOverrideHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(HeadingLevelOverrideHost);
      fixture.detectChanges();

      const el = fixture.nativeElement;
      // First item overrides to h2
      expect(el.querySelector('h2.usa-accordion__heading')).toBeTruthy();
      // Second item inherits parent h3
      expect(el.querySelector('h3.usa-accordion__heading')).toBeTruthy();
    });
  });
});

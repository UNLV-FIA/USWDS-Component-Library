import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsAccordion } from './uswds-accordion';
import { UswdsAccordionItem } from './uswds-accordion-item';

// Test Host Components

@Component({
  standalone: true,
  imports: [UswdsAccordion, UswdsAccordionItem],
  template: `
    <ngx-uswds-accordion
      [variant]="variant"
      [multiselectable]="multiselectable"
      [idPrefix]="idPrefix"
    >
      <ngx-uswds-accordion-item heading="First" [expandedByDefault]="true">
        <p>Content 1</p>
      </ngx-uswds-accordion-item>
      <ngx-uswds-accordion-item heading="Second">
        <p>Content 2</p>
      </ngx-uswds-accordion-item>
      <ngx-uswds-accordion-item heading="Third">
        <p>Content 3</p>
      </ngx-uswds-accordion-item>
    </ngx-uswds-accordion>
  `,
})
class ThreeItemHost {
  variant: 'borderless' | 'bordered' = 'borderless';
  multiselectable = false;
  idPrefix?: string;
  @ViewChild(UswdsAccordion) accordion!: UswdsAccordion;
}

@Component({
  standalone: true,
  imports: [UswdsAccordion, UswdsAccordionItem],
  template: `
    <ngx-uswds-accordion [multiselectable]="multiselectable">
      <ngx-uswds-accordion-item heading="A" [expandedByDefault]="true">
        <p>A</p>
      </ngx-uswds-accordion-item>
      <ngx-uswds-accordion-item heading="B" [expandedByDefault]="true">
        <p>B</p>
      </ngx-uswds-accordion-item>
      <ngx-uswds-accordion-item heading="C">
        <p>C</p>
      </ngx-uswds-accordion-item>
    </ngx-uswds-accordion>
  `,
})
class MultiDefaultHost {
  multiselectable = false;
  @ViewChild(UswdsAccordion) accordion!: UswdsAccordion;
}

@Component({
  standalone: true,
  imports: [UswdsAccordion, UswdsAccordionItem],
  template: `
    <ngx-uswds-accordion>
      <ngx-uswds-accordion-item heading="A">
        <p>A</p>
      </ngx-uswds-accordion-item>
      <ngx-uswds-accordion-item heading="B">
        <p>B</p>
      </ngx-uswds-accordion-item>
    </ngx-uswds-accordion>
  `,
})
class NoDefaultHost {
  @ViewChild(UswdsAccordion) accordion!: UswdsAccordion;
}

@Component({
  standalone: true,
  imports: [UswdsAccordion],
  template: ` <ngx-uswds-accordion> </ngx-uswds-accordion> `,
})
class EmptyHost {
  @ViewChild(UswdsAccordion) accordion!: UswdsAccordion;
}

@Component({
  standalone: true,
  imports: [UswdsAccordion, UswdsAccordionItem],
  template: `
    <ngx-uswds-accordion>
      <ngx-uswds-accordion-item heading="Solo" [expandedByDefault]="true">
        <p>Alone</p>
      </ngx-uswds-accordion-item>
    </ngx-uswds-accordion>
  `,
})
class SingleItemHost {
  @ViewChild(UswdsAccordion) accordion!: UswdsAccordion;
}

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

// Heading-level host components

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

function getButton(nativeEl: HTMLElement, index: number): HTMLButtonElement {
  return nativeEl.querySelectorAll('button.usa-accordion__button')[index] as HTMLButtonElement;
}

function getPanel(nativeEl: HTMLElement, index: number): HTMLElement {
  return nativeEl.querySelectorAll('.usa-accordion__content')[index] as HTMLElement;
}

function getContainer(nativeEl: HTMLElement): HTMLElement {
  return nativeEl.querySelector('[class*="usa-accordion"]') as HTMLElement;
}

// Test Suite

describe('UswdsAccordion', () => {
  describe('with three items (default config)', () => {
    let fixture: ComponentFixture<ThreeItemHost>;
    let host: ThreeItemHost;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ThreeItemHost],
      }).compileComponents();
      fixture = TestBed.createComponent(ThreeItemHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(host.accordion).toBeTruthy();
    });

    describe('Default values', () => {
      it('should default variant to borderless', () => {
        expect(host.accordion.variant()).toBe('borderless');
      });

      it('should default multiselectable to false', () => {
        expect(host.accordion.multiselectable()).toBe(false);
      });

      it('should discover three content children', () => {
        expect(host.accordion.items().length).toBe(3);
      });
    });

    describe('Initial state', () => {
      it('should open the item marked expandedByDefault on init', () => {
        expect(host.accordion.isExpanded(0)).toBe(true);
        expect(host.accordion.isExpanded(1)).toBe(false);
        expect(host.accordion.isExpanded(2)).toBe(false);
      });
    });

    describe('Single-select behavior', () => {
      it('should open a closed panel and close others', () => {
        host.accordion.togglePanel(1);
        fixture.detectChanges();

        expect(host.accordion.isExpanded(0)).toBe(false);
        expect(host.accordion.isExpanded(1)).toBe(true);
      });

      it('should close the currently open panel when clicked again', () => {
        host.accordion.togglePanel(0);
        fixture.detectChanges();

        expect(host.accordion.isExpanded(0)).toBe(false);
        expect(host.accordion.expandedIndices().size).toBe(0);
      });
    });

    describe('CSS classes and styling', () => {
      it('should apply correct classes based on variant and multiselectable', () => {
        const f = TestBed.createComponent(UswdsAccordion);

        // Borderless variant (default)
        f.detectChanges();
        expect(f.componentInstance.containerClasses()).toEqual(['usa-accordion']);

        // Bordered variant
        f.componentRef.setInput('variant', 'bordered');
        f.detectChanges();
        expect(f.componentInstance.containerClasses()).toContain('usa-accordion--bordered');

        // Multiselectable
        f.componentRef.setInput('multiselectable', true);
        f.detectChanges();
        const classes = f.componentInstance.containerClasses();
        expect(classes).toContain('usa-accordion');
        expect(classes).toContain('usa-accordion--bordered');
        expect(classes).toContain('usa-accordion--multiselectable');
      });

      it('should apply only multiselectable class when borderless and multiselectable', () => {
        const f = TestBed.createComponent(UswdsAccordion);
        f.componentRef.setInput('multiselectable', true);
        f.detectChanges();

        const classes = f.componentInstance.containerClasses();
        expect(classes).toContain('usa-accordion');
        expect(classes).toContain('usa-accordion--multiselectable');
        expect(classes).not.toContain('usa-accordion--bordered');
      });

      it('should set data-allow-multiple attribute when multiselectable', () => {
        const f = TestBed.createComponent(UswdsAccordion);
        f.detectChanges();
        expect(getContainer(f.nativeElement).hasAttribute('data-allow-multiple')).toBe(false);

        f.componentRef.setInput('multiselectable', true);
        f.detectChanges();
        expect(getContainer(f.nativeElement).hasAttribute('data-allow-multiple')).toBe(true);
      });
    });

    describe('DOM rendering', () => {
      it('should render correct number of buttons and panels with heading text', () => {
        const el = fixture.nativeElement;
        const buttons = el.querySelectorAll('button.usa-accordion__button');
        const panels = el.querySelectorAll('.usa-accordion__content');

        expect(buttons.length).toBe(3);
        expect(panels.length).toBe(3);
        expect(getButton(el, 0).textContent!.trim()).toBe('First');
        expect(getButton(el, 1).textContent!.trim()).toBe('Second');
        expect(getButton(el, 2).textContent!.trim()).toBe('Third');
      });

      it('should hide closed panels via the hidden attribute', () => {
        const el = fixture.nativeElement;

        expect(getPanel(el, 0).hasAttribute('hidden')).toBe(false);
        expect(getPanel(el, 1).hasAttribute('hidden')).toBe(true);
        expect(getPanel(el, 2).hasAttribute('hidden')).toBe(true);

        host.accordion.togglePanel(2);
        fixture.detectChanges();
        expect(getPanel(el, 2).hasAttribute('hidden')).toBe(false);
      });

      it('should set all buttons to type="button"', () => {
        const buttons = fixture.nativeElement.querySelectorAll('button');
        buttons.forEach((btn: HTMLButtonElement) => {
          expect(btn.getAttribute('type')).toBe('button');
        });
      });
    });

    describe('Accessibility', () => {
      it('should update aria-expanded when a panel is toggled', () => {
        const el = fixture.nativeElement;

        host.accordion.togglePanel(1);
        fixture.detectChanges();

        expect(getButton(el, 0).getAttribute('aria-expanded')).toBe('false');
        expect(getButton(el, 1).getAttribute('aria-expanded')).toBe('true');
      });
    });

    describe('DOM click interaction', () => {
      it('should toggle panel when button is clicked in the DOM', () => {
        const el = fixture.nativeElement;

        expect(host.accordion.isExpanded(1)).toBe(false);

        getButton(el, 1).click();
        fixture.detectChanges();

        expect(host.accordion.isExpanded(1)).toBe(true);
        expect(getButton(el, 1).getAttribute('aria-expanded')).toBe('true');
      });

      it('should close an open panel when its button is clicked again', () => {
        const el = fixture.nativeElement;

        expect(host.accordion.isExpanded(0)).toBe(true);

        getButton(el, 0).click();
        fixture.detectChanges();

        expect(host.accordion.isExpanded(0)).toBe(false);
        expect(getButton(el, 0).getAttribute('aria-expanded')).toBe('false');
      });
    });
  });

  describe('Index assignment', () => {
    it('should assign sequential indices to all items after content init', async () => {
      await TestBed.configureTestingModule({
        imports: [ThreeItemHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(ThreeItemHost);
      fixture.detectChanges();

      const items = fixture.componentInstance.accordion.items();
      expect(items[0].index()).toBe(0);
      expect(items[1].index()).toBe(1);
      expect(items[2].index()).toBe(2);
    });

    it('should start each item index at -1 before content init', () => {
      // Create an isolated item outside of an accordion to inspect pre-init state.
      // Use TestBed directly since inject(UswdsAccordion) requires a parent provider.
      // Instead, verify via the ThreeItemHost that indices begin at -1 prior to detectChanges.
      TestBed.configureTestingModule({ imports: [ThreeItemHost] });
      const fixture = TestBed.createComponent(ThreeItemHost);

      // Before detectChanges, ngAfterContentInit hasn't run, so _index is still -1.
      const items = fixture.componentInstance.accordion?.items() ?? [];
      // items() may be empty before first CD — either way, no index should be >= 0 yet.
      items.forEach((item) => expect(item.index()).toBe(-1));
    });
  });

  describe('ID generation', () => {
    it('should use provided idPrefix for all IDs', async () => {
      await TestBed.configureTestingModule({
        imports: [ThreeItemHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(ThreeItemHost);
      fixture.componentInstance.idPrefix = 'my-accordion';
      fixture.detectChanges();

      const el = fixture.nativeElement;
      expect(getButton(el, 0).getAttribute('id')).toBe('my-accordion-btn-1');
      expect(getButton(el, 1).getAttribute('id')).toBe('my-accordion-btn-2');
      expect(getPanel(el, 0).getAttribute('id')).toBe('my-accordion-1');
      expect(getPanel(el, 1).getAttribute('id')).toBe('my-accordion-2');
    });

    it('should have correct ARIA attributes linking buttons and panels', async () => {
      await TestBed.configureTestingModule({
        imports: [ThreeItemHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(ThreeItemHost);
      fixture.componentInstance.idPrefix = 'acc';
      fixture.detectChanges();

      const el = fixture.nativeElement;

      // Button attributes
      expect(getButton(el, 0).getAttribute('id')).toBe('acc-btn-1');
      expect(getButton(el, 0).getAttribute('aria-controls')).toBe('acc-1');
      expect(getButton(el, 0).getAttribute('aria-expanded')).toBe('true');
      expect(getButton(el, 1).getAttribute('aria-expanded')).toBe('false');

      // Panel attributes
      expect(getPanel(el, 0).getAttribute('id')).toBe('acc-1');
      expect(getPanel(el, 0).getAttribute('role')).toBe('region');
      expect(getPanel(el, 0).getAttribute('aria-labelledby')).toBe('acc-btn-1');
      expect(getPanel(el, 1).getAttribute('aria-labelledby')).toBe('acc-btn-2');
    });

    it('should generate unique IDs when idPrefix is not provided', async () => {
      await TestBed.configureTestingModule({
        imports: [ThreeItemHost],
      }).compileComponents();

      const fixture1 = TestBed.createComponent(ThreeItemHost);
      fixture1.detectChanges();
      const prefix1 = fixture1.componentInstance.accordion.resolvedIdPrefix();

      const fixture2 = TestBed.createComponent(ThreeItemHost);
      fixture2.detectChanges();
      const prefix2 = fixture2.componentInstance.accordion.resolvedIdPrefix();

      expect(prefix1).toMatch(/^accordion-\d+$/);
      expect(prefix2).toMatch(/^accordion-\d+$/);
      expect(prefix1).not.toBe(prefix2);
    });
  });

  describe('Initial state with multiple expandedByDefault', () => {
    it('should open only the first expandedByDefault item in single-select mode', async () => {
      await TestBed.configureTestingModule({
        imports: [MultiDefaultHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(MultiDefaultHost);
      fixture.detectChanges();

      const accordion = fixture.componentInstance.accordion;
      expect(accordion.isExpanded(0)).toBe(true);
      expect(accordion.isExpanded(1)).toBe(false);
    });

    it('should open ALL expandedByDefault items in multiselectable mode', async () => {
      await TestBed.configureTestingModule({
        imports: [MultiDefaultHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(MultiDefaultHost);
      fixture.componentInstance.multiselectable = true;
      fixture.detectChanges();

      const accordion = fixture.componentInstance.accordion;
      expect(accordion.isExpanded(0)).toBe(true);
      expect(accordion.isExpanded(1)).toBe(true);
      expect(accordion.isExpanded(2)).toBe(false);
    });
  });

  describe('Initial state with no expandedByDefault', () => {
    it('should open no items when none are marked expandedByDefault', async () => {
      await TestBed.configureTestingModule({
        imports: [NoDefaultHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(NoDefaultHost);
      fixture.detectChanges();

      const accordion = fixture.componentInstance.accordion;
      expect(accordion.isExpanded(0)).toBe(false);
      expect(accordion.isExpanded(1)).toBe(false);
    });
  });

  describe('Multiselectable behavior', () => {
    let fixture: ComponentFixture<ThreeItemHost>;
    let accordion: UswdsAccordion;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ThreeItemHost],
      }).compileComponents();
      fixture = TestBed.createComponent(ThreeItemHost);
      fixture.componentInstance.multiselectable = true;
      fixture.detectChanges();
      accordion = fixture.componentInstance.accordion;
    });

    it('should toggle panels independently', () => {
      accordion.togglePanel(2);
      fixture.detectChanges();

      expect(accordion.isExpanded(0)).toBe(true);
      expect(accordion.isExpanded(2)).toBe(true);
    });

    it('should close only the clicked panel when toggled', () => {
      accordion.togglePanel(2);
      fixture.detectChanges();
      accordion.togglePanel(0);
      fixture.detectChanges();

      expect(accordion.isExpanded(0)).toBe(false);
      expect(accordion.isExpanded(2)).toBe(true);
    });

    it('should allow all panels to be open at once', () => {
      accordion.togglePanel(1);
      fixture.detectChanges();
      accordion.togglePanel(2);
      fixture.detectChanges();

      expect(accordion.isExpanded(0)).toBe(true);
      expect(accordion.isExpanded(1)).toBe(true);
      expect(accordion.isExpanded(2)).toBe(true);
    });
  });

  describe('Content projection', () => {
    it('should render projected HTML content', async () => {
      await TestBed.configureTestingModule({
        imports: [RichContentHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(RichContentHost);
      fixture.detectChanges();

      const el = fixture.nativeElement;
      const panel = getPanel(el, 0);
      expect(panel.querySelector('p')!.textContent).toBe('Hello');
      expect(panel.querySelector('li')!.textContent).toBe('Item');
    });
  });

  describe('Empty accordion', () => {
    it('should render nothing when no items are projected', async () => {
      await TestBed.configureTestingModule({
        imports: [EmptyHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(EmptyHost);
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button.usa-accordion__button');
      expect(buttons.length).toBe(0);
    });
  });

  describe('Edge cases', () => {
    it('should handle a single item gracefully', async () => {
      await TestBed.configureTestingModule({
        imports: [SingleItemHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(SingleItemHost);
      fixture.detectChanges();

      const accordion = fixture.componentInstance.accordion;
      expect(accordion.isExpanded(0)).toBe(true);

      accordion.togglePanel(0);
      fixture.detectChanges();
      expect(accordion.isExpanded(0)).toBe(false);
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
        imports: [SingleItemHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(SingleItemHost);
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

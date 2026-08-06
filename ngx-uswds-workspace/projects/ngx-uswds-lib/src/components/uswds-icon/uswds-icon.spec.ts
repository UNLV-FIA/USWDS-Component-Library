import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UswdsIcon } from './uswds-icon';

// Test Host Components

@Component({
  standalone: true,
  imports: [UswdsIcon],
  template: `
    <a href="/uswds">
      <ngx-uswds-icon name="twitter"></ngx-uswds-icon>
      USWDS' Twitter account
    </a>
  `,
})
class DecorativeHost {}

@Component({
  standalone: true,
  imports: [UswdsIcon],
  template: `
    <a href="/uswds">
      <ngx-uswds-icon name="twitter" title="USWDS' Twitter account"></ngx-uswds-icon>
    </a>
  `,
})
class DescriptiveHost {}

// Test Suite

describe('UswdsIcon', () => {
  describe('Creation', () => {
    let component: UswdsIcon;
    let fixture: ComponentFixture<UswdsIcon>;
    let el: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [UswdsIcon],
      }).compileComponents();

      fixture = TestBed.createComponent(UswdsIcon);
      component = fixture.componentInstance;
      el = fixture.nativeElement;

      // Provide required prop
      fixture.componentRef.setInput('name', 'home');
      fixture.detectChanges();

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should use default assets path', () => {
      expect(component.assetsPath()).toBe('/assets/img');
    });

    it('should render a svg with usa-icon class', () => {
      expect(el.querySelector('svg.usa-icon')).toBeTruthy();
    });

    it('should render an use element', () => {
      expect(el.querySelector('use')).toBeTruthy();
    });

    it('should use the correct icon path', () => {
      expect(component.iconPath()).toBe('/assets/img/sprite.svg#home');
      const use = el.querySelector('use');
      expect(use!.getAttribute('href')).toBe('/assets/img/sprite.svg#home');
    });

    it('should use the custom assets path', () => {
      fixture.componentRef.setInput('assetsPath', '/custom/path');
      fixture.detectChanges();
      expect(component.iconPath()).toBe('/custom/path/sprite.svg#home');
      const use = el.querySelector('use');
      expect(use!.getAttribute('href')).toBe('/custom/path/sprite.svg#home');
    });
  });

  describe('Sizes', () => {
    let fixture: ComponentFixture<UswdsIcon>;
    let el: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [UswdsIcon],
      }).compileComponents();

      fixture = TestBed.createComponent(UswdsIcon);
      el = fixture.nativeElement;

      // Provide required prop
      fixture.componentRef.setInput('name', 'home');
      fixture.detectChanges();

      await fixture.whenStable();
    });

    it('should change size to 3', () => {
      fixture.componentRef.setInput('size', 3);
      fixture.detectChanges();
      const svg = el.querySelector('svg');
      expect(svg!.classList.contains('usa-icon--size-3')).toBeTruthy();
    });

    it('should change size to 4', () => {
      fixture.componentRef.setInput('size', 4);
      fixture.detectChanges();
      const svg = el.querySelector('svg');
      expect(svg!.classList.contains('usa-icon--size-4')).toBeTruthy();
    });

    it('should change size to 5', () => {
      fixture.componentRef.setInput('size', 5);
      fixture.detectChanges();
      const svg = el.querySelector('svg');
      expect(svg!.classList.contains('usa-icon--size-5')).toBeTruthy();
    });

    it('should change size to 6', () => {
      fixture.componentRef.setInput('size', 6);
      fixture.detectChanges();
      const svg = el.querySelector('svg');
      expect(svg!.classList.contains('usa-icon--size-6')).toBeTruthy();
    });

    it('should change size to 7', () => {
      fixture.componentRef.setInput('size', 7);
      fixture.detectChanges();
      const svg = el.querySelector('svg');
      expect(svg!.classList.contains('usa-icon--size-7')).toBeTruthy();
    });

    it('should change size to 8', () => {
      fixture.componentRef.setInput('size', 8);
      fixture.detectChanges();
      const svg = el.querySelector('svg');
      expect(svg!.classList.contains('usa-icon--size-8')).toBeTruthy();
    });

    it('should change size to 9', () => {
      fixture.componentRef.setInput('size', 9);
      fixture.detectChanges();
      const svg = el.querySelector('svg');
      expect(svg!.classList.contains('usa-icon--size-9')).toBeTruthy();
    });

    it('should throw an error if invalid size is provided', () => {
      fixture.componentRef.setInput('size', 10);
      expect(() => {
        fixture.detectChanges();
      }).toThrowError('Invalid size selected, valid options are 3-9');
    });
  });

  describe('Decorative icon', () => {
    let fixture: ComponentFixture<DecorativeHost>;
    let el: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DecorativeHost],
      }).compileComponents();

      fixture = TestBed.createComponent(DecorativeHost);
      el = fixture.nativeElement;
      fixture.detectChanges();

      await fixture.whenStable();
    });

    it('should have aria-hidden="true"', () => {
      const svg = el.querySelector('svg');
      expect(svg!.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have role="img"', () => {
      const svg = el.querySelector('svg');
      expect(svg!.getAttribute('role')).toBe('img');
    });

    it('should have focusable="false"', () => {
      const svg = el.querySelector('svg');
      expect(svg!.getAttribute('focusable')).toBe('false');
    });

    it('should render accompanied text', () => {
      const a = el.querySelector('a');
      expect(a!.textContent.trim()).toBe("USWDS' Twitter account");
    });
  });

  describe('Descriptive icon', () => {
    let fixture: ComponentFixture<DescriptiveHost>;
    let el: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DescriptiveHost],
      }).compileComponents();

      fixture = TestBed.createComponent(DescriptiveHost);
      el = fixture.nativeElement;
      fixture.detectChanges();

      await fixture.whenStable();
    });

    it('should have role="img"', () => {
      const svg = el.querySelector('svg');
      expect(svg!.getAttribute('role')).toBe('img');
    });

    it('should not have any decorative icon markup', () => {
      const svg = el.querySelector('svg');
      expect(svg!.getAttribute('aria-hidden')).toBeNull();
      expect(svg!.getAttribute('focusable')).toBeNull();
    });

    it('should have a title element', () => {
      expect(el.querySelector('title')).toBeTruthy();
    });

    it('should generate a unique ID for title', () => {
      const id = el.querySelector('title')!.getAttribute('id');
      expect(id).toMatch(/^[a-z_]+-\d+-title$/);
    });

    it('should link the title`s id to the svg`s aria-labelledby', () => {
      const titleId = el.querySelector('title')!.getAttribute('id');
      const svgAriaLabel = el.querySelector('svg')!.getAttribute('aria-labelledby');
      expect(titleId).toEqual(svgAriaLabel);
    });

    it('should render the descriptive text', () => {
      const title = el.querySelector('title');
      expect(title!.textContent).toEqual("USWDS' Twitter account");
    });

    it('should error if the descriptive text is empty', () => {
      const f = TestBed.createComponent(UswdsIcon);
      f.componentRef.setInput('name', 'home');
      f.componentRef.setInput('title', '');
      expect(() => {
        f.detectChanges();
      }).toThrowError('Property "title" cannot be an empty string');
    });
  });
});

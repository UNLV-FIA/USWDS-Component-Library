import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsProcessList } from '../uswds-process-list/uswds-process-list';
import { UswdsProcessListItem } from './uswds-process-list-item';
import { ProcessListHeadingLevel } from '../uswds-process-list/process-list-types';

// Test Host Components

@Component({
  standalone: true,
  imports: [UswdsProcessList, UswdsProcessListItem],
  template: `
    <ngx-uswds-process-list>
      <li ngx-uswds-process-list-item heading="Start a process">
        <p class="margin-top-05">Content 1</p>
        <ul>
          <li>Content List Item 1</li>
        </ul>
      </li>
      <li ngx-uswds-process-list-item heading="Proceed to the second step">
        <img src="example.jpg" alt="Example image" />
      </li>
    </ngx-uswds-process-list>
  `,
})
class RichContentHost {
  @ViewChild(UswdsProcessList) processList!: UswdsProcessList;
  @ViewChildren(UswdsProcessListItem) processListItems!: QueryList<UswdsProcessListItem>;
}

@Component({
  standalone: true,
  imports: [UswdsProcessList, UswdsProcessListItem],
  template: `
    <ngx-uswds-process-list [headingLevel]="headingLevel" [headingClasses]="headingClasses">
      <li ngx-uswds-process-list-item [heading]="heading">
        <p class="margin-top-05">Content 1</p>
      </li>
    </ngx-uswds-process-list>
  `,
})
class OneItemHost {
  // Undefined simulates no value passed to the heading input
  heading: string | undefined;
  headingLevel: ProcessListHeadingLevel = 4;
  headingClasses: string = '';
}

describe('UswdsProcessListItem', () => {
  describe('DOM rendering', () => {
    let fixture: ComponentFixture<RichContentHost>;
    let host: RichContentHost;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [RichContentHost],
      }).compileComponents();

      fixture = TestBed.createComponent(RichContentHost);
      host = fixture.componentInstance;
      await fixture.whenStable();
    });

    it('should create', () => {
      expect(host.processListItems.length).toBe(2);
    });

    it('should render list items with the base class', () => {
      const items = fixture.nativeElement.querySelectorAll(
        'li[ngx-uswds-process-list-item].usa-process-list__item',
      );
      expect(items.length).toBe(2);
    });

    it('should combine base class with additional classes from the class attribute', () => {
      const item: HTMLElement = fixture.nativeElement.querySelector(
        'li[ngx-uswds-process-list-item]',
      );
      expect(item.classList.length).toBe(1);
      item.classList.add('padding-bottom-4');
      fixture.detectChanges();

      expect(item.classList.length).toBe(2);
      expect(item.classList.contains('usa-process-list__item')).toBe(true);
      expect(item.classList.contains('padding-bottom-4')).toBe(true);
    });

    it('should render projected HTML content', () => {
      const p: HTMLElement = fixture.nativeElement.querySelector(
        'li[ngx-uswds-process-list-item] p',
      );
      expect(p.textContent).toBe('Content 1');

      const li: HTMLElement = fixture.nativeElement.querySelector(
        'li[ngx-uswds-process-list-item] ul li',
      );
      expect(li.textContent).toBe('Content List Item 1');

      const img: HTMLElement = fixture.nativeElement.querySelector(
        'li[ngx-uswds-process-list-item] img',
      );
      expect(img).toBeTruthy();
    });
  });

  describe('Heading', () => {
    it('should render h4 with the base class by default', async () => {
      await TestBed.configureTestingModule({
        imports: [RichContentHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(RichContentHost);
      fixture.detectChanges();

      const headings = fixture.nativeElement.querySelectorAll('h4.usa-process-list__heading');
      expect(headings.length).toBe(2);
    });

    it('should use headingClasses from the parent', async () => {
      await TestBed.configureTestingModule({
        imports: [OneItemHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(OneItemHost);
      const host = fixture.componentInstance;

      host.heading = 'Process List Heading';
      host.headingClasses = 'font-sans-xl line-height-sans-1';
      fixture.detectChanges();

      const heading: HTMLElement = fixture.nativeElement.querySelector(
        'h4.usa-process-list__heading',
      );
      expect(heading.classList.length).toBe(3);
      expect(heading.classList.contains('font-sans-xl')).toBe(true);
      expect(heading.classList.contains('line-height-sans-1')).toBe(true);
      expect(heading.classList.contains('usa-process-list__heading')).toBe(true);
    });

    describe('Heading text', () => {
      let fixture: ComponentFixture<OneItemHost>;
      let host: OneItemHost;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [OneItemHost],
        }).compileComponents();

        fixture = TestBed.createComponent(OneItemHost);
        host = fixture.componentInstance;
      });

      it('should not render a heading when heading is not provided', () => {
        host.heading = undefined;
        fixture.detectChanges();
        const heading: HTMLElement = fixture.nativeElement.querySelector(
          '.usa-process-list__heading',
        );
        expect(heading).toBeNull();
      });

      it('should throw an error for a whitespace only string', () => {
        host.heading = ' ';
        expect(() => {
          fixture.detectChanges();
        }).toThrowError("Property 'heading' cannot be an empty string");
      });

      it("should render the heading's text", () => {
        host.heading = 'Process List Heading';
        fixture.detectChanges();
        const heading: HTMLElement = fixture.nativeElement.querySelector(
          'h4.usa-process-list__heading',
        );
        expect(heading.textContent).toBe('Process List Heading');
      });
    });

    describe('Heading level', () => {
      let fixture: ComponentFixture<OneItemHost>;
      let host: OneItemHost;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [OneItemHost],
        }).compileComponents();

        fixture = TestBed.createComponent(OneItemHost);
        host = fixture.componentInstance;
        host.heading = 'Process List Heading';
      });

      it('should render h2 when headingLevel is 2', () => {
        host.headingLevel = 2;
        fixture.detectChanges();
        const heading: HTMLElement = fixture.nativeElement.querySelector(
          'h2.usa-process-list__heading',
        );
        expect(heading).toBeTruthy();
      });

      it('should render h3 when headingLevel is 3', () => {
        host.headingLevel = 3;
        fixture.detectChanges();
        const heading: HTMLElement = fixture.nativeElement.querySelector(
          'h3.usa-process-list__heading',
        );
        expect(heading).toBeTruthy();
      });

      it('should render h4 when headingLevel is 4', () => {
        host.headingLevel = 4;
        fixture.detectChanges();
        const heading: HTMLElement = fixture.nativeElement.querySelector(
          'h4.usa-process-list__heading',
        );
        expect(heading).toBeTruthy();
      });

      it('should render h5 when headingLevel is 5', () => {
        host.headingLevel = 5;
        fixture.detectChanges();
        const heading: HTMLElement = fixture.nativeElement.querySelector(
          'h5.usa-process-list__heading',
        );
        expect(heading).toBeTruthy();
      });

      it('should render h6 when headingLevel is 6', () => {
        host.headingLevel = 6;
        fixture.detectChanges();
        const heading: HTMLElement = fixture.nativeElement.querySelector(
          'h6.usa-process-list__heading',
        );
        expect(heading).toBeTruthy();
      });
    });
  });
});

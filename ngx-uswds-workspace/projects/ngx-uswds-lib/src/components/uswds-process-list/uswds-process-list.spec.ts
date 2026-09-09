import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsProcessList } from './uswds-process-list';
import { UswdsProcessListItem } from '../uswds-process-list-item/uswds-process-list-item';

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
          <li>Content List Item 2</li>
        </ul>
      </li>
      <li ngx-uswds-process-list-item heading="Proceed to the second step">
        <p>Content 2</p>
      </li>
      <li ngx-uswds-process-list-item heading="Complete the step-by-step process">
        <p>Content 3</p>
      </li>
    </ngx-uswds-process-list>
  `,
})
class ThreeItemHost {
  @ViewChild(UswdsProcessList) processList!: UswdsProcessList;
}

@Component({
  standalone: true,
  imports: [UswdsProcessList],
  template: `<ngx-uswds-process-list></ngx-uswds-process-list>`,
})
class EmptyHost {
  @ViewChild(UswdsProcessList) processList!: UswdsProcessList;
}

describe('UswdsProcessList', () => {
  describe('Creation', () => {
    let fixture: ComponentFixture<ThreeItemHost>;
    let host: ThreeItemHost;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ThreeItemHost],
      }).compileComponents();

      fixture = TestBed.createComponent(ThreeItemHost);
      host = fixture.componentInstance;

      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should create', () => {
      expect(host.processList).toBeTruthy();
    });

    it('should render an ordered list with the base class', () => {
      expect(fixture.nativeElement.querySelector('ol.usa-process-list')).toBeTruthy();
    });

    it('should default heading level to 4', () => {
      expect(host.processList.headingLevel()).toBe(4);
    });

    it('should default useHeadingEl to true', () => {
      expect(host.processList.useHeadingEl()).toBe(true);
    });

    it('should discover three content children', () => {
      expect(host.processList.itemList.length).toBe(3);
    });
  });

  describe('Empty process list', () => {
    let fixture: ComponentFixture<EmptyHost>;
    let host: EmptyHost;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [EmptyHost],
      }).compileComponents();

      fixture = TestBed.createComponent(EmptyHost);
      host = fixture.componentInstance;

      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should render nothing when no items are projected', () => {
      const items = fixture.nativeElement.querySelectorAll('li.usa-process-list__item');
      expect(items.length).toBe(0);
    });

    it('should have zero items', () => {
      expect(host.processList.itemList.length).toBe(0);
    });
  });
});

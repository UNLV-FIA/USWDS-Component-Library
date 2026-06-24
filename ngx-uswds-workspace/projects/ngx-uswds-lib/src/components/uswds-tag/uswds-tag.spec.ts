import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsTag } from './uswds-tag';

describe('UswdsTag', () => {
  let component: UswdsTag;
  let fixture: ComponentFixture<UswdsTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsTag],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsTag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  // Test initial tag creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have variant of "default" when created', () => {
    expect(component.variant()).toBe('default');
  });

  // Test the variants
  it('should change to variant to "default" when provided', () => {
    fixture.componentRef.setInput('variant', 'default');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('.usa-tag');
    expect(el.classList.length).toBe(1);
  });

  it('should change to variant to "big" when provided', () => {
    fixture.componentRef.setInput('variant', 'big');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('.usa-tag');
    expect(el.classList.contains('usa-tag--big')).toBe(true);
  });

  it('should throw an error if invalid variant is provided', () => {
    fixture.componentRef.setInput('variant', 'BADVARIANT');
    expect(() => {
      fixture.detectChanges();
    }).toThrowError('Invalid variant selected, valid variants are: [default, big]');
  });
});

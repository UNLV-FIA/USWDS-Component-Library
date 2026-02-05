import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it } from 'vitest';
import { UswdsAlert } from './uswds-alert';

describe('NgxUswdsComponentAlertLib', () => {
  let component: UswdsAlert;
  let fixture: ComponentFixture<UswdsAlert>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsAlert],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsAlert);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('type', 'Informative');
    fixture.componentRef.setInput('headerText', 'Hello There');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeFalsy();
  });

  it('should have the class of Informative assigned', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('.usa-alert');
    expect(el.classList.contains('usa-alert--info')).toBeTruthy();
  });

  it('should change to a Warning when updating the type to Warning', () => {
    fixture.componentRef.setInput('type', 'Warning');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('.usa-alert');
    expect(el.classList.contains('usa-alert--warning')).toBeTruthy();
  });

  it('should change to a Success when updating the type to Success', () => {
    fixture.componentRef.setInput('type', 'Success');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.usa-alert');
    expect(el.classList.contains('usa-alert--success')).toBeTruthy();
  });

  it('should change to an Error when updating the type to Error', () => {
    fixture.componentRef.setInput('type', 'Error');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.usa-alert');
    expect(el.classList.contains('usa-alert--error')).toBeTruthy();
  });

  it('should change to an Emergency when updating the type to Emergency', () => {
    fixture.componentRef.setInput('type', 'Emergency');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.usa-alert');
    expect(el.classList.contains('usa-alert--emergency')).toBeTruthy();
  });

  it('should change to a Slim Alert when adding the slim true element', () => {
    fixture.componentRef.setInput('slimAlert', 'true');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.usa-alert');
    expect(el.classList.contains('usa-alert--slim')).toBeTruthy();
  });

  it('should allow no icons to display when setting setNoIcons to True', () => {
    fixture.componentRef.setInput('setNoIcon', 'true');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.usa-alert');
    expect(el.classList.contains('usa-alert--no-icon')).toBeTruthy();
  });
});

describe('ChkReqProps', () => {
  let fixture: ComponentFixture<UswdsAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsAlert],
    }).compileComponents();
  });

  it('should throw an error if a requiredProp of Type or HeaderText is missing', () => {
    fixture = TestBed.createComponent(UswdsAlert);
    expect(() => {
      fixture.detectChanges();
    }).toThrowError(/NG0950/);
  });

  it('should throw an error if an invalid prop of Type is provided', () => {
    fixture = TestBed.createComponent(UswdsAlert);
    fixture.componentRef.setInput('type', 'badINput');
    fixture.componentRef.setInput('headerText', 'Hello There');
    expect(() => {
      fixture.detectChanges();
    }).toThrowError(
      'Provided Type does exist, valid options: [Informative, Warning, Success, Error, Emergency]',
    );
  });
  it('should throw an error if headerText is empty of Type is provided', () => {
    fixture = TestBed.createComponent(UswdsAlert);
    fixture.componentRef.setInput('type', 'Informational');
    fixture.componentRef.setInput('headerText', '');
    expect(() => {
      fixture.detectChanges();
    }).toThrowError("Propery 'headerText' is required and cannot be an empty string");
  });
});

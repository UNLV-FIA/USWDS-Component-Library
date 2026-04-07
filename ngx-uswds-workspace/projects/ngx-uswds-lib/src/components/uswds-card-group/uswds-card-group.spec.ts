import { TestBed } from '@angular/core/testing';
import { UswdsCardGroup } from './uswds-card-group';
import { Component } from '@angular/core';
import { UswdsCard } from '../uswds-card/uswds-card';

@Component({
  standalone: true,
  imports: [UswdsCardGroup, UswdsCard],
  template: `
    <ngx-uswds-card-group>
      <ngx-uswds-card mediaCardType="None">
        <span card-header>Standard Card</span>
        <span card-body>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore possimus similique nemo
            odit doloremque laudantium?
          </p>
        </span>
      </ngx-uswds-card>

      <ngx-uswds-card mediaCardType="Inset">
        <span card-header>Inset Card</span>
        <span card-body>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore possimus similique nemo
            odit doloremque laudantium?
          </p>
        </span>
      </ngx-uswds-card>
    </ngx-uswds-card-group>
  `,
})
class TestComponent {}

describe('UswdsCardGroup', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();
  });

  it('renders cards', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(2);
  });
});

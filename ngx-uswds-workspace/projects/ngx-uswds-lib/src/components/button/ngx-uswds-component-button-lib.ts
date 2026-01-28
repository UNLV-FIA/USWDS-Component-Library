import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-uswds-button',
  imports: [],
  templateUrl: './ngx-uswds-component-button-lib.html',
  styleUrl: './ngx-uswds-component-button-lib.css',
})
export class UswdsButton implements OnInit{
  text = input.required<string>(); 

  ngOnInit(): void {
    if(!this.text() || this.text().trim() == '') throw new Error("prop 'text' must be defined and cannot be empty string")
  }
}

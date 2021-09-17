import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu : Array<any> = [
    "Mobile", "Link one", "link two"
  ];

	@Input() isMobile = false;

  isMenuOpened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

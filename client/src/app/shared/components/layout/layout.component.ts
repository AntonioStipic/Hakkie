import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  links = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: 'extension',
      label: 'Components',
      path: '/components'
    },
    {
      icon: 'settings',
      label: 'Settings',
      path: '/settings'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

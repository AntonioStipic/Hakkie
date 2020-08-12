import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    // setTimeout(() => this.elementRef.nativeElement.style.setProperty('--navbar-height', '150px'), 3000);
  }

}

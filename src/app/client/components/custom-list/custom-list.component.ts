import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-custom-list',
  moduleId: module.id,
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.css'],
})
export class CustomListComponent implements OnInit {
  @Input()
  list = [];

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  onItemTapped(numDoc) {
    this._router.navigate([`client/${numDoc}`]);
  }
}

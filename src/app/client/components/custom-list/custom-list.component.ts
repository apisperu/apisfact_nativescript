import { Component, OnInit, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-custom-list',
  moduleId: module.id,
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.css'],
})
export class CustomListComponent implements OnInit {
  @Input()
  list = [];

  constructor(private _router: RouterExtensions) {}

  ngOnInit(): void {}

  onItemTapped(numDoc) {
    this._router.navigate([`client/${numDoc}`]);
  }
}

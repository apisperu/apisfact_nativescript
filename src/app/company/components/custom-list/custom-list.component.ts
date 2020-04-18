import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  // onCardTapped() {
  //   console.log('tapped', this.path);
  //   // this._router.navigate([this.path]);
  // }
}

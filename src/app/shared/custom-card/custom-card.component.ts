import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-card',
  moduleId: module.id,
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.css'],
})
export class CustomCardComponent implements OnInit {
  @Input()
  image = '';
  @Input()
  title = '';
  @Input()
  description = '';
  @Input()
  path = '';

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  onCardTapped() {
    this._router.navigate([this.path]);
  }
}

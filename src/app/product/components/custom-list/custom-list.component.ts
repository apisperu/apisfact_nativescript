import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-custom-list',
  moduleId: module.id,
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.css'],
})
export class CustomListComponent implements OnInit {
  @Input()
  list: IProduct[] = [];

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  onItemTapped(codProducto) {
    this._router.navigate([`product/${codProducto}`]);
  }
}

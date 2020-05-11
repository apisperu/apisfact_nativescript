import { Injectable } from '@angular/core';
import { ListComponent } from './list.component';

@Injectable()
export class ListPresenter {
  private view: ListComponent;

  constructor() {}

  setView(view: ListComponent) {
    this.view = view;
  }
}

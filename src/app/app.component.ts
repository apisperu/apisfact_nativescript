import { Component } from "@angular/core";
import { LoaderService } from './core/services/loader.service';
import { Observable } from 'rxjs';

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {
  isLoading: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
  }

  ngAfterViewInit(): void {
    this.isLoading = this.loaderService.loader$;
  }
}

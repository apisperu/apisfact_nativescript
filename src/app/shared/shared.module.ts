import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CustomCardComponent } from './custom-card/custom-card.component';

const components = [CustomCardComponent];
@NgModule({
  imports: [HttpClientModule],
  providers: [],
  declarations: [...components],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [...components],
})
export class SharedModule {}

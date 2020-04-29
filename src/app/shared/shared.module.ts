import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CustomCardComponent } from './custom-card/custom-card.component';
import { SimpleModalComponent } from './simple-modal/simple-modal.component';

const components = [CustomCardComponent, SimpleModalComponent];
@NgModule({
  imports: [HttpClientModule],
  providers: [],
  declarations: [...components],
  entryComponents: [...components],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [...components],
})
export class SharedModule {}

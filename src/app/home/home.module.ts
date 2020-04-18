import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { OnboardingComponent } from './views/onboarding/onboarding.component';
import { SharedModule } from '../shared/shared.module';

const components = [];

@NgModule({
  imports: [NativeScriptCommonModule, HomeRoutingModule, SharedModule],
  declarations: [...components, OnboardingComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeModule {}

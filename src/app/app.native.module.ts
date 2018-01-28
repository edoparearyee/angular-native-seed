import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    StoreModule.forRoot({}),
    AppRoutingModule,
    NativeScriptModule,
    NativeScriptCommonModule,
    TNSCheckBoxModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppNativeModule {}

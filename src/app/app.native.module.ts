import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

import { AppModule } from './app.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [AppModule, NativeScriptModule, TNSCheckBoxModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppNativeModule {}

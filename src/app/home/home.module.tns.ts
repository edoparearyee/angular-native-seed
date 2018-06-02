import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { TodosModule } from '../modules/todos/todos.module';
import { HomeRoutingModule, routedComponents } from './home-routing.module';

@NgModule({
  imports: [NativeScriptCommonModule, TodosModule, HomeRoutingModule],
  declarations: [...routedComponents]
})
export class HomeModule {}

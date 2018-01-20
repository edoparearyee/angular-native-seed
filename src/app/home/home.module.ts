import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosModule } from '../modules/todos/todos.module';
import { HomeRoutingModule, routedComponents } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TodosModule,
    HomeRoutingModule
  ],
  declarations: [
    ...routedComponents
  ]
})
export class HomeModule { }

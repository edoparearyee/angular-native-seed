import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '../material/material.module';
import { reducers } from './store/reducers';
import { TodoListComponent } from './todo-list';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('todos', reducers),
    MaterialModule
  ],
  declarations: [TodoListComponent, TodoComponent],
  exports: [TodoListComponent, TodoComponent]
})
export class TodosModule {}

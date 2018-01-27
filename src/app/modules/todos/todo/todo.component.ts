import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

import { Todo, TodosState } from '../shared';
import { TodosActionTypes } from '../store';

@Component({
  moduleId: module.id,
  selector: 'app-todo',
  templateUrl: 'todo.component.html',
  styleUrls: ['todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {
  /**
   * Todo item to display
   * @type {Todo}
   * @memberof TodoComponent
   */
  @Input() public todo: Todo;
  /**
   * Creates an instance of TodoComponent.
   * @param {Store<TodosState>} store
   * @memberof TodoComponent
   */
  constructor(public store: Store<TodosState>) {}
  /**
   * Mark todo as complete
   * @memberof TodoComponent
   */
  public toggleComplete(): void {
    this.todo.completed
      ? this.store.dispatch({
          type: TodosActionTypes.completeUnset,
          payload: this.todo.id
        })
      : this.store.dispatch({
          type: TodosActionTypes.completeSet,
          payload: this.todo.id
        });
  }
  /**
   * Edit todo item
   * @memberof TodoComponent
   */
  public edit(value): void {
    if (value !== this.todo.text) {
      this.store.dispatch({
        type: TodosActionTypes.edit,
        payload: { id: this.todo.id, text: value }
      });
    }
  }
  /**
   * Delete todo item
   * @memberof TodoComponent
   */
  public delete(): void {
    this.store.dispatch({
      type: TodosActionTypes.delete,
      payload: this.todo.id
    });
  }
}

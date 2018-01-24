import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

import { Todo, TodosState } from '../shared';
import { TodosActionTypes, getTodosLastEditedState } from '../store';

@Component({
  moduleId: module.id,
  selector: 'app-todo',
  templateUrl: 'todo.component.html',
  styleUrls: ['todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements AfterViewInit {
  /**
   * Todo item to display
   * @type {Todo}
   * @memberof TodoComponent
   */
  @Input() public todo: Todo;
  /**
   * Reference to input element in component template
   * @type {ElementRef}
   * @memberof TodoComponent
   */
  @ViewChild('inputText') public inputText: ElementRef;
  /**
   * Creates an instance of TodoComponent.
   * @param {Store<TodosState>} store
   * @memberof TodoComponent
   */
  constructor(public store: Store<TodosState>) {}
  /**
   * Because we are creating a new state on all changes if this todo
   * is being currently being edited the component will be re-rendered
   * and the user will lose focus as a new component is created to
   * reflected the updated state. So we store the id of the last edited
   * todo so when the todo component is re-rendered we focus on the text
   * input element
   * @memberof TodoComponent
   */
  public ngAfterViewInit(): void {
    this.store
      .select(getTodosLastEditedState)
      .pipe(take(1), filter(id => this.todo.id === id))
      .subscribe(id => {
        this.store.dispatch({ type: TodosActionTypes.lastEditedReset });
        this.inputText.nativeElement.focus();
      });
  }
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

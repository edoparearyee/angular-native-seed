import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Todo, TodosState } from '../shared';
import { TodosActionTypes, getTodoListState, getTodosFormInputState } from '../store';
import { filter } from 'rxjs/operators';

@Component({
  moduleId: module.id,
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: [ 'todo-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  /**
   * value of todo form input
   *
   * @type {Observable<string>}
   * @memberof TodoListComponent
   */
  public formInput$: Observable<string>;
  /**
   * List of todos to display
   *
   * @type {Todo[]}
   * @memberof TodoListComponent
   */
  public todos$: Observable<Todo[]>;
  /**
   * Creates an instance of TodoListComponent.
   * @param {Store<TodosState>} store
   * @memberof TodoListComponent
   */
  constructor(private store: Store<TodosState>) { }
  /**
   * Subscribe to todo list state from ngrx store
   *
   * @memberof TodoListComponent
   */
  public ngOnInit(): void {
    this.todos$ = this.store.select(getTodoListState);
    this.formInput$ = this.store.select(getTodosFormInputState);
  }
  /**
   * Add to list of todos
   *
   * @memberof TodoListComponent
   */
  public add(): void {
    this.formInput$.pipe(take(1))
      .subscribe((input) => {
        const item: Todo = { id: null, text: input, completed: false };
        this.store.dispatch({ type: TodosActionTypes.add, payload: item });
        this.store.dispatch({ type: TodosActionTypes.formInputReset });
      });
  }
  /**
   * Send input value to store
   *
   * @param {string} value
   * @memberof TodoListComponent
   */
  public onInputChange(value: string): void {
    this.store.dispatch({ type: TodosActionTypes.formInputSet, payload: value });
  }
}

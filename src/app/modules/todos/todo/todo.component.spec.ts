import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/of';

import { TodoComponent } from './todo.component';
import { Todo } from '../shared/todo.model';
import { TodosActionTypes } from '../index';

let mockStore: { select: jasmine.Spy; dispatch: jasmine.Spy };
let todo: Todo;

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(
    async(() => {
      mockStore = {
        select: jasmine.createSpy('select').and.returnValue(Observable.of(0)),
        dispatch: jasmine.createSpy('dispatch')
      };

      todo = { id: 0, text: 'foo', completed: false };

      TestBed.configureTestingModule({
        providers: [{ provide: Store, useValue: mockStore }],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
        declarations: [TodoComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.todo = todo;
    fixture.detectChanges();
  });

  it('should mark todo as complete', () => {
    component.toggleComplete();
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: TodosActionTypes.completeSet,
      payload: todo.id
    });
  });

  it('should unmark todo as complete', () => {
    component.todo.completed = true;
    mockStore.dispatch.calls.reset();
    component.toggleComplete();
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: TodosActionTypes.completeUnset,
      payload: todo.id
    });
  });

  it('should edit todo text', () => {
    component.edit('bar');
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: TodosActionTypes.edit,
      payload: { id: 0, text: 'bar' }
    });
  });

  it('should NOT edit todo text', () => {
    mockStore.dispatch.calls.reset();
    component.edit('foo');
    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it('should delete todo', () => {
    mockStore.dispatch.calls.reset();
    component.delete();
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: TodosActionTypes.delete,
      payload: 0
    });
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import { TodosActionTypes } from '../index';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockStore: { select: jasmine.Spy; dispatch: jasmine.Spy };

  beforeEach(
    async(() => {
      mockStore = {
        select: jasmine
          .createSpy('select')
          .and.returnValues(
            of([{ id: 0, text: 'foo', completed: false }]),
            of('')
          ),
        dispatch: jasmine.createSpy('dispatch')
      };

      TestBed.configureTestingModule({
        imports: [FormsModule, MaterialModule, NoopAnimationsModule],
        providers: [{ provide: Store, useValue: mockStore }],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
        declarations: [TodoListComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add todo', () => {
    component.formInput$ = of('foo');
    component.add();
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: TodosActionTypes.add,
      payload: { id: null, text: 'foo', completed: false }
    });
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: TodosActionTypes.formInputReset
    });
  });

  it('should update form input', () => {
    component.onInputChange('foo');
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: TodosActionTypes.formInputSet,
      payload: 'foo'
    });
  });

  it('should return todo id', () => {
    const todo = { id: 1, text: 'foo', completed: false };
    const result = component.trackTodo(0, todo);
    expect(result).toBe(1);
  });

  it('should return undefined', () => {
    const todo: any = null;
    const result = component.trackTodo(0, todo);
    expect(result).toBeUndefined();
  });
});

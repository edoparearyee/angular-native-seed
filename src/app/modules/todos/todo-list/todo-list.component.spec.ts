import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/of';

import { TodosActionTypes } from '../index';
import { TodoListComponent } from './todo-list.component';

let mockStore: { select: jasmine.Spy, dispatch: jasmine.Spy };

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  mockStore = {
    select: jasmine.createSpy('select').and.returnValues(
      Observable.of([{ id: 0, text: 'foo', completed: false }]),
      Observable.of('')
    ),
    dispatch: jasmine.createSpy('dispatch')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      providers: [
        { provide: Store, useValue: mockStore }
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [ TodoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add todo', () => {
    component.formInput$ = Observable.of('foo');
    component.add();
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: TodosActionTypes.add,
      payload: { id: null, text: 'foo', completed: false }
    });
    expect(mockStore.dispatch).toHaveBeenCalledWith({ type: TodosActionTypes.formInputReset });
  });

  it('should update form input', () => {
    component.onInputChange('foo');
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: TodosActionTypes.formInputSet,
      payload: 'foo'
    });
  });
});

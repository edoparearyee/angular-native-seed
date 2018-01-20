import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/of';

import { TodoComponent } from './todo.component';
import { Todo } from '../shared/todo.model';

const mockStore = {
  select: jasmine.createSpy('select').and.returnValue(Observable.of(0)),
  dispatch: jasmine.createSpy('dispatch')
};

const todo: Todo =  { id: 0, text: 'foo', completed: false };

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: mockStore }
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [ TodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.todo = todo;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});

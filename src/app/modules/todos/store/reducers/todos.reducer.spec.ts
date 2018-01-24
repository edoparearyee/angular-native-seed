import { Todo, TodosState } from '../../shared';
import * as todosReducer from './todos.reducer';
import * as todosActions from '../actions/todos.actions';

describe('TodosReducer', () => {
  const todo1 = { id: 0, text: 'foo', completed: false };
  const todo2 = { id: 1, text: 'bar', completed: false };
  const todo3 = { id: 2, text: 'baz', completed: false };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = todosReducer.todosReducer(undefined, {} as any);

      expect(result).toEqual(todosReducer.initialState);
    });
  });

  describe('Add', () => {
    it('should add a todo', () => {
      const expected = {
        items: [todo1],
        formInput: '',
        incrementId: 1,
        lastEdited: null
      };
      const action = new todosActions.TodosAdd({ ...todo1, id: null });
      const result = todosReducer.todosReducer(
        todosReducer.initialState,
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Edit', () => {
    it('should edit a todo', () => {
      const state = {
        items: [todo1],
        formInput: '',
        incrementId: 1,
        lastEdited: null
      };

      const expected = {
        items: [{ ...todo1, text: 'foobar' }],
        formInput: '',
        incrementId: 1,
        lastEdited: 0
      };
      const action = new todosActions.TodosEdit({ id: 0, text: 'foobar' });
      const result = todosReducer.todosReducer(state, action);

      expect(result).toEqual(expected);
    });

    it('should reset lasted edit todo', () => {
      const state = {
        items: [todo1],
        formInput: '',
        incrementId: 1,
        lastEdited: 0
      };

      const expected = {
        items: [todo1],
        formInput: '',
        incrementId: 1,
        lastEdited: null
      };
      const action = new todosActions.TodosLastEditedReset();
      const result = todosReducer.todosReducer(state, action);

      expect(result).toEqual(expected);
    });
  });

  describe('Delete', () => {
    it('should delete a todo', () => {
      const state = {
        items: [todo1, todo2, todo3],
        formInput: '',
        incrementId: 3,
        lastEdited: null
      };

      const expected = {
        items: [todo1, todo3],
        formInput: '',
        incrementId: 3,
        lastEdited: null
      };
      const action = new todosActions.TodosDelete(1);
      const result = todosReducer.todosReducer(state, action);

      expect(result).toEqual(expected);
    });
  });

  describe('Complete Set and Unset', () => {
    it('should set complete to true', () => {
      const state = {
        items: [todo1, todo2, todo3],
        formInput: '',
        incrementId: 3,
        lastEdited: null
      };

      const expected = {
        items: [{ ...todo1, completed: true }, todo2, todo3],
        formInput: '',
        incrementId: 3,
        lastEdited: null
      };
      const action = new todosActions.TodosCompleteSet(0);
      const result = todosReducer.todosReducer(state, action);

      expect(result).toEqual(expected);
    });

    it('should set complete to false', () => {
      const state = {
        items: [{ ...todo1, completed: true }, todo2, todo3],
        formInput: '',
        incrementId: 3,
        lastEdited: null
      };

      const expected = {
        items: [{ ...todo1, completed: false }, todo2, todo3],
        formInput: '',
        incrementId: 3,
        lastEdited: null
      };
      const action = new todosActions.TodosCompleteUnset(0);
      const result = todosReducer.todosReducer(state, action);

      expect(result).toEqual(expected);
    });
  });

  describe('Form Input', () => {
    it('should set form input', () => {
      const state = {
        items: [todo1, todo2, todo3],
        formInput: '',
        incrementId: 3,
        lastEdited: null
      };

      const expected = {
        items: [todo1, todo2, todo3],
        formInput: 'foo',
        incrementId: 3,
        lastEdited: null
      };
      const action = new todosActions.TodosFormInputSet('foo');
      const result = todosReducer.todosReducer(state, action);

      expect(result).toEqual(expected);
    });

    it('should reset form input', () => {
      const state = {
        items: [todo1, todo2, todo3],
        formInput: 'foo',
        incrementId: 3,
        lastEdited: null
      };

      const expected = {
        items: [todo1, todo2, todo3],
        formInput: '',
        incrementId: 3,
        lastEdited: null
      };
      const action = new todosActions.TodosFormInputReset();
      const result = todosReducer.todosReducer(state, action);

      expect(result).toEqual(expected);
    });
  });

  describe('Get state values', () => {
    it('should get todo list', () => {
      const state = {
        items: [todo1, todo2, todo3],
        formInput: '',
        incrementId: 3,
        lastEdited: null
      };

      const expected = [todo1, todo2, todo3];
      const result = todosReducer.getTodoItems(state);

      expect(result).toEqual(expected);
    });

    it('should get form input', () => {
      const state = {
        items: [todo1, todo2, todo3],
        formInput: 'foo',
        incrementId: 3,
        lastEdited: null
      };

      const expected = 'foo';
      const result = todosReducer.getTodosFormInput(state);

      expect(result).toEqual(expected);
    });

    it('should get last edited', () => {
      const state = {
        items: [todo1, todo2, todo3],
        formInput: 'foo',
        incrementId: 3,
        lastEdited: 0
      };

      const expected = 0;
      const result = todosReducer.getTodosLastEdited(state);

      expect(result).toEqual(expected);
    });
  });
});

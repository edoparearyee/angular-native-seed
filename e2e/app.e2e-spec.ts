import { AppPage } from './app.po';

describe('angular-native-seed App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should add todo', () => {
    page.addTodo('one');
    const count = page.getTodosCount();
    const text = page.getTodoTextValue(0);
    expect(count).toBe(1);
    expect(text).toEqual('one');
  });

  it('should add multiple todos', () => {
    page.addTodos(['one', 'two', 'three', 'four']);
    const count = page.getTodosCount();
    const text0 = page.getTodoTextValue(0);
    const text1 = page.getTodoTextValue(1);
    const text2 = page.getTodoTextValue(2);
    const text3 = page.getTodoTextValue(3);
    expect(count).toBe(4);
    expect(text0).toEqual('one');
    expect(text1).toEqual('two');
    expect(text2).toEqual('three');
    expect(text3).toEqual('four');
  });

  it('should mark todo as complete', () => {
    page.addTodo('one');
    page.toggleTodoComplete(0);
    const complete = page.isTodoComplete(0);
    expect(complete).toBeTruthy();
  });

  it('should unmark todo as complete', () => {
    page.addTodo('one');
    page.toggleTodoComplete(0);
    page.toggleTodoComplete(0);
    const complete = page.isTodoComplete(0);
    expect(complete).toBeFalsy();
  });

  it('should edit todo', () => {
    page.addTodos(['one', 'two', 'three']);
    page.editTodo(1, 'four');
    const text = page.getTodoTextValue(1);
    expect(text).toEqual('four');
  });

  it('should delete todo', () => {
    page.addTodos(['one', 'two', 'three', 'four']);
    page.deleteTodo(2);
    const count = page.getTodosCount();
    const text0 = page.getTodoTextValue(0);
    const text1 = page.getTodoTextValue(1);
    const text2 = page.getTodoTextValue(2);
    expect(text0).toEqual('one');
    expect(text1).toEqual('two');
    expect(text2).toEqual('four');
  });
});

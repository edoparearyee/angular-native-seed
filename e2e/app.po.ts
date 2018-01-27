import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTodosFormSubmitBtn() {
    return element(by.css('.btn-todos-submit'));
  }

  getTodosFormInput() {
    return element(by.css('input[name="formInput"]'));
  }

  getTodos() {
    return element.all(by.css('app-todo'));
  }

  getTodosCount() {
    return this.getTodos().count();
  }

  getTodoTextInput(i: number) {
    return element.all(by.css(`app-todo .text`)).get(i);
  }

  getTodoDeleteBtn(i: number) {
    return element.all(by.css(`app-todo button[type="button"]`)).get(i);
  }

  getTodoTextValue(i: number) {
    return this.getTodoTextInput(i).getAttribute('value');
  }

  getTodoCompleteCheckbox(i: number) {
    return element.all(by.css(`app-todo input[type="checkbox"]`)).get(i);
  }

  enterInputText(value: string) {
    const input = this.getTodosFormInput();
    return input.sendKeys(value);
  }

  submitForm() {
    const btn = this.getTodosFormSubmitBtn();
    return btn.click();
  }

  toggleTodoComplete(i: number) {
    return this.getTodoCompleteCheckbox(i).click();
  }

  isTodoComplete(i: number) {
    return this.getTodoCompleteCheckbox(i).isSelected();
  }

  addTodo(text: string) {
    this.enterInputText(text);
    return this.submitForm();
  }

  addTodos(texts: string[]) {
    return texts.forEach(text => this.addTodo(text));
  }

  editTodo(i: number, updatedText: string) {
    const todoTextInput = this.getTodoTextInput(i);
    todoTextInput.clear();
    return todoTextInput.sendKeys(updatedText);
  }

  deleteTodo(i: number) {
    const btn = this.getTodoDeleteBtn(i);
    return btn.click();
  }
}

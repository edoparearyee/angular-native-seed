import { Todo } from './todo.model';

export interface TodosState {
  incrementId: number;
  formInput: string;
  lastEdited: number;
  items: Todo[];
}

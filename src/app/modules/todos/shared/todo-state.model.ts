import { Todo } from './todo.model';

export interface TodosState {
  incrementId: number;
  formInput: string;
  items: Todo[];
}

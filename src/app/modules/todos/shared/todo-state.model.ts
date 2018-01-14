import { Todo } from '@app/todos/shared';

export interface TodosState {
  incrementId: number;
  formInput: string;
  lastEdited: number;
  items: Todo[];
}

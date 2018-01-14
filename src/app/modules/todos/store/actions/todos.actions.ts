import { Action } from '@ngrx/store';

import { Todo } from '@app/todos/shared';

export enum TodosActionTypes {
  add =                       '[Todos] Add',
  edit =                      '[Todos] Edit',
  completeSet =               '[Todos] Complete Set',
  completeUnset =             '[Todos] Complete Unset',
  delete =                    '[Todos] Delete',
  formInputSet =              '[Todos] Form Input Set',
  formInputReset =            '[Todos] Form Input Reset'
}

export class TodosAdd implements Action {
  readonly type = TodosActionTypes.add;

  constructor(public payload: Todo) { }
}

export class TodosEdit implements Action {
  readonly type = TodosActionTypes.edit;

  constructor(public payload: { id: number, text: string }) { }
}

export class TodosDelete implements Action {
  readonly type = TodosActionTypes.delete;

  constructor(public payload: number) { }
}

export class TodosCompleteSet implements Action {
  readonly type = TodosActionTypes.completeSet;

  constructor(public payload: number) { }
}

export class TodosCompleteUnset implements Action {
  readonly type = TodosActionTypes.completeUnset;

  constructor(public payload: number) { }
}

export class TodosFormInputSet implements Action {
  readonly type = TodosActionTypes.formInputSet;

  constructor(public payload: string) { }
}

export class TodosFormInputReset implements Action {
  readonly type = TodosActionTypes.formInputReset;
}

export type TodosAction =
  | TodosAdd
  | TodosEdit
  | TodosDelete
  | TodosCompleteSet
  | TodosCompleteUnset
  | TodosFormInputSet
  | TodosFormInputReset;

import { createReducer, on } from '@ngrx/store';
import { setUser, clearUser } from './user.actions';
import { UserState } from './user.selector';

export const initialState: UserState = null;

const createUserReducer = createReducer(
  initialState,
  on(setUser, (_state, { user }): UserState => ({ user })),
  on(clearUser, (_): UserState => null)
);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function userReducer(state, action) {
  return createUserReducer(state, action);
}

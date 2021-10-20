import { createReducer, on } from '@ngrx/store';
import { setUser, clearUser } from './user.actions';
import { User } from 'src/app/models/user';

export const initialState: User = null;

const createUserReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => user),
  on(clearUser, (state) => null)
);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function userReducer(state, action) {
  return createUserReducer(state, action);
}

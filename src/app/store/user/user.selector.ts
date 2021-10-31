import { createSelector } from '@ngrx/store';
import { User } from 'src/app/models/user';

export interface UserState {
  user: User;
}

export const selectUserSelector = (state: UserState) => state.user;

export const selectUser = createSelector(selectUserSelector, (user: User) => user);

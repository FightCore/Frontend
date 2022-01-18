import { createSelector } from '@ngrx/store';
import { User } from 'src/app/models/user';

export interface UserState {
  user: User;
}

export interface ApplicationState {
  user: UserState;
}

export const selectUserSelector = (state: ApplicationState) => state.user;

export const selectUser = createSelector(selectUserSelector, (userState: UserState) => userState?.user);

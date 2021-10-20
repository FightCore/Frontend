import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const setUser = createAction('[User] Set user', props<{ user: User }>());
export const clearUser = createAction('[User] Clear user');

import { Action } from '@ngrx/store';

export let setTheme = { gradient: 'gradient value' };

export class SetTheme implements Action {
    type = setTheme.gradient;
    constructor(public payload: any) {}
}

export type Action = SetTheme;

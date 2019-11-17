import { createAction, props} from '@ngrx/store';

export const profileAction = {
    setTheme: createAction('[Gradient Page] Set Gradients', props<{gradient: number}>())
};

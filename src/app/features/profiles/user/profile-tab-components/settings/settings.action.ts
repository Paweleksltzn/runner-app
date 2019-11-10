import { createAction, props} from '@ngrx/store';

export const setThemeAction = {
    setTheme: createAction('[Gradient Page] Set Gradients', props<{gradient: number}>())
};

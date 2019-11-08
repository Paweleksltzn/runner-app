import { createAction, props} from '@ngrx/store';

export const setTheme = createAction('[Gradient Page] Set Gradients', props<{gradient: any}>());

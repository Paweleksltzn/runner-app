import { createAction, props } from '@ngrx/store';

export const authActions = {
    trainingSecondPassed: createAction('One training second passed', props<{seconds: string, minutes: string}>())
}

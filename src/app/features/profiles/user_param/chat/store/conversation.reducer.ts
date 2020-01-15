import { Action, createReducer, on } from '@ngrx/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { actions } from 'src/app/store';

export const initialState: storeState.ConversationState = {
  conversations: []
};
const conversationReducerOptions = createReducer(
  initialState,
  on(actions.conversationActions.loadConversations, (state, action) => ({ ...state, conversations: action.conversations}))
);
export function conversationReducer(state: storeState.ConversationState | undefined, action: Action) {
  return conversationReducerOptions(state, action);
}

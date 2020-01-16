import { Action, createReducer, on } from '@ngrx/store';
import * as storeState from 'src/app/shared/interfaces/store/index';
import { actions } from 'src/app/store';
import { Conversation } from 'src/app/shared/interfaces/conversation/conversation';

export const initialState: storeState.ConversationState = {
  conversations: []
};
const conversationReducerOptions = createReducer(
  initialState,
  on(actions.conversationActions.loadConversations, (state, action) => ({ ...state, conversations: action.conversations})),
  on(actions.conversationActions.addConversation, (state, action) => {
  const newConversations = [action.conversation, ...state.conversations];
  const newOrderedConversations = orderConversations(newConversations);
  return ({ ...state, conversations: newOrderedConversations});
  }),
  on(actions.conversationActions.addMessage, (state, action) => {
    const conversations = state.conversations;
    conversations.forEach(conversation => {
      if (conversation._id === action.conversationId) {
        conversation.messages.push(action.newMessage);
        conversation.lastEditionDate = new Date();
      }
    });
    const newOrderedConversations = orderConversations(conversations);
    return ({ ...state, conversations: newOrderedConversations});
  }),
  on(actions.conversationActions.getMessage, (state, action) => {
      const conversations = state.conversations;
      let indexToSwap;
      conversations.forEach((conversation, index) => {
        if (conversation._id === action.conversation._id) {
          indexToSwap = index;
        }
      });
      conversations[indexToSwap] = action.conversation;
      const newOrderedConversations = orderConversations(conversations);
      return ({ ...state, conversations: newOrderedConversations});
  }),
  on(actions.conversationActions.displayConversation, (state, action) => {
    const newConversations = state.conversations;
    newConversations.forEach(conversation => {
        if (conversation._id === action.conversationId) {
          conversation.members[action.displayedIndex].isReaded = true;
        }
    });
    return { ...state, conversations: newConversations};
  })
);
export function conversationReducer(state: storeState.ConversationState | undefined, action: Action) {
  return conversationReducerOptions(state, action);
}


function orderConversations(conversations: Conversation[]): Conversation[] {
  conversations.sort((c1, c2) => {
    return new Date(c2.lastEditionDate).getTime() - new Date(c1.lastEditionDate).getTime();
  });
  return conversations;
}

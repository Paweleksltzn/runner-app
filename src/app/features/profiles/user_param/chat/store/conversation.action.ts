import { createAction, props} from '@ngrx/store';
import { Conversation } from 'src/app/shared/interfaces/conversation/conversation';

export const conversationActions = {
    loadConversations: createAction('[Conversations] load all conversations', props<{conversations: Conversation[]}>()),
    addConversation: createAction('[Conversations] add single conversation', props<{conversation: Conversation}>()),
    displayConversation: createAction
    ('[Conversations] conversation was displayed', props<{conversationId: string, displayedIndex: number}>())
};

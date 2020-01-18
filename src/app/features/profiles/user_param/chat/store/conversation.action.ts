import { createAction, props} from '@ngrx/store';
import { Conversation } from 'src/app/shared/interfaces/conversation/conversation';
import { Message } from 'src/app/shared/interfaces/conversation/message';

export const conversationActions = {
    loadConversations: createAction('[Conversations] load all conversations', props<{conversations: Conversation[]}>()),
    addConversation: createAction('[Conversations] add single conversation', props<{conversation: Conversation}>()),
    addMessage: createAction
    ('[Conversations] add message to conversation', props<{newMessage: Message, conversationId: string, isSend?: boolean}>()),
    getMessage: createAction('[Conversations] get single message', props<{conversation: Conversation}>()),
    displayConversation: createAction
    ('[Conversations] conversation was displayed', props<{conversationId: string, displayedIndex: number}>())
};

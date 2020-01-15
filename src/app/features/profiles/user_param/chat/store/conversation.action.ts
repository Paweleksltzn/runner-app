import { createAction, props} from '@ngrx/store';
import { Conversation } from 'src/app/shared/interfaces/conversation/conversation';

export const conversationActions = {
    loadConversations: createAction('[Conversations] load all conversations', props<{conversations: Conversation[]}>())
};

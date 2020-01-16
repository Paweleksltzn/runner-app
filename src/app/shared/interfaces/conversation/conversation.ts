import { Message } from './message';
import { Member } from './member';

export interface Conversation {
    _id?: string;
    lastEditionDate: Date;
    members: Member[];
    messages: Message[];
    userIndex?: number;
}

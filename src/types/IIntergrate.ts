import { IAI } from './IAI';
import { IBotchat } from './IBotChat';
import { IChannel } from './IChannel';

export interface IIntergrate {
    _id: string;
    channel: IChannel;
    ais: IAI[];
    createdAt: string;
    updatedAt: string;
}

export interface IIntergrateAIWithBot {
    _id: string;
    ai: IAI;
    bots: IBotchat[];
    createdAt: string;
    updatedAt: string;
}

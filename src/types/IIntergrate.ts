import { IAI } from './IAI';
import { IBotchat } from './IBotChat';
import { IChannel } from './IChannel';

export interface IIntergrate {
    _id: string;
    bots: IBotchat[];
    channel: IChannel;
    ai: IAI;
    createdAt: string;
    updatedAt: string;
}

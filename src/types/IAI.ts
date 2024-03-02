export const AITypeOptions = {
    realtime: 'realtime',
    scheduled: 'scheduled',
}

export const PromptTypeOptions = {
    default: 'default',
    custom: 'custom',
}

export type AIType = keyof typeof AITypeOptions;

export interface IAI {
    _id: string;
    type: AIType;
    prompt: string;
    createdAt: string;
    updatedAt: string;
}

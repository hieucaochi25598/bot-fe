export interface AddIntergrateRequest {
    channelId: string;
    aiId: string;
    isDeleted?: boolean;
}

export interface AddIntergrateAIWithBotRequest {
    aiId: string;
    botId: string;
    isDeleted?: boolean;
}

export const transformDiscordChannel = (channel: any) => {
    return {
        channelId: channel.id,
        name: channel.name,
    };
};

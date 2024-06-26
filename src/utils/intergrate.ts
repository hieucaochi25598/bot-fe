export const buildInitialNodesChannel = (array: any[], type: string) => {
    let y = -100;
    return array.map((e) => {
        y += 200;
        return {
            id: e._id,
            type: type,
            position: { x: 0, y },
            data: { ...e },
        };
    });
};

export const buildInitialNodesAI = (array: any[], type: string) => {
    let y = -100;
    return array.map((e) => {
        y += 200;
        return {
            id: e._id,
            type: type,
            position: { x: 500, y },
            data: { ...e },
        };
    });
};

export const buildInitialNodesBotChat = (array: any[], type: string) => {
    let y = -100;
    return array.map((e) => {
        y += 200;
        return {
            id: e._id,
            type: type,
            position: { x: 1150, y },
            data: { ...e },
        };
    });
};

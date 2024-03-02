export const buildInitialNodes = (array: any[], type: string) => {
    let y = 0;
    return array.map((e) => {
        y += 150;
        return {
            id: e._id,
            type: type,
            position: { x: 0, y },
            data: { ...e },
        };
    });
};

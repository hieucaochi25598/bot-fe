import type { TableProps } from 'antd';
// import { useFormattedDate } from '../../../../hooks/useFormattedDate';
import { IBotchat } from '../../../../types/IBotChat';

export const useBotChatColumns = () => {
    // const { formattedDate } = useFormattedDate();

    const columns: TableProps<IBotchat>['columns'] = [
        {
            title: 'Token',
            dataIndex: 'token',
            key: 'token',
        },
        {
            title: 'Chat ID',
            dataIndex: 'chatId',
            key: 'chatId',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        // {
        //     title: 'Created At',
        //     dataIndex: 'createdAt',
        //     key: 'createdAt',
        //     render: (_, record) => formattedDate(record.createdAt),
        // },
        // {
        //     title: 'Updated At',
        //     dataIndex: 'updatedAt',
        //     key: 'updatedAt',
        //     render: (_, record) => formattedDate(record.updatedAt),
        // },
    ];

    return {
        columns,
    };
};

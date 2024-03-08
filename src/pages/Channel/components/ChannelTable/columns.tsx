import type { TableProps } from 'antd';
import { useFormattedDate } from '../../../../hooks/useFormattedDate';
import { IChannel } from '../../../../types/IChannel';

export const useChannelColumns = () => {
    const { formattedDate } = useFormattedDate();

    const columns: TableProps<IChannel>['columns'] = [
        {
            title: 'Channel ID',
            dataIndex: 'channelId',
            width: 200,
            key: 'channelId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 300,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, record) => formattedDate(record.createdAt),
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (_, record) => formattedDate(record.updatedAt),
        },
    ];

    return {
        columns,
    };
};

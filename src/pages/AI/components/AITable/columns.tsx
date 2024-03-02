import type { TableProps } from 'antd';
import { useFormattedDate } from '../../../../hooks/useFormattedDate';
import { IAI } from '../../../../types/IAI';

export const useAIColumns = () => {
    const { formattedDate } = useFormattedDate();

    const columns: TableProps<IAI>['columns'] = [
        {
            title: 'Time type',
            dataIndex: 'timeType',
            key: 'timeType',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Prompt',
            dataIndex: 'prompt',
            key: 'prompt',
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

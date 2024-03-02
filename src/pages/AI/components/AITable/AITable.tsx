import React from 'react';
import { Table } from 'antd';
import { useAIColumns } from './columns';
import { RootState } from '../../../../app/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../../../features/channel/channelSlice';

export type AITablePropsTypes = {
    isLoading: boolean;
};

export const AITable: React.FC<AITablePropsTypes> = ({
    isLoading,
}: AITablePropsTypes) => {
    const { columns } = useAIColumns();
    const { ais, total, pageSize } = useSelector(
        (state: RootState) => state.ai
    );
    const dispatch = useDispatch();

    return (
        <Table
            loading={isLoading}
            columns={columns}
            pagination={{
                total,
                pageSize,
                onChange: (page) => {
                    dispatch(setPage(page));
                },
            }}
            dataSource={ais}
            scroll={{ x: 2000 }}
            rowKey="_id"
        />
    );
};

export default AITable;

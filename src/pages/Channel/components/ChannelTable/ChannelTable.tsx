import React from 'react';
import { Table } from 'antd';
import { useChannelColumns } from './columns';
import { RootState } from '../../../../app/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../../../features/channel/channelSlice';

export type ChannelTablePropsTypes = {
    isLoading: boolean;
};

export const ChannelTable: React.FC<ChannelTablePropsTypes> = ({
    isLoading,
}: ChannelTablePropsTypes) => {
    const { columns } = useChannelColumns();
    const { channels, total, pageSize, page } = useSelector(
        (state: RootState) => state.channel
    );
    const dispatch = useDispatch();

    return (
        <Table
            loading={isLoading}
            columns={columns}
            pagination={{
                current: page,
                total,
                pageSize,
                onChange: (page) => {
                    dispatch(setPage(page));
                },
            }}
            dataSource={channels}
            rowKey="_id"
        />
    );
};

export default ChannelTable;

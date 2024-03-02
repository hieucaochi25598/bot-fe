import React from 'react';
import { Table } from 'antd';
import { useBotChatColumns } from './columns';
import { RootState } from '../../../../app/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../../../features/botchat/botChatSlice';

export type BotChatTablePropsTypes = {
    isLoading: boolean;
};

export const BotChatTable: React.FC<BotChatTablePropsTypes> = ({
    isLoading,
}: BotChatTablePropsTypes) => {
    const { columns } = useBotChatColumns();
    const { botChats, total, pageSize } = useSelector(
        (state: RootState) => state.botChat
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
            dataSource={botChats}
            scroll={{ x: 2000 }}
            rowKey="_id"
        />
    );
};

export default BotChatTable;

import React from 'react';
import { Table } from 'antd';
import { useBotChatColumns } from './columns';
import { RootState } from '../../../../app/store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
    setBotChatInformation,
    setPage,
} from '../../../../features/botchat/botChatSlice';
import './BotTable.css';

export type BotChatTablePropsTypes = {
    isLoading: boolean;
};

export const BotChatTable: React.FC<BotChatTablePropsTypes> = ({
    isLoading,
}: BotChatTablePropsTypes) => {
    const { columns } = useBotChatColumns();
    const { botChats, total, pageSize, botChatInformation, page } = useSelector(
        (state: RootState) => state.botChat
    );
    const dispatch = useDispatch();

    return (
        <Table
            onRow={(record, rowIndex) => {
                return {
                    onClick: (event) => {
                        dispatch(setBotChatInformation(record));
                    },
                };
            }}
            rowClassName={(record, index) => {
                return record._id === botChatInformation._id
                    ? 'common-row-active'
                    : 'common-row';
            }}
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
            dataSource={botChats}
            scroll={{ x: 2000 }}
            rowKey="_id"
        />
    );
};

export default BotChatTable;

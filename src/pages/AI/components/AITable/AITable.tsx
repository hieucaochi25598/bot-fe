import React from 'react';
import { Table } from 'antd';
import { useAIColumns } from './columns';
import { RootState } from '../../../../app/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../../../features/ai/aiSlice';
import { setAI } from '../../../../features/ai/aiSlice';
import './AITable.css';

export type AITablePropsTypes = {
    isLoading: boolean;
};

export const AITable: React.FC<AITablePropsTypes> = ({
    isLoading,
}: AITablePropsTypes) => {
    const { columns } = useAIColumns();
    const { ais, aiInformation, total, pageSize, page } = useSelector(
        (state: RootState) => state.ai
    );
    const dispatch = useDispatch();

    return (
        <Table
            onRow={(record, rowIndex) => {
                return {
                    onClick: (event) => {
                        dispatch(setAI(record));
                    },
                };
            }}
            rowClassName={(record, index) => {
                return record._id === aiInformation._id
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
            dataSource={ais}
            rowKey="_id"
        />
    );
};

export default AITable;

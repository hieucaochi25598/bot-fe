import { Table } from 'antd';
import './CustomTable.css';

export interface CustomTableProps<T> {
    columns: any;
    dataSource: T[];
    title?: string;
    style?: React.CSSProperties;
    rowKey: string;
    loading?: boolean;
    pagination?: any;
    scroll?: any;
}

const CustomTable = <T extends object>(props: CustomTableProps<T>) => {
  return (
    <div className="custom-table-container">
      <div className="custom-table-title">{props.title}</div>
      <Table
        columns={props.columns}
        dataSource={props.dataSource}
        rowKey={props.rowKey}
        loading={props.loading}
        pagination={props.pagination}
        scroll={props.scroll}
        className='custom-table'
        rowClassName='custom-table-row'
      />
    </div>
  );
};

export default CustomTable;
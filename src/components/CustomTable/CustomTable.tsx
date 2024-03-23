import { Table, TableProps } from 'antd';
import './CustomTable.css';

interface CustomTableProps extends TableProps {}

const CustomTable = ({ ...props }: CustomTableProps) => {
    return (
        <div className="custom-table-container">
            <Table {...props} />
        </div>
    );
};

export default CustomTable;

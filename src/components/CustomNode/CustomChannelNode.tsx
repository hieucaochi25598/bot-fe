import { Card } from 'antd';
import { Handle, Position } from 'reactflow';

const CustomChannelNode = ({ data }: any) => {
    return (
        <>
            <Card title={data.name} style={{ width: '250px' }}>
                {data.channelId}
            </Card>
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default CustomChannelNode;

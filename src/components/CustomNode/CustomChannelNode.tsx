import { Card } from 'antd';
import { Handle, Position } from 'reactflow';

const CustomChannelNode = ({ data }: any) => {
    console.log(data);
    return (
        <>
            <Card title="Channel">{data.channelId}</Card>
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default CustomChannelNode;

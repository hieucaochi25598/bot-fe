import { Card } from 'antd';
import { Handle, Position } from 'reactflow';

const CustomBotChatNode = ({ data }: any) => {
    return (
        <>
            <Card title="Bot">{data.name}</Card>
            <Handle type="target" position={Position.Left} />
        </>
    );
};

export default CustomBotChatNode;

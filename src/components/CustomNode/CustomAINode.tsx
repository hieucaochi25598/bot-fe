import { Card } from 'antd';
import { Handle, Position } from 'reactflow';

const CustomAINode = ({ data }: any) => {
    return (
        <>
            <Card title="AI Model">{data.prompt}</Card>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default CustomAINode;

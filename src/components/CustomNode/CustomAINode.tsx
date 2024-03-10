import { Handle, Position } from 'reactflow';
import './CustomNode.css';

const CustomAINode = ({ data }: any) => {
    return (
        <>
            <div className="custom-node custom-node-ai" >
                <span>{data.prompt}</span>
            </div>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default CustomAINode;

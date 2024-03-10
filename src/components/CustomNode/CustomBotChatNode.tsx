import { Handle, Position } from 'reactflow';
import './CustomNode.css';

const CustomBotChatNode = ({ data }: any) => {
    return (
        <>
            <div className="custom-node custom-node-bot">
                <span>{data.name}</span>
                <span># {data.type}</span>
            </div>
            <Handle type="target" position={Position.Left} />
        </>
    );
};

export default CustomBotChatNode;

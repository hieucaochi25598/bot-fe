import { Handle, Position } from 'reactflow';
import './CustomNode.css';

const CustomChannelNode = ({ data }: any) => {
    return (
        <>
            <div className="custom-node custom-node-channel">
                <span>{data.channelId}</span>
                <span># {data.name}</span>
            </div>
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default CustomChannelNode;

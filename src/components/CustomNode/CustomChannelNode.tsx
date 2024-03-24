import { Handle, Position } from "reactflow";
import "./CustomNode.css";

const CustomChannelNode = ({ data }: any) => {
    return (
        <>
            <div className="custom-node custom-node-channel">
                <span className="custom-node-channel-name">#{data.name}</span>
                <span>{data.channelId}</span>
            </div>
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default CustomChannelNode;

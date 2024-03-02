import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import { useSelector, useDispatch } from 'react-redux';

import 'reactflow/dist/style.css';
import { fetchChannels } from '../../apis/channel';
import { setChannels } from '../../features/channel/channelSlice';
import { buildInitialNodes } from '../../utils/intergrate';
import { RootState } from '../../app/store/store';
import CustomChannelNode from '../../components/CustomNode/CustomChannelNode';

const IntergrationPage = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { channels } = useSelector((state: RootState) => state.channel);
    const nodeTypes = useMemo(() => ({ channelNode: CustomChannelNode }), []);
    const dispatch = useDispatch();

    const { data: channelsData, isSuccess: isSuccessFetchChannelsData } =
        useQuery({
            queryKey: ['fetchAllChannels'],
            queryFn: () => fetchChannels(),
        });

    useEffect(() => {
        if (isSuccessFetchChannelsData) {
            console.log(channelsData.items);
            dispatch(setChannels(channelsData.items));
        }
    }, [isSuccessFetchChannelsData]);

    useEffect(() => {
        const initialNodesChannel = buildInitialNodes(channels, 'channelNode');
        setNodes(initialNodesChannel);
    }, [channels]);

    const onConnect = useCallback(
        (params: any) => {
            console.log(params);
        },
        [setEdges]
    );

    return (
        <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
        />
    );
};

export default IntergrationPage;

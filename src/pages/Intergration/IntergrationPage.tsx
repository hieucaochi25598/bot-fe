import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import { useSelector, useDispatch } from 'react-redux';

import { fetchChannels } from '../../apis/channel';
import { setChannels } from '../../features/channel/channelSlice';
import {
    buildInitialNodesAI,
    buildInitialNodesBotChat,
    buildInitialNodesChannel,
} from '../../utils/intergrate';
import { RootState } from '../../app/store/store';
import CustomChannelNode from '../../components/CustomNode/CustomChannelNode';
import { fetchBotChats } from '../../apis/botchat';
import { setBotchats } from '../../features/botchat/botChatSlice';
import CustomBotChatNode from '../../components/CustomNode/CustomBotChatNode';
import CustomAINode from '../../components/CustomNode/CustomAINode';
import { fetchAIs } from '../../apis/ai';
import { setAIs } from '../../features/ai/aiSlice';
import { Button, Flex } from 'antd';
import 'reactflow/dist/style.css';
import { fetchIntergrates } from '../../apis/intergrate';

const IntergrationPage = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { channels } = useSelector((state: RootState) => state.channel);
    const { botChats } = useSelector((state: RootState) => state.botChat);
    const { ais } = useSelector((state: RootState) => state.ai);
    const dispatch = useDispatch();

    const nodeTypes = useMemo(
        () => ({
            channelNode: CustomChannelNode,
            botChatNode: CustomBotChatNode,
            aiNode: CustomAINode,
        }),
        []
    );
    const { data: intergratesData, isSuccess: isSuccessFetchIntergratesData } =
        useQuery({
            queryKey: ['fetchAllIntergrates'],
            queryFn: () => fetchIntergrates(),
        });

    const { data: channelsData, isSuccess: isSuccessFetchChannelsData } =
        useQuery({
            queryKey: ['fetchAllChannels'],
            queryFn: () => fetchChannels(),
        });

    const { data: botChatsData, isSuccess: isSuccessFetchBotChatsData } =
        useQuery({
            queryKey: ['fetchAllBotChats'],
            queryFn: () => fetchBotChats(),
        });

    const { data: aisData, isSuccess: isSuccessFetchAIsData } = useQuery({
        queryKey: ['fetchAllAIs'],
        queryFn: () => fetchAIs(),
    });

    useEffect(() => {
        if (isSuccessFetchChannelsData) {
            dispatch(setChannels(channelsData.items));
        }
    }, [dispatch, isSuccessFetchChannelsData, setChannels, channelsData]);

    useEffect(() => {
        if (isSuccessFetchChannelsData) {
            dispatch(setChannels(channelsData.items));
        }
    }, [dispatch, isSuccessFetchChannelsData, setChannels, channelsData]);

    useEffect(() => {
        if (isSuccessFetchBotChatsData) {
            dispatch(setBotchats(botChatsData.items));
        }
    }, [dispatch, isSuccessFetchBotChatsData, setBotchats, botChatsData]);

    useEffect(() => {
        if (isSuccessFetchAIsData) {
            dispatch(setAIs(aisData.items));
        }
    }, [dispatch, isSuccessFetchAIsData, setAIs, aisData]);

    useEffect(() => {
        const initialNodesChannel = buildInitialNodesChannel(
            channels,
            'channelNode'
        );
        const initialNodesBotChat = buildInitialNodesBotChat(
            botChats,
            'botChatNode'
        );
        const initialNodesAI = buildInitialNodesAI(ais, 'aiNode');

        setNodes([
            ...initialNodesChannel,
            ...initialNodesAI,
            ...initialNodesBotChat,
        ]);
    }, [
        channels,
        botChats,
        ais,
        buildInitialNodesChannel,
        buildInitialNodesBotChat,
        buildInitialNodesAI,
        setNodes,
    ]);

    const onConnect = useCallback(
        (params: any) => {
            setEdges((eds) => addEdge(params, eds));
        },
        [setEdges]
    );

    const handleSaveIntergrate = () => {};

    const handleCancelIntergrate = () => {};

    console.log(edges);

    return (
        <>
            <Flex gap="small">
                <Button type="primary" onClick={handleSaveIntergrate}>
                    Save
                </Button>
                <Button onClick={handleCancelIntergrate}>Cancel</Button>
            </Flex>

            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            />
        </>
    );
};

export default IntergrationPage;

import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';
import { useSelector, useDispatch } from 'react-redux';

import 'reactflow/dist/style.css';
import { fetchChannels } from '../../apis/channel';
import { setChannels } from '../../features/channel/channelSlice';
import {
    buildInitialNodesBotChat,
    buildInitialNodesChannel,
} from '../../utils/intergrate';
import { RootState } from '../../app/store/store';
import CustomChannelNode from '../../components/CustomNode/CustomChannelNode';
import { fetchBotChats } from '../../apis/botchat';
import { setBotchats } from '../../features/botchat/botChatSlice';
import CustomBotChatNode from '../../components/CustomNode/CustomBotChatNode';

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
        }),
        []
    );

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
        const initialNodesChannel = buildInitialNodesChannel(
            channels,
            'channelNode'
        );
        const initialNodesBotChat = buildInitialNodesBotChat(
            botChats,
            'botChatNode'
        );

        setNodes([...initialNodesChannel, ...initialNodesBotChat]);
    }, [
        channels,
        botChats,
        buildInitialNodesChannel,
        buildInitialNodesBotChat,
        setNodes,
    ]);

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

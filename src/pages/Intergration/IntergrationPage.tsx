import { useMutation, useQuery } from '@tanstack/react-query';
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
import { createIntergrate, fetchIntergrates } from '../../apis/intergrate';
import {
    addIntergrate,
    setIntergrates,
} from '../../features/intergrate/intergrateSlice';

const IntergrationPage = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { channels } = useSelector((state: RootState) => state.channel);
    const { botChats } = useSelector((state: RootState) => state.botChat);
    const { ais } = useSelector((state: RootState) => state.ai);
    const { intergrates } = useSelector((state: RootState) => state.intergrate);
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
            refetchOnWindowFocus: false,
        });

    const { data: channelsData, isSuccess: isSuccessFetchChannelsData } =
        useQuery({
            queryKey: ['fetchAllChannels'],
            queryFn: () => fetchChannels(),
            refetchOnWindowFocus: false,
        });

    const { data: botChatsData, isSuccess: isSuccessFetchBotChatsData } =
        useQuery({
            queryKey: ['fetchAllBotChats'],
            queryFn: () => fetchBotChats(),
            refetchOnWindowFocus: false,
        });

    const { data: aisData, isSuccess: isSuccessFetchAIsData } = useQuery({
        queryKey: ['fetchAllAIs'],
        queryFn: () => fetchAIs(),
        refetchOnWindowFocus: false,
    });

    const { mutate: mutationCreateIntergrate } = useMutation({
        mutationKey: ['createIntergrate'],
        mutationFn: createIntergrate,
        onSuccess: (data) => {
            dispatch(addIntergrate(data.intergrate));
        },
    });

    useEffect(() => {
        if (isSuccessFetchIntergratesData) {
            dispatch(setIntergrates(intergratesData.items));
        }
    }, [
        dispatch,
        isSuccessFetchIntergratesData,
        setIntergrates,
        intergratesData,
    ]);

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

    useEffect(() => {
        if (intergrates.length !== 0) {
            //Set edge available for flow
            let edge: any[] = [];
            for (const intergrate of intergrates) {
                let intergrateGroup = [];
                const intergrateChannelAndAI = {
                    source: intergrate.channel._id,
                    sourceHandle: null,
                    target: intergrate.ai._id,
                    targetHandle: null,
                    id: `reactflow__edge-${intergrate.channel._id}-${intergrate.ai._id}`,
                    _available: true,
                };

                const intergrateAIAndBots = intergrate.bots.map((bot) => {
                    return {
                        source: intergrate.ai._id,
                        sourceHandle: null,
                        target: bot._id,
                        targetHandle: null,
                        id: `reactflow__edge-${intergrate.ai._id}-${bot._id}`,
                        _available: true,
                    };
                });

                intergrateGroup = [
                    intergrateChannelAndAI,
                    ...intergrateAIAndBots,
                ];

                edge = [...edge, ...intergrateGroup];
            }

            setEdges(edge);
        }
    }, [intergrates, setEdges]);

    const onConnect = useCallback(
        (params: any) => {
            setEdges((eds) => addEdge(params, eds));
        },
        [setEdges]
    );

    const handleSaveIntergrate = () => {
        const edgesCloneDeep = [...edges] as any;
        const newEdges = edgesCloneDeep.filter(
            (e: { _available: boolean }) => !e._available
        );

        let channelId = '';
        let aiId = '';
        let botIds: string[] = [];

        // Iterate through edges array to extract required information
        newEdges.forEach((edge: any, index: number) => {
            if (!channelId) {
                channelId = edge.source;
            }
            if (!aiId && edge.source !== channelId) {
                aiId = edge.source;
            }
            if (index > 0) {
                botIds.push(edge.target);
            }
        });

        // Output the extracted data
        const intergratePostRequest = {
            channelId: channelId,
            aiId: aiId,
            botIds: botIds,
        };

        if (aiId && channelId && botIds) {
            mutationCreateIntergrate(intergratePostRequest);
        }
    };

    const handleCancelIntergrate = () => {
        const edgesCloneDeep = [...edges] as any;
        setEdges([
            ...edgesCloneDeep.filter(
                (e: { _available: boolean }) => e._available
            ),
        ]);
    };

    const isValidConnection = (connection: any) => {
        const { source } = connection;
        const isHaveChannelAndAIEdge = edges.some((e) => e.target === source);
        const isAI = ais.some((ai) => ai._id === source);
        if (!isHaveChannelAndAIEdge && isAI) {
            return false;
        }

        return true;
    };

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
                isValidConnection={isValidConnection}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            />
        </>
    );
};

export default IntergrationPage;

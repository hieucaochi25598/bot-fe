import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';
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
import 'reactflow/dist/style.css';
import {
    createIntergrate,
    createIntergrateAIWithBot,
    fetchIntergrates,
    fetchIntergratesAIWithBot,
} from '../../apis/intergrate';
import {
    setIntergrates,
    setIntergratesAIWithBot,
} from '../../features/intergrate/intergrateSlice';
import './IntergrationPage.css';
import {
    AddIntergrateAIWithBotRequest,
    AddIntergrateRequest,
} from '../../types/request/AddIntergrateRequest';
import { notification } from 'antd';

const IntergrationPage = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { channels } = useSelector((state: RootState) => state.channel);
    const { botChats } = useSelector((state: RootState) => state.botChat);
    const { ais } = useSelector((state: RootState) => state.ai);
    const { intergrates, intergratesAIWithBot } = useSelector(
        (state: RootState) => state.intergrate
    );
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();

    const nodeTypes = useMemo(
        () => ({
            channelNode: CustomChannelNode,
            botChatNode: CustomBotChatNode,
            aiNode: CustomAINode,
        }),
        []
    );

    const {
        data: intergratesData,
        isSuccess: isSuccessFetchIntergratesData,
        refetch: refetchIntergrates,
    } = useQuery({
        queryKey: ['fetchAllIntergrates'],
        queryFn: () => fetchIntergrates(),
        refetchOnWindowFocus: false,
    });

    const {
        data: intergratesAIWithBotData,
        isSuccess: isSuccessFetchIntergratesAIWithBotData,
        refetch: refetchIntergratesAIWithBot,
    } = useQuery({
        queryKey: ['fetchAllIntergratesAIWithBot'],
        queryFn: () => fetchIntergratesAIWithBot(),
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
        onSuccess: () => {
            refetchIntergrates();
            api.success({
                message: 'Success',
                description: 'Intergrate added successfully',
            });
        },
    });

    const { mutate: mutationCreateIntergrateAIWithBot } = useMutation({
        mutationKey: ['createIntergrateAIWithBot'],
        mutationFn: createIntergrateAIWithBot,
        onSuccess: () => {
            refetchIntergratesAIWithBot();
            api.success({
                message: 'Success',
                description: 'Intergrate AI with Bot added successfully',
            });
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
        if (isSuccessFetchIntergratesAIWithBotData) {
            dispatch(setIntergratesAIWithBot(intergratesAIWithBotData.items));
        }
    }, [
        dispatch,
        isSuccessFetchIntergratesAIWithBotData,
        setIntergratesAIWithBot,
        intergratesAIWithBotData,
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
        let edge: any[] = [];

        // Process intergrates
        const edgesFromIntergrates = intergrates.flatMap((intergrate) =>
            intergrate.ais.map((ai) => ({
                source: intergrate.channel._id,
                sourceHandle: null,
                target: ai._id,
                targetHandle: null,
                id: `reactflow__edge-${intergrate.channel._id}-${ai._id}`,
                _available: true,
            }))
        );

        // Process intergratesAIWithBot
        const edgesFromIntergratesAIWithBot = intergratesAIWithBot.flatMap(
            (intergrate) =>
                intergrate.bots.map((bot) => ({
                    source: intergrate.ai._id,
                    sourceHandle: null,
                    target: bot._id,
                    targetHandle: null,
                    id: `reactflow__edge-${intergrate.ai._id}-${bot._id}`,
                    _available: true,
                }))
        );

        // Combine edges from both sources
        edge = [...edgesFromIntergrates, ...edgesFromIntergratesAIWithBot];

        setEdges(edge);
    }, [intergrates, intergratesAIWithBot, setEdges]);

    const onConnect = useCallback(
        (params: any) => {
            const { source, target } = params;
            const channel = channels.find((c) => c._id === source);

            if (channel) {
                const createIntergrateRequest: AddIntergrateRequest = {
                    channelId: source,
                    aiId: target,
                };

                mutationCreateIntergrate(createIntergrateRequest);
            } else {
                const createIntergrateAIWithBotRequest: AddIntergrateAIWithBotRequest =
                    {
                        aiId: source,
                        botId: target,
                    };
                mutationCreateIntergrateAIWithBot(
                    createIntergrateAIWithBotRequest
                );
            }
        },
        [
            setEdges,
            channels,
            mutationCreateIntergrate,
            mutationCreateIntergrateAIWithBot,
        ]
    );

    return (
        <>
            {contextHolder}
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
            />
        </>
    );
};

export default IntergrationPage;

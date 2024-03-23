import { CheckOutlined, SyncOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Flex, notification } from 'antd';
import { Form, Input } from 'antd';
import { useState, useEffect } from 'react';
import {
    createChannel,
    fetchChannelDiscordById,
} from '../../../../apis/channel';
import { useDispatch, useSelector } from 'react-redux';
import {
    addChannel,
    setChannel,
} from '../../../../features/channel/channelSlice';
import { IChannel } from '../../../../types/IChannel';
import { transformDiscordChannel } from '../../../../transform/tranformChannelToRowData';
import { RootState } from '../../../../app/store/store';
import './InputChannel.css';

type FieldType = {
    channelId: string;
};

const InputChannel = () => {
    const [form] = Form.useForm();
    const [inputChannelId, setInputChannelId] = useState<string>();
    const { channel } = useSelector((state: RootState) => state.channel);
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();

    const {
        data: channelData,
        isLoading: isLoadingFetchChannelData,
        isSuccess: isSuccessFetchChannelData,
        isError: isErrorFetchChannelData,
    } = useQuery({
        queryKey: ['fetchChannelDiscordById', inputChannelId],
        queryFn: () => fetchChannelDiscordById(inputChannelId!),
        enabled: !!inputChannelId,
        retry: false,
    });

    const { mutate: mutationCreateChannel } = useMutation({
        mutationKey: ['createChannel'],
        mutationFn: createChannel,
        onSuccess: (data) => {
            dispatch(addChannel(data.channel));
            api.success({
                message: 'Success',
                description: 'Channel added successfully',
            });
        },
        onError: (error) => {
            api.error({
                message: 'Error',
                description: error.message,
            });
        },
    });

    useEffect(() => {
        if (isSuccessFetchChannelData) {
            const channel = transformDiscordChannel(channelData) as IChannel;
            dispatch(setChannel(channel));
        }
    }, [
        isSuccessFetchChannelData,
        channelData,
        dispatch,
        setChannel,
        transformDiscordChannel,
    ]);

    useEffect(() => {
        if (isErrorFetchChannelData) {
        }
    }, [isErrorFetchChannelData, dispatch, setChannel]);

    const handleSubmitFormCheckChannel = () => {
        form.submit();
    };

    const onFinishCheckChannel = (formData: FieldType) => {
        const { channelId } = formData;

        const regex = /\/(\d+)$/;
        const match = channelId.match(regex);

        if (match) {
            const lastPortion = match[1];
            setInputChannelId(lastPortion);
        } else {
        }
    };

    const handleCreateChannel = () => {
        const channelRequest = {
            channelId: channel.channelId,
            name: channel.name,
        };

        mutationCreateChannel(channelRequest);
    };

    return (
        <div className="channel-input-container">
            {contextHolder}
            <div className="channel-input-url">
                <Flex gap="middle">
                    <Form
                        name="basic"
                        form={form}
                        style={{ width: '100%' }}
                        onFinish={onFinishCheckChannel}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType> name="channelId">
                            <Input
                                className="input-url-channelId"
                                placeholder="DISCORD URL / CHANNEL ID"
                            />
                        </Form.Item>
                    </Form>
                    <Button
                        disabled={isLoadingFetchChannelData}
                        className="check-btn"
                        onClick={handleSubmitFormCheckChannel}
                    >
                        {isLoadingFetchChannelData ? (
                            <SyncOutlined spin />
                        ) : (
                            <CheckOutlined />
                        )}
                    </Button>
                </Flex>
            </div>
            <div className="channel-information">
                <div className="channel-information-id">
                    <label>CHANNEL ID: </label>
                    <span>{channel.channelId}</span>
                </div>
                <div className="channel-information-name">
                    <label>CHANNEL NAME: </label>
                    <span>{channel.name}</span>
                </div>
                {Object.keys(channel).length !== 0 && (
                    <Button
                        className="save-channel-btn"
                        onClick={handleCreateChannel}
                    >
                        ADD
                    </Button>
                )}
            </div>
        </div>
    );
};

export default InputChannel;

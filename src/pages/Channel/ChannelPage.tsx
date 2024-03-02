import ChannelTable from './components/ChannelTable/ChannelTable';
import { Button, Flex } from 'antd';
import { createChannel, fetchChannels } from '../../apis/channel';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import {
    addChannel,
    setChannels,
    setTotal,
} from '../../features/channel/channelSlice';
import { PlusOutlined } from '@ant-design/icons';
import GeneralModal from '../../components/Modal/GeneralModal';
import { Form, Input } from 'antd';
import { IAddChannelFormData } from '../../types/form/IAddChannelFormData';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';

type FieldType = {
    channelId: string;
    type: string;
    name: string;
};

const ChannelPage = () => {
    const [isOpenAddChannelModal, setIsOpenAddChannelModal] =
        useState<boolean>(false);
    const [form] = Form.useForm();
    const { page, pageSize } = useSelector((state: RootState) => state.channel);
    const dispatch = useDispatch();

    const {
        data: channelsData,
        isLoading: isLoadingFetchChannelsData,
        isSuccess: isSuccessFetchChannelsData,
    } = useQuery({
        queryKey: ['fetchChannels', page],
        queryFn: () => fetchChannels({ page, pageSize }),
        placeholderData: keepPreviousData,
    });

    const { mutate: mutationCreateChannel } = useMutation({
        mutationKey: ['createChannel'],
        mutationFn: createChannel,
        onSuccess: (data) => {
            handleCancelAddChannelModal();
            dispatch(addChannel(data.channel));
        },
    });

    useEffect(() => {
        if (isSuccessFetchChannelsData) {
            dispatch(setChannels(channelsData.items));
            dispatch(setTotal(channelsData.totalCount));
        }
    }, [
        isSuccessFetchChannelsData,
        channelsData,
        dispatch,
        setChannels,
        setTotal,
    ]);

    const handleOpenAddChannelModal = () => {
        setIsOpenAddChannelModal(true);
    };

    const handleOkClickAddChannelModal = () => {
        form.submit();
    };

    const handleCancelAddChannelModal = () => {
        setIsOpenAddChannelModal(false);
        form.resetFields();
    };

    const onSubmitAddChannelForm = (formData: IAddChannelFormData) => {
        mutationCreateChannel(formData);
    };

    return (
        <>
            <Flex gap="large" vertical>
                <Flex justify="flex-end" align="center">
                    <Button type="primary" onClick={handleOpenAddChannelModal}>
                        {' '}
                        <PlusOutlined />
                        Add Channel
                    </Button>
                </Flex>
                <GeneralModal
                    title="Add Channel"
                    isOpen={isOpenAddChannelModal}
                    onOk={handleOkClickAddChannelModal}
                    onCancel={handleCancelAddChannelModal}
                >
                    <Form
                        name="basic"
                        form={form}
                        style={{ maxWidth: 600 }}
                        onFinish={onSubmitAddChannelForm}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item<FieldType>
                            label="Channel ID"
                            name="channelId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your channel id',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType> label="Type" name="type">
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType> label="Name" name="name">
                            <Input />
                        </Form.Item>
                    </Form>
                </GeneralModal>
                <ChannelTable isLoading={isLoadingFetchChannelsData} />
            </Flex>
        </>
    );
};

export default ChannelPage;

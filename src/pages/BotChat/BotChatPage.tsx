import { Button, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { setTotal } from '../../features/botchat/botChatSlice';
import { PlusOutlined } from '@ant-design/icons';
import GeneralModal from '../../components/Modal/GeneralModal';
import { Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { createBotChat, fetchBotChats } from '../../apis/botchat';
import { addBotchat, setBotchats } from '../../features/botchat/botChatSlice';
import { AddBotChatFormData } from '../../types/form/AddBotChatFormData';
import BotChatTable from './components/BotChatTable/ChannelTable';

type FieldType = {
    token: string;
    chatId: string;
    type: string;
    name: string;
};

const BotChatPage = () => {
    const [isOpenAddBotChatModal, setIsOpenAddBotChatModal] =
        useState<boolean>(false);
    const [form] = Form.useForm();
    const { page, pageSize } = useSelector((state: RootState) => state.botChat);
    const dispatch = useDispatch();

    const {
        data: botChatsData,
        isLoading: isLoadingFetchBotChatsData,
        isSuccess: isSuccessFetchBotChatsData,
        isError: isErrorFetchBotChatsData,
    } = useQuery({
        queryKey: ['fetchBotChats', page],
        queryFn: () => fetchBotChats({ page, pageSize }),
        placeholderData: keepPreviousData,
    });

    const { mutate: mutationCreateBotChat } = useMutation({
        mutationKey: ['createBotChat'],
        mutationFn: createBotChat,
        onSuccess: (data) => {
            handleCancelAddBotChatModal();
            dispatch(addBotchat(data.bot));
        },
    });

    useEffect(() => {
        if (isSuccessFetchBotChatsData) {
            dispatch(setBotchats(botChatsData.items));
            dispatch(setTotal(botChatsData.totalCount));
        }
    }, [isSuccessFetchBotChatsData, botChatsData]);

    useEffect(() => {
        if (isErrorFetchBotChatsData) {
        }
    }, [isErrorFetchBotChatsData]);

    const handleOpenAddBotChatModal = () => {
        setIsOpenAddBotChatModal(true);
    };

    const handleOkClickAddBotChatModal = () => {
        form.submit();
    };

    const handleCancelAddBotChatModal = () => {
        setIsOpenAddBotChatModal(false);
        form.resetFields();
    };

    const onSubmitAddChatBotForm = (formData: AddBotChatFormData) => {
        mutationCreateBotChat(formData);
    };

    return (
        <>
            <Flex gap="large" vertical>
                <Flex justify="flex-end" align="center">
                    <Button type="primary" onClick={handleOpenAddBotChatModal}>
                        {' '}
                        <PlusOutlined />
                        Add Bot
                    </Button>
                </Flex>
                <GeneralModal
                    title="Add Bot"
                    isOpen={isOpenAddBotChatModal}
                    onOk={handleOkClickAddBotChatModal}
                    onCancel={handleCancelAddBotChatModal}
                >
                    <Form
                        name="basic"
                        form={form}
                        style={{ maxWidth: 600 }}
                        onFinish={onSubmitAddChatBotForm}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item<FieldType>
                            label="Token"
                            name="token"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input token',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Chat ID"
                            name="chatId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input chat ID',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input type',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input name',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </GeneralModal>
                <BotChatTable isLoading={isLoadingFetchBotChatsData} />
            </Flex>
        </>
    );
};

export default BotChatPage;

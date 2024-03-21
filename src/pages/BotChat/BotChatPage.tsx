import { Button, Flex } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { setTotal } from "../../features/botchat/botChatSlice";
import GeneralModal from "../../components/Modal/GeneralModal";
import { Form, Input } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { createBotChat, fetchBotChats } from "../../apis/botchat";
import { addBotchat, setBotchats } from "../../features/botchat/botChatSlice";
import { AddBotChatFormData } from "../../types/form/AddBotChatFormData";
import BotChatTable from "./components/BotChatTable/BotTable";
import BotInformation from "./components/BotInformation/BotInformation";
import "./BotChatPage.css";

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
  } = useQuery({
    queryKey: ["fetchBotChats", page],
    queryFn: () => fetchBotChats({ page, pageSize }),
    placeholderData: keepPreviousData,
  });

  const { mutate: mutationCreateBotChat } = useMutation({
    mutationKey: ["createBotChat"],
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
  }, [
    isSuccessFetchBotChatsData,
    botChatsData,
    dispatch,
    setBotchats,
    setTotal,
  ]);

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
      <Flex
        align="center"
        justify="space-between"
        style={{ marginBottom: "20px" }}
      >
        <span
          style={{ fontSize: 24, fontWeight: 400, fontFamily: "Staatliches" }}
        >
          #Bot
        </span>
        <div className="btn-group">
          <div className="rotate-container"></div>
          <Button
            className="add-bot-btn"
            onClick={handleOpenAddBotChatModal}
            style={{
              fontFamily: "Staatliches",
              fontSize: 16,
              fontWeight: 400,
              color: "#ffffff",
            }}
          >
            ADD
          </Button>
        </div>
      </Flex>

      <BotInformation />
      <BotChatTable isLoading={isLoadingFetchBotChatsData} />

      <GeneralModal
        className="add-bot-modal"
        isOpen={isOpenAddBotChatModal}
        onOk={handleOkClickAddBotChatModal}
        okText="SAVE"
        cancelText="CANCEL"
        onCancel={handleCancelAddBotChatModal}
      >
        <div className="title-group">
          <div className="rotate-title-container"></div>
          <Button className="title-add-bot-modal">NEW BOT</Button>
        </div>
        <div className="add-bot-modal-content-container">
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
                  message: "Please input token",
                },
              ]}
            >
              <Input placeholder="Token" className="input-add-bot" />
            </Form.Item>
            <Form.Item<FieldType>
              label="Chat ID"
              name="chatId"
              rules={[
                {
                  required: true,
                  message: "Please input chat ID",
                },
              ]}
            >
              <Input placeholder="Chat ID" className="input-add-bot" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input type",
                },
              ]}
            >
              <Input placeholder="Type" className="input-add-bot" />
            </Form.Item>
            <Form.Item<FieldType>
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input name",
                },
              ]}
            >
              <Input placeholder="Name" className="input-add-bot" />
            </Form.Item>
          </Form>
        </div>
      </GeneralModal>
    </>
  );
};

export default BotChatPage;

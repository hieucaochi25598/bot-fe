import AITable from "./components/AITable/AITable";
import type { DatePickerProps, TimePickerProps } from "antd";
import { Button, DatePicker, Flex, Select, Tabs, TimePicker } from "antd";
import { createAI, fetchAIs } from "../../apis/ai";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { addAI, setAIs, setTotal } from "../../features/ai/aiSlice";
import GeneralModal from "../../components/Modal/GeneralModal";
import { Form, Input } from "antd";
import { IAddAIFormData } from "../../types/form/IAddAIFormData";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import TabPane from "antd/es/tabs/TabPane";
import { AITypeOptions, PromptTypeOptions } from "../../types/IAI";
import AIInformation from "./components/AIInformation/AIInformation";
import "./AIPage.css";
type PickerType = "time" | "date";

// type FieldType = {
//     timeType: string;
//     prompt: string;
//     time: string;
// };

const DEFAULT_PROMPT = "Please summarize below text in 1-2 sentences.";

const PickerWithType = ({
    type,
    onChange,
}: {
    type: PickerType;
    onChange: TimePickerProps["onChange"] | DatePickerProps["onChange"];
}) => {
    if (type === "time") return <TimePicker onChange={onChange} />;
    if (type === "date") return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
};

const AIPage = () => {
    const [isOpenAddAIModal, setIsOpenAddAIModal] = useState<boolean>(false);
    useState<boolean>(false);
    const [form] = Form.useForm();
    const { page, pageSize } = useSelector((state: RootState) => state.ai);
    const dispatch = useDispatch();
    const [timeActiveTab, setTimeActiveTab] = useState(AITypeOptions.realtime);
    const [promptActiveTab, setPromptActiveTab] = useState(
        PromptTypeOptions.default
    );

    const onTimeTabChange = (
        activeKey: (typeof AITypeOptions)[keyof typeof AITypeOptions]
    ) => {
        form.setFieldValue("timeType", activeKey);
        setTimeActiveTab(activeKey);
    };

    const onPromptTabChange = (
        activeKey: (typeof PromptTypeOptions)[keyof typeof PromptTypeOptions]
    ) => {
        if (activeKey === PromptTypeOptions.default) {
            form.setFieldValue("prompt", DEFAULT_PROMPT);
        }
        setPromptActiveTab(activeKey);
    };

    const {
        data: AIsData,
        isLoading: isLoadingFetchAIsData,
        isSuccess: isSuccessFetchAIsData,
        isError: isErrorFetchAIsData,
    } = useQuery({
        queryKey: ["fetchAIs", page],
        queryFn: () => fetchAIs({ page, pageSize }),
        placeholderData: keepPreviousData,
    });

    const { mutate: mutationCreateAI } = useMutation({
        mutationKey: ["createAI"],
        mutationFn: createAI,
        onSuccess: (data) => {
            handleCancelAddAIModal();
            dispatch(addAI(data.AIModel));
        },
    });

    useEffect(() => {
        if (isSuccessFetchAIsData) {
            dispatch(setAIs(AIsData.items));
            dispatch(setTotal(AIsData.totalCount));
        }
    }, [isSuccessFetchAIsData, AIsData, dispatch]);

    useEffect(() => {
        if (isErrorFetchAIsData) {
        }
    }, [isErrorFetchAIsData]);

    const handleOpenAddAIModal = () => {
        setIsOpenAddAIModal(true);
    };

    const handleOkClickAddAIModal = () => {
        form.submit();
    };

    const handleCancelAddAIModal = () => {
        setIsOpenAddAIModal(false);
        form.resetFields();
    };

    const onSubmitAddAIForm = (formData: IAddAIFormData) => {
        mutationCreateAI(formData);
    };

    return (
        <>
            <Flex
                gap="large"
                vertical
                justify="space-between"
            >
                <Flex justify="space-between" align="center">
                    <span
                        style={{ fontSize: 24, fontWeight: 400, fontFamily: "Staatliches" }}
                    >
                        #AI MODEL
                    </span>

                    <Button className="add-ai-btn"
                        style={{
                            fontFamily: "Staatliches",
                            fontSize: 16,
                            fontWeight: 400,
                            color: "#ffffff",
                        }}
                        onClick={handleOpenAddAIModal}>
                        ADD
                    </Button>
                </Flex>
                <AIInformation />
                <AITable isLoading={isLoadingFetchAIsData} />
                <GeneralModal
                    className="add-ai-modal"
                    isOpen={isOpenAddAIModal}
                    onOk={handleOkClickAddAIModal}
                    onCancel={handleCancelAddAIModal}
                >
                    <div className="title-group">
                        <div className="rotate-title-container"></div>
                        <Button className="title-add-ai-modal">NEW AI</Button>
                    </div>
                    <div className="add-ai-modal-content-container">
                        <Form form={form} onFinish={onSubmitAddAIForm}>
                            <Tabs
                                defaultActiveKey={AITypeOptions.realtime}
                                onChange={onTimeTabChange}
                            >
                                <TabPane tab="Realtime" key={AITypeOptions.realtime} />
                                <TabPane tab="Scheduled" key={AITypeOptions.scheduled} />
                            </Tabs>

                            <Form.Item
                                name="timeType"
                                hidden
                                initialValue={AITypeOptions.realtime}
                            />

                            {timeActiveTab === AITypeOptions.scheduled && (
                                <Form.Item
                                    name="time"
                                    label="Scheduled Time"
                                    rules={[
                                        {
                                            required: timeActiveTab === AITypeOptions.scheduled,
                                            message: "Time is required",
                                        },
                                    ]}
                                >
                                    <PickerWithType
                                        type="time"
                                        onChange={(_time, timeString) =>
                                            form.setFieldsValue({
                                                time: timeString,
                                            })
                                        }
                                    />
                                </Form.Item>
                            )}

                            <Tabs defaultActiveKey="default" onChange={onPromptTabChange}>
                                <TabPane tab="Default Prompt" key={PromptTypeOptions.default} />
                                <TabPane tab="Custom Prompt" key={PromptTypeOptions.custom} />
                            </Tabs>

                            {promptActiveTab === PromptTypeOptions.default && (
                                <Form.Item
                                    name="prompt"
                                    label="Prompt"
                                    initialValue={DEFAULT_PROMPT}
                                >
                                    <Select className="input-add-ai">
                                        <Select.Option value={DEFAULT_PROMPT}>
                                            Please summarize below text in 1-2 sentences.
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            )}

                            {promptActiveTab === PromptTypeOptions.custom && (
                                <Form.Item
                                    name="prompt"
                                    label="Prompt"
                                    rules={[
                                        {
                                            required: promptActiveTab === PromptTypeOptions.custom,
                                            message: "Custom prompt is required",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            )}
                        </Form>
                    </div>
                </GeneralModal>
            </Flex>
        </>
    );
};

export default AIPage;

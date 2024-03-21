import { useSelector } from "react-redux";
import { Flex } from "antd";
import { RootState } from "../../../../app/store/store";
import "./BotInformation.css";

const BotInformation = () => {
    const { botChatInformation } = useSelector(
        (state: RootState) => state.botChat
    );

    return (
        <div className="bot-information-container">
            <Flex gap="middle" justify="space-between">
                <div
                    className="bot-information-img"
                    style={{ width: 223, height: 200 }}
                >
                    <img src="/bot.png" alt="bot-img" />
                </div>
                <Flex className="bot-information" vertical gap="middle">
                    <div className="bot-information-name">
                        <span>NAME</span>
                        <span>{botChatInformation.name}</span>
                    </div>
                    <div className="bot-information-token">
                        <Flex justify="space-between">
                            <span>TOKEN</span>
                            <span>{botChatInformation.token}</span>
                        </Flex>
                    </div>
                    <div className="bot-information-chat-id">
                        <Flex justify="space-between">
                            <span>CHAT ID</span>
                            <span>{botChatInformation.chatId}</span>
                        </Flex>
                    </div>
                    <div className="bot-information-type">
                        <Flex justify="space-between">
                            <span>TYPE</span>
                            <span>{botChatInformation.type}</span>
                        </Flex>
                    </div>
                </Flex>
            </Flex>
        </div>
    );
};

export default BotInformation;

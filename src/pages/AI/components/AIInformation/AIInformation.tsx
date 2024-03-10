import { useSelector } from 'react-redux';
import { Flex } from 'antd';
import { RootState } from '../../../../app/store/store';
import './AIInformation.css';
import { useFormattedDate } from '../../../../hooks/useFormattedDate';
import { OpenAIOutlined } from '@ant-design/icons';

const AIInformation = () => {
    const { aiInformation } = useSelector((state: RootState) => state.ai);

    const { formattedDate } = useFormattedDate();

    return (
        <div className="ai-information-container">
            <Flex gap="middle" justify="space-between">
                <div className="ai-information-icon">
                    <OpenAIOutlined />
                </div>
                <Flex className="ai-information" vertical gap="middle">
                    {Object.keys(aiInformation).length !== 0 && (
                        <div className="ai-information-prompt">
                            {aiInformation.prompt}
                        </div>
                    )}
                    <div className="ai-information-createdAt">
                        <Flex justify="space-between">
                            <span>TIME TYPE</span>
                            <span>{aiInformation.timeType}</span>
                        </Flex>
                    </div>
                    <div className="ai-information-createdAt">
                        <Flex justify="space-between">
                            <span>CREATED AT</span>
                            <span>
                                {formattedDate(aiInformation.createdAt)}
                            </span>
                        </Flex>
                    </div>
                    <div className="ai-information-updatedAt">
                        <Flex justify="space-between">
                            <span>UPDATED AT</span>
                            <span>
                                {formattedDate(aiInformation.updatedAt)}
                            </span>
                        </Flex>
                    </div>
                </Flex>
            </Flex>
        </div>
    );
};

export default AIInformation;

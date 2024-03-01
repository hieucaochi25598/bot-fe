import { LoadingOutlined } from '@ant-design/icons';
import './LoadingMask.css';
import { Spin } from 'antd';

const LoadingMask = () => {
    return (
        <div className="block-ui-loading-mask">
            <Spin
                className="spin-loading"
                indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />}
            />
        </div>
    );
};

export default LoadingMask;

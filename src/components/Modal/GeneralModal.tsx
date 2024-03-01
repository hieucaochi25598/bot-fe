import { Modal } from 'antd';
import { ReactNode } from 'react';

type GeneralModalPropsType = {
    children: ReactNode;
    isOpen: boolean;
    title?: string;
    onOk: () => void;
    onCancel: () => void;
};
const GeneralModal = ({
    children,
    title,
    isOpen,
    onOk,
    onCancel,
}: GeneralModalPropsType) => {
    return (
        <Modal
            title={title}
            open={isOpen}
            onOk={onOk}
            onCancel={onCancel}
            okButtonProps={{ htmlType: 'submit' }}
        >
            {children}
        </Modal>
    );
};

export default GeneralModal;

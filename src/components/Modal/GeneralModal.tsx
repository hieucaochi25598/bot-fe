import { Modal } from 'antd';
import { ReactNode } from 'react';
import './GeneralModal.css';

type GeneralModalPropsType = {
    children: ReactNode;
    className?: string;
    isOpen: boolean;
    title?: string;
    okText?: string;
    cancelText?: string;
    onOk: () => void;
    onCancel: () => void;
};
const GeneralModal = ({
    okText = 'Ok',
    cancelText = 'Cancel',
    children,
    className,
    title,
    isOpen,
    onOk,
    onCancel,
}: GeneralModalPropsType) => {
    return (
        <Modal
            className={className}
            title={title}
            open={isOpen}
            okText={okText}
            cancelText={cancelText}
            onOk={onOk}
            onCancel={onCancel}
            cancelButtonProps={{ className: 'cancel-btn-modal' }}
            okButtonProps={{ className: 'ok-btn-modal', htmlType: 'submit' }}
        >
            {children}
        </Modal>
    );
};

export default GeneralModal;

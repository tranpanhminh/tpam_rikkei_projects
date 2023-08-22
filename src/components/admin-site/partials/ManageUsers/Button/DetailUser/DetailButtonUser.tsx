import React, { useState, ReactNode } from "react";
import { Button, Modal } from "antd";
interface DetailModalProps {
  className?: string; // Thêm khai báo cho thuộc tính className
  value?: string; // Thêm khai báo cho thuộc tính className
  content?: any;
  handleFunctionOk?: any;
  title?: string;
  handleFunctionBtn?: any;
  width?: number;
}
const DetailModal: React.FC<DetailModalProps> = ({
  className,
  value,
  content,
  handleFunctionOk,
  handleFunctionBtn,
  title,
  width,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (handleFunctionOk) {
      handleFunctionOk();
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={handleFunctionBtn || showModal}
        className={className}
      >
        {value}
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={width}
      >
        {content}
      </Modal>
    </>
  );
};

export default DetailModal;

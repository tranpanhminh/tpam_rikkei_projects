import React, { useState } from "react";
import { Button, Modal } from "antd";

interface DetailModalProps {
  className?: string; // Thêm khai báo cho thuộc tính className
  value?: string; // Thêm khai báo cho thuộc tính className
  content?: any;
  title?: string;
  handleFunctionOk?: any;
  handleFunctionBtn?: any;
}
const DetailButtonProduct: React.FC<DetailModalProps> = ({
  className,
  value,
  handleFunctionBtn,
  handleFunctionOk,
  title,
  content,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleFunctionOk();
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
        width={900}
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {content}
      </Modal>
    </>
  );
};

export default DetailButtonProduct;

import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import styles from "../AddProduct/AddModalProduct.module.css";

import { Product } from "../../../../../../database";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

interface AddModalProps {
  className?: string;
  value?: string;
  title?: string;
  handleClickOk?: (newProduct: Product) => void;
}

const AddModalUser: React.FC<AddModalProps> = ({
  className,
  value,
  title,
  handleClickOk,
}) => {
  const [products, setProducts] = useState<null | Product[]>(null);

  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    productImage: [],
    name: "",
    description: "",
    price: 0,
    vendor: "",
    sku: "",
    quantity_stock: 0,
  });

  const fetchUsers = () => {
    axios
      .get("http://localhost:7373/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const maxId = products
    ? Math.max(...products.map((product) => product.id))
    : 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const updatedProduct = {
      ...newProduct,
      id: maxId + 1,
    };

    const updatedProducts = products ? [...products, updatedProduct] : null;

    setProducts(updatedProducts);
    // setDataToLocal("accountsDatabase", updatedUsers);
    setIsModalOpen(false);
    if (handleClickOk) {
      handleClickOk(updatedProduct);
    }
    setNewProduct({
      id: 0,
      productImage: [],
      name: "",
      description: "",
      price: 0,
      vendor: "",
      sku: "",
      quantity_stock: 0,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className={styles[`${className}`]}
      >
        {value}
      </Button>
      <Modal
        title={title}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <div className={styles["list-input-add-student"]}>
          <div className={styles["list-input-item"]}>
            <p>User ID</p>
            <input type="text" value={maxId + 1} disabled />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Product Name</p>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Description</p>
            <Editor />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Price</p>
            <input
              type="text"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: Number(e.target.value) })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Vendor</p>
            <input
              type="text"
              value={newProduct.vendor}
              onChange={(e) =>
                setNewProduct({ ...newProduct, vendor: e.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>SKU</p>
            <input
              type="text"
              value={newProduct.sku}
              onChange={(e) =>
                setNewProduct({ ...newProduct, sku: e.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Quantity Stock</p>
            <input
              type="text"
              value={newProduct.quantity_stock}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  quantity_stock: Number(e.target.value),
                })
              }
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddModalUser;

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

const AddModalProduct: React.FC<AddModalProps> = ({
  className,
  value,
  title,
  handleClickOk,
}) => {
  const [products, setProducts] = useState<any>(null);
  const [editorInitialValue, setEditorInitialValue] = useState("");
  const [newProduct, setNewProduct] = useState<any>({
    // id: 0,
    productImage: [],
    name: "",
    description: "",
    price: 0,
    vendor: "",
    sku: "",
    quantity_stock: 0,
  });

  const fetchProducts = () => {
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
    fetchProducts();
  }, []);

  let listIdProduct = products?.map((product: any) => {
    return product.id;
  });

  const maxId = listIdProduct?.length > 0 ? Math.max(...listIdProduct) : 0;

  // const maxId = products
  //   ? Math.max(...products.map((product) => product.id))
  //   : 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    fetchProducts();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // Kiểm tra thông tin đầy đủ
    if (
      !newProduct.name ||
      !newProduct.description ||
      newProduct.price <= 0 ||
      newProduct.quantity_stock <= 0 ||
      isNaN(newProduct.price) ||
      isNaN(newProduct.quantity_stock)
    ) {
      notification.warning({
        message: "Notification",
        description:
          "Please make sure all information filled, Price & Quantity must be integer",
      });
      return;
    }

    const updatedProduct = {
      ...newProduct,
      id: maxId + 1,
    };

    const updatedProducts = products ? [...products, updatedProduct] : null;

    setProducts(updatedProducts);
    setIsModalOpen(false);
    if (handleClickOk) {
      handleClickOk(updatedProduct);
    }
    setNewProduct({
      // id: 0,
      productImage: ["", "", "", ""],
      name: "",
      description: handleEditorChange(""),
      price: 0,
      vendor: "",
      sku: "",
      quantity_stock: 0,
    });
    // setEditorInitialValue("Type product description here.........");
  };

  const handleCancel = () => {
    setNewProduct({
      // id: 0,
      productImage: ["", "", "", ""],
      name: "",
      description: handleEditorChange(""),
      price: 0,
      vendor: "",
      sku: "",
      quantity_stock: 0,
    });

    // setEditorInitialValue("Type product description here.........");
    setIsModalOpen(false);
  };

  const handleEditorChange = (content: string) => {
    setEditorInitialValue(content);
    setNewProduct({ ...newProduct, description: content });
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
            {/* <Editor
              onEditorChange={(content) =>
                setNewProduct({ ...newProduct, description: content })
              }
              initialValue={editorInitialValue}
            /> */}
            <Editor
              onEditorChange={handleEditorChange}
              value={editorInitialValue}
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Price</p>
            <input
              type="number"
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
              type="number"
              value={newProduct.quantity_stock}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  quantity_stock: Number(e.target.value),
                })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Product Image 1</p>
            <input
              type="text"
              value={newProduct.productImage[0]}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  productImage: [
                    e.target.value,
                    ...newProduct.productImage.slice(1),
                  ],
                })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Product Image 2</p>
            <input
              type="text"
              value={newProduct.productImage[1]}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  productImage: [
                    newProduct.productImage[0],
                    e.target.value,
                    ...newProduct.productImage.slice(2),
                  ],
                })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Product Image 3</p>
            <input
              type="text"
              value={newProduct.productImage[2]}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  productImage: [
                    ...newProduct.productImage.slice(0, 2),
                    e.target.value,
                  ],
                })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Product Image 4</p>
            <input
              type="text"
              value={newProduct.productImage[3]}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  productImage: [
                    ...newProduct.productImage.slice(0, 3),
                    e.target.value,
                  ],
                })
              }
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddModalProduct;

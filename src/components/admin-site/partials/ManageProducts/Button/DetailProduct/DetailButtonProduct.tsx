import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { Product } from "../../../../../../database";
import DetailModalProduct from "./DetailModalProduct";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import styles from "../DetailProduct/DetailModalProduct.module.css";

interface DetailModalProps {
  className?: string; // Thêm khai báo cho thuộc tính className
  value?: string; // Thêm khai báo cho thuộc tính className
  title?: string;
  handleFunctionOk?: any;
  handleFunctionBtn?: any;
  getProductId: number;
}
const DetailButtonProduct: React.FC<DetailModalProps> = ({
  className,
  value,
  title,
  handleFunctionOk,
  handleFunctionBtn,
  getProductId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [initName, setName] = useState("");
  const [initDescription, setDescription] = useState("");
  const [initPrice, setPrice] = useState("");
  const [initVendor, setVendor] = useState("");
  const [initSku, setSku] = useState("");
  const [initStock, setStock] = useState("");
  const [initImage1, setImage1] = useState("");
  const [initImage2, setImage2] = useState("");
  const [initImage3, setImage3] = useState("");
  const [initImage4, setImage4] = useState("");

  const [products, setProducts] = useState<null | Product>(null);

  useEffect(() => {
    const fetchProduct = () => {
      axios
        .get(`http://localhost:7373/products/${getProductId}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchProduct();
  }, [getProductId]);

  console.log(products);

  const handleChange = (content: string, editor: any) => {
    setDescription(content);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("handleSubmit is called");
    const updateProduct = {
      productImage: [initImage1, initImage2, initImage3, initImage4],
      name: initName,
      description: initDescription,
      price: initPrice,
      vendor: initVendor,
      sku: initSku,
      quantity_stock: initStock,
    };

    axios
      .put(`http://localhost:7373/products/${getProductId}`, updateProduct)
      .then((response) => {
        console.log("Product updated successfully:", response.data);
        setIsModalOpen(false);
        setProducts(response.data); // Cập nhật lại state products sau khi cập nhật thành công
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
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
        {products && (
          <div className={styles["product-detail-information-container"]}>
            <div className={styles["left-product-detail-item"]}>
              <img src={products && products.productImage[0]} alt="" />
              <img src={products && products.productImage[1]} alt="" />
              <img src={products && products.productImage[2]} alt="" />
              <img src={products && products.productImage[3]} alt="" />
            </div>

            <div className={styles["right-product-detail-item"]}>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Product ID
                </label>
                <input
                  type="text"
                  name="Product ID"
                  value={products && products.id}
                  disabled
                />
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Product Title
                </label>
                <input
                  type="text"
                  name="Product Title"
                  defaultValue={products && products.name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Description
                </label>
                <div>
                  <Editor
                    initialValue={products && products.description}
                    onEditorChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Price
                </label>
                <input
                  type="text"
                  name="Price"
                  defaultValue={products && products.price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Vendor
                </label>
                <input
                  type="text"
                  name="Vendor"
                  defaultValue={products && products.vendor}
                  onChange={(event) => setVendor(event.target.value)}
                />
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  SKU
                </label>
                <input
                  type="text"
                  name="SKU"
                  defaultValue={products && products.sku}
                  onChange={(event) => setSku(event.target.value)}
                />
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Quantity Stock
                </label>
                <input
                  type="text"
                  name="Quantity Stock"
                  defaultValue={products && products.quantity_stock}
                  onChange={(event) => setStock(event.target.value)}
                />
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Product Image 1
                </label>
                <input
                  type="text"
                  name="Product Image 1"
                  defaultValue={products && products.productImage[0]}
                  onChange={(event) => setImage1(event.target.value)}
                />
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Product Image 2
                </label>
                <input
                  type="text"
                  name="Product Image 2"
                  defaultValue={products && products.productImage[1]}
                  onChange={(event) => setImage2(event.target.value)}
                />
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Product Image 3
                </label>
                <input
                  type="text"
                  name="Product Image 3"
                  defaultValue={products && products.productImage[2]}
                  onChange={(event) => setImage3(event.target.value)}
                />
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Product Image 4
                </label>
                <input
                  type="text"
                  name="Product Image 4"
                  defaultValue={products && products.productImage[3]}
                  onChange={(event) => setImage4(event.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DetailButtonProduct;

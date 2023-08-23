import React, { useEffect, useState } from "react";
import styles from "../DetailProduct/DetailModalProduct.module.css";
import { Editor } from "@tinymce/tinymce-react";
import { Product } from "../../../../../../database";
import axios from "axios";

export interface DetailProduct {
  productId: number;
  productImage?: string[];
  name?: string;
  description?: string;
  price?: number;
  vendor?: string;
  sku?: string;
  quantity_stock?: number;
}

const DetailModalProduct: React.FC<DetailProduct> = ({
  productId,
  productImage,
  name,
  description,
  price,
  vendor,
  sku,
  quantity_stock,
}) => {
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
  console.log(initName);

  const handleChange = (content: string, editor: any) => {
    setDescription(content);
  };

  const handleSubmit = () => {
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
      .put(`http://localhost:7373/products/${productId}`, updateProduct)
      .then((response) => {
        console.log("Product updated successfully:", response.data);
        // Handle success, such as showing a success message or navigating
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        // Handle error, such as showing an error message
      });
  };

  return (
    <div className={styles["product-detail-information-container"]}>
      <div className={styles["left-product-detail-item"]}>
        <img src={productImage && productImage[0]} alt="" />
        <img src={productImage && productImage[1]} alt="" />
        <img src={productImage && productImage[2]} alt="" />
        <img src={productImage && productImage[3]} alt="" />
      </div>

      <div className={styles["right-product-detail-item"]}>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Product ID
          </label>
          <input type="text" name="Product ID" value={productId} disabled />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Product Title
          </label>
          <input
            type="text"
            name="Product Title"
            defaultValue={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Description
          </label>
          <div>
            <Editor initialValue={description} onEditorChange={handleChange} />
          </div>
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Price
          </label>
          <input
            type="text"
            name="Price"
            defaultValue={price}
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
            defaultValue={vendor}
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
            defaultValue={sku}
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
            defaultValue={quantity_stock}
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
            defaultValue={productImage && productImage[0]}
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
            defaultValue={productImage && productImage[1]}
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
            defaultValue={productImage && productImage[2]}
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
            defaultValue={productImage && productImage[3]}
            onChange={(event) => setImage4(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailModalProduct;

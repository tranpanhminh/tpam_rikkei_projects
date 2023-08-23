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
  const [editedProduct, setEditedProduct] = useState<DetailProduct>({
    productId,
    productImage: productImage || [],
    name: name || "",
    description: description || "",
    price: price || 0,
    vendor: vendor || "",
    sku: sku || "",
    quantity_stock: quantity_stock || 0,
  });
  const [products, setProducts] = useState<null | Product[]>(null);
  const fetchProducts = () => {
    axios
      .get(`http://localhost:7373/products/${productId}`)
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

  const [initName, setName] = useState(name);
  const [initDescription, setDescription] = useState(description);
  const [initPrice, setPrice] = useState(price);
  const [initVendor, setVendor] = useState(vendor);
  const [initSku, setSku] = useState(sku);
  const [initStock, setStock] = useState(quantity_stock);
  const [initImage1, setImage1] = useState(productImage[0]);
  const [initImage2, setImage2] = useState(productImage[1]);
  const [initImage3, setImage3] = useState(productImage[2]);
  const [initImage4, setImage4] = useState(productImage[3]);

  const typeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
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
            value={initName}
            onChange={(event) => typeChange(event)}
          />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Description
          </label>
          <div>
            <Editor initialValue={initDescription} />
          </div>
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Price
          </label>
          <input type="text" name="Price" value={initPrice} />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Vendor
          </label>
          <input type="text" name="Vendor" value={initVendor} />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            SKU
          </label>
          <input type="text" name="SKU" value={initSku} />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Quantity Stock
          </label>
          <input type="text" name="Quantity Stock" value={initStock} />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Product Image 1
          </label>
          <input
            type="text"
            name="Product Image 1"
            value={productImage && productImage[0]}
          />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Product Image 2
          </label>
          <input type="text" name="Product Image 2" value={initImage2} />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Product Image 3
          </label>
          <input type="text" name="Product Image 3" value={initImage3} />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Product Image 4
          </label>
          <input type="text" name="Product Image 4" value={initImage4} />
        </div>
      </div>
    </div>
  );
};

export default DetailModalProduct;

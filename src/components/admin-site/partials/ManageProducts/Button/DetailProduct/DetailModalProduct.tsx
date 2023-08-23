import React, { useState } from "react";
import styles from "../DetailProduct/DetailModalProduct.module.css";
import { Editor } from "@tinymce/tinymce-react";

import {
  initializeDatabase,
  getDataFromLocal,
  setDataToLocal,
  Product,
} from "../../../../../../database"; // Import your data fetching and setting functions

export interface DetailProduct {
  productId: number;
  productImage?: string[];
  name?: string;
  description?: string;
  price?: number;
  vendor?: string;
  sku?: string;
  quantity_stock?: number;
  productImage1?: string;
  productImage2?: string;
  productImage3?: string;
  productImage4?: string;
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
  productImage1,
  productImage2,
  productImage3,
  productImage4,
}) => {
  const [editorContent, setEditorContent] = useState("");
  const [products, setProducts] = useState<Product[]>(
    getDataFromLocal<Product[]>("productsDatabase") || []
  );
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

  // Hiển thị Data Product vào trong Modal
  let findProduct: Product | undefined = products.find((product) => {
    return product.id === productId;
  });

  // Function lấy dữ liệu khi nhập vào TinyMCE
  const handleEditorChange = (content: string) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      description: content,
    }));
  };

  const typeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof DetailProduct
  ) => {
    const { value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [fieldName]: value,
    }));
  };
  /**
   * vấn đề là state của value và haàm set lại giá trị phải cần cùng 1 state
   */
  return (
    <div className={styles["product-detail-information-container"]}>
      <div className={styles["left-product-detail-item"]}>
        <img
          src={
            findProduct &&
            require(`../../../../../../assets/images/product-images/${findProduct.productImage[0]}`)
          }
          alt=""
        />
        <img
          src={
            findProduct &&
            require(`../../../../../../assets/images/product-images/${findProduct.productImage[1]}`)
          }
          alt=""
        />
        <img
          src={
            findProduct &&
            require(`../../../../../../assets/images/product-images/${findProduct.productImage[2]}`)
          }
          alt=""
        />
        <img
          src={
            findProduct &&
            require(`../../../../../../assets/images/product-images/${findProduct.productImage[3]}`)
          }
          alt=""
        />
      </div>

      <div className={styles["right-product-detail-item"]}>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Product ID
          </label>
          <input
            type="text"
            name="Product ID"
            value={editedProduct.productId}
            disabled
            onChange={(e) => typeChange(e, "productId")}
          />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Product Title
          </label>
          <input
            type="text"
            name="Product Title"
            onChange={(e) => typeChange(e, "name")}
            value={findProduct && findProduct.name}
          />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Description
          </label>
          <div>
            <Editor
              initialValue={findProduct && findProduct.description}
              onEditorChange={handleEditorChange}
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
            onChange={(e) => typeChange(e, "price")}
            value={findProduct && findProduct.price}
          />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Vendor
          </label>
          <input
            type="text"
            name="Vendor"
            onChange={(e) => typeChange(e, "vendor")}
            value={findProduct && findProduct.vendor}
          />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            SKU
          </label>
          <input
            type="text"
            name="SKU"
            onChange={(e) => typeChange(e, "sku")}
            value={findProduct && findProduct.sku}
          />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Quantity Stock
          </label>
          <input
            type="text"
            name="Quantity Stock"
            onChange={(e) => typeChange(e, "quantity_stock")}
            value={findProduct && findProduct.quantity_stock}
          />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Product Image 1
          </label>
          <input
            type="text"
            name="Product Image 1"
            onChange={(e) => typeChange(e, "productImage1")}
            value={findProduct && findProduct.productImage[0]}
          />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Product Image 2
          </label>
          <input
            type="text"
            name="Product Image 2"
            onChange={(e) => typeChange(e, "productImage2")}
            value={findProduct && findProduct.productImage[1]}
          />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Product Image 3
          </label>
          <input
            type="text"
            name="Product Image 3"
            onChange={(e) => typeChange(e, "productImage3")}
            value={findProduct && findProduct.productImage[2]}
          />
        </div>
        <div className={styles["product-info-item"]}>
          <label className={styles["label-product"]} htmlFor="">
            Product Image 4
          </label>
          <input
            type="text"
            name="Product Image 4"
            onChange={(e) => typeChange(e, "productImage4")}
            value={findProduct && findProduct.productImage[3]}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailModalProduct;

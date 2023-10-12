import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import styles from "../AddProduct/AddModalProduct.module.css";
import { Product } from "../../../../../../database";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { log } from "console";

// Import API
// 1. Products API
const productsAPI = process.env.REACT_APP_API_PRODUCTS;
const vendorsAPI = process.env.REACT_APP_API_VENDORS;

// ------------------------------------------------

interface AddModalProps {
  className?: string;
  value?: string;
  title?: string;
  handleClickOk?: any;
}

const AddModalProduct: React.FC<AddModalProps> = ({
  className,
  value,
  title,
  handleClickOk,
}) => {
  const [products, setProducts] = useState<any>(null);
  const [files, setFiles] = useState<any>([]);
  const [vendors, setVendors] = useState<any>(null);
  const [editorInitialValue, setEditorInitialValue] = useState("");

  // Xử lý Multiple Ảnh
  let productImages: any = [];
  for (let i = 0; i < files.length; i++) {
    productImages.push(files[i].name);
  }

  const [newProduct, setNewProduct] = useState<any>({
    name: "",
    description: "",
    price: "",
    quantity_stock: 0,
    vendor_id: 1,
    image_url: productImages,
  });

  const fetchProducts = async () => {
    await axios
      .get(`${productsAPI}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchVendors = async () => {
    await axios
      .get(`${vendorsAPI}`)
      .then((response) => {
        setVendors(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchVendors();
  }, []);

  // let listIdProduct = products?.map((product: any) => {
  //   return product.id;
  // });

  // const maxId = listIdProduct?.length > 0 ? Math.max(...listIdProduct) : 0;

  // const maxId = products
  //   ? Math.max(...products.map((product) => product.id))
  //   : 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    fetchProducts();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    axios
      .post(`${productsAPI}/add`, newProduct)
      .then((response) => {
        notification.success({
          message: `Product Added`,
        });
        setIsModalOpen(false);
        setNewProduct({
          name: "",
          description: "",
          price: "",
          quantity_stock: 0,
          vendor_id: 1,
          image_url: [],
        });
        handleClickOk();
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data.message}`,
        });
      });
    console.log();
    // // Kiểm tra thông tin đầy đủ
    // if (
    //   !newProduct.name ||
    //   !newProduct.description ||
    //   newProduct.price <= 0 ||
    //   newProduct.quantity_stock <= 0 ||
    //   isNaN(newProduct.price) ||
    //   isNaN(newProduct.quantity_stock)
    // ) {
    //   notification.warning({
    //     message: "Notification",
    //     description:
    //       "Please make sure all information filled, Price & Quantity must be integer",
    //   });
    //   return;
    // }
    // const updatedProduct = {
    //   ...newProduct,
    //   id: maxId + 1,
    //   comments: [],
    // };
    // const updatedProducts = products ? [...products, updatedProduct] : null;
    // setProducts(updatedProducts);
    // setIsModalOpen(false);
    // if (handleClickOk) {
    //   handleClickOk(updatedProduct);
    // }
    // setNewProduct({
    //   // id: 0,
    //   productImage: ["", "", "", ""],
    //   name: "",
    //   description: handleEditorChange(""),
    //   price: 0,
    //   vendor: "",
    //   sku: "",
    //   quantity_stock: 0,
    //   comments: [],
    // });
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
      comments: [],
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
            <Editor
              onEditorChange={(content) =>
                setNewProduct({ ...newProduct, description: content })
              }
              initialValue={editorInitialValue}
            />
            {/* <Editor
              onEditorChange={handleEditorChange}
              value={editorInitialValue}
            /> */}
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
            <p>Quantity Stock</p>
            <input
              type="number"
              value={newProduct?.quantity_stock}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  quantity_stock: Number(e.target.value),
                })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Vendor</p>
            <select
              name=""
              id=""
              value={newProduct?.vendor}
              onChange={(e) =>
                setNewProduct({ ...newProduct, vendor: e.target.value })
              }
            >
              {vendors?.map((vendor: any) => {
                return <option value={vendor.id}>{vendor.name}</option>;
              })}
            </select>
          </div>
          <div className={styles["list-input-item"]}>
            <p>Images</p>
            <input
              multiple
              type="file"
              onChange={(e) => setFiles(e.target.files)}
            />
          </div>

          {/* <div className={styles["list-input-item"]}>
            <p>SKU</p>
            <input
              type="text"
              value={newProduct.sku}
              onChange={(e) =>
                setNewProduct({ ...newProduct, sku: e.target.value })
              }
            />
          </div> */}
        </div>
      </Modal>
    </>
  );
};

export default AddModalProduct;

import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import styles from "../AddProduct/AddModalProduct.module.css";
import { Product } from "../../../../../../database";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [products, setProducts] = useState<any>(null);
  // const [files, setFiles] = useState<any>([]);
  const [vendors, setVendors] = useState<any>(null);
  const [editorInitialValue, setEditorInitialValue] = useState("");

  const [newProduct, setNewProduct] = useState<any>({
    name: "",
    description: "",
    price: "",
    quantity_stock: "",
    vendor_id: 1,
    image_url: [],
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    navigate(`/admin/manage-products/?add`);
    setIsModalOpen(true);
    // fetchProducts();
    // setIsModalOpen(true);
  };

  // Handle Add Post
  const handleOk = () => {
    if (newProduct.image_url.length === 4) {
      const formData: any = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("quantity_stock", newProduct.quantity_stock);
      formData.append("vendor_id", newProduct.vendor_id);

      newProduct.image_url.forEach((image: File, index: number) => {
        formData.append(`image_url`, image);
      });

      formData.append("_method", "POST");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(`${productsAPI}/add`, formData, config)
        .then((response) => {
          notification.success({
            message: `Product Added`,
          });
          setIsModalOpen(false);
          const fileInput: any = document.querySelector(
            `#upload-multiple-images`
          );
          if (fileInput) {
            fileInput.value = ""; // Xóa giá trị đã chọn
          }
          setNewProduct({
            name: "",
            description: "",
            price: 0,
            quantity_stock: 0,
            vendor_id: 1,
            image_url: [],
          });
          navigate("/admin/manage-products/");
          handleClickOk();
        })
        .catch((error) => {
          notification.warning({
            message: `${error.response.data.message}`,
          });
        });
    } else {
      return notification.warning({
        message: `Please upload only 4 Images`,
      });
    }
  };

  const handleCancel = () => {
    setNewProduct({
      name: "",
      description: "",
      price: "",
      quantity_stock: 0,
      vendor_id: 1,
      image_url: [],
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
              value={newProduct.description}
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
            <p>Vendor</p>
            <select
              value={newProduct.vendor_id}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  vendor_id: Number(e.target.value),
                })
              }
              className={styles["select-option"]}
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
              onChange={(e) => {
                const images = [];
                if (e.target.files !== null) {
                  for (let i = 0; i < e.target.files.length; i++) {
                    images.push(e.target.files[i]);
                  }
                  setNewProduct({
                    ...newProduct,
                    image_url: images,
                  });
                }
              }}
              id="upload-multiple-images"
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

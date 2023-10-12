import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import { Product } from "../../../../../../database";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import styles from "../DetailProduct/DetailModalProduct.module.css";
import { useLocation, useNavigate } from "react-router-dom";

// Import API
// 1. Products API
const productsAPI = process.env.REACT_APP_API_PRODUCTS;
const vendorsAPI = process.env.REACT_APP_API_VENDORS;

// ------------------------------------------------

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
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<any>(null);
  const [vendors, setVendors] = useState<any>(null);
  const [image1, setImage1] = useState<string>("");
  const [image2, setImage2] = useState<string>("");
  const [image3, setImage3] = useState<string>("");
  const [image4, setImage4] = useState<string>("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get("edit-productId");
    if (productId && Number(productId) === getProductId) {
      setIsModalOpen(true); // Nếu có edit-postId và nó trùng với postId của post hiện tại, mở modal
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProduct = () => {
      axios
        .get(`${productsAPI}/detail/${getProductId}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchProduct();
  }, [getProductId]);

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
    fetchVendors();
  }, []);

  const [productInfo, setProductInfo] = useState<any>({
    name: "",
    description: "",
    price: 0,
    quantity_stock: 0,
  });

  const handleChange = (content: string, editor: any) => {
    setProductInfo({
      ...productInfo,
      description: content,
    });
  };

  const showModal = () => {
    navigate(`/admin/manage-products/?edit-productId=${getProductId}`);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    axios
      .patch(`${productsAPI}/update/${getProductId}`, productInfo)
      .then((response) => {
        notification.success({
          message: `Product Updated`,
        });
        handleFunctionOk();
        setIsModalOpen(false); // Close the modal
        navigate("/admin/manage-products/");
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data.message}`,
        });
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Update ảnh
  console.log(image1, "image1");
  const handleUpdateImage1 = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    const productId = products.id;
    const imageId = products.image_url[0].id;

    axios
      .patch(`${productsAPI}/${productId}/update-image/${imageId}`, formData)
      .then((response) => {
        console.log(response, "-----");
      })
      .catch((error) => {
        console.log(error, "++++++");
      });
  };
  const handleUpdateImage2 = () => {
    const productId = products.id;
    const imageId = products.image_url[2].id;
    console.log(productId, imageId);
  };
  const handleUpdateImage3 = () => {
    const productId = products.id;
    const imageId = products.image_url[3].id;
    console.log(productId, imageId);
  };
  const handleUpdateImage4 = () => {
    const productId = products.id;
    const imageId = products.image_url[4].id;
    console.log(productId, imageId);
  };

  const editorConfig = {
    height: "600px",
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
              <img src={products && products.image_url[0].image_url} alt="" />
              <img src={products && products.image_url[1].image_url} alt="" />
              <img src={products && products.image_url[2].image_url} alt="" />
              <img src={products && products.image_url[3].image_url} alt="" />
            </div>

            <div className={styles["right-product-detail-item"]}>
              {/* <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Product ID
                </label>
                <input
                  type="text"
                  name="Product ID"
                  value={products && products.id}
                  disabled
                />
              </div> */}
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Product Title
                </label>
                <input
                  type="text"
                  name="Product Title"
                  defaultValue={products?.name}
                  onChange={(event) =>
                    setProductInfo({ ...productInfo, name: event.target.value })
                  }
                />
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Description
                </label>
                <div>
                  <Editor
                    initialValue={products?.description}
                    onEditorChange={handleChange}
                    init={editorConfig}
                  />
                </div>
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Price
                </label>
                <input
                  type="number"
                  name="Price"
                  defaultValue={products?.price}
                  onChange={(event) =>
                    setProductInfo({
                      ...productInfo,
                      price: event.target.value,
                    })
                  }
                />
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Vendor
                </label>
                <select
                  defaultValue={products?.vendor_id}
                  onChange={(e) =>
                    setProductInfo({
                      ...productInfo,
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
              {/* <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  SKU
                </label>
                <input
                  type="text"
                  name="SKU"
                  defaultValue={products && products.sku}
                  onChange={(event) => setSku(event.target.value)}
                />
              </div> */}
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Quantity Stock
                </label>
                <input
                  type="number"
                  name="Quantity Stock"
                  defaultValue={products?.quantity_stock}
                  onChange={(e) =>
                    setProductInfo({
                      ...productInfo,
                      quantity_stock: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Image 1
                </label>
                <div>
                  <form
                    method="POST"
                    encType="multipart/form-data"
                    onSubmit={handleUpdateImage1}
                  >
                    <input
                      type="file"
                      onChange={(event) =>
                        setImage1(
                          event.target.files ? event.target.files[0].name : ""
                        )
                      }
                    />
                    <input type="submit" value="Upload" />
                  </form>
                </div>

                {/* <input
                  type="text"
                  name="Product Image 1"
                  // defaultValue={products && products.productImage[0]}
                  onChange={(event) => setImage1(event.target.value)}
                /> */}
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Image 2
                </label>
                <input type="file" />

                {/* <input
                  type="text"
                  name="Product Image 2"
                  defaultValue={products && products.productImage[1]}
                  onChange={(event) => setImage2(event.target.value)}
                /> */}
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Image 3
                </label>
                <form action="">
                  <input type="file" />
                </form>

                {/* <input
                  type="text"
                  name="Product Image 3"
                  defaultValue={products && products.productImage[2]}
                  onChange={(event) => setImage3(event.target.value)}
                /> */}
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Image 4
                </label>
                <input type="file" />

                {/* <input
                  type="text"
                  name="Product Image 4"
                  // defaultValue={products && products.productImage[3]}
                  onChange={(event) => setImage4(event.target.value)}
                /> */}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DetailButtonProduct;

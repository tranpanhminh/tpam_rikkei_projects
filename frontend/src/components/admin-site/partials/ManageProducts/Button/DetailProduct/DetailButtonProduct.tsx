import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, notification, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import styles from "../DetailProduct/DetailModalProduct.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getDetailProduct,
  updateProduct,
  updateProductImage,
  updateThumbnail,
} from "../../../../../../api/products.api";
import { getAllVendors } from "../../../../../../api/vendors.api";

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
  const [image1, setImage1] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);
  const [image3, setImage3] = useState<any>(null);
  const [image4, setImage4] = useState<any>(null);
  const [showUpdateImage1, setShowUpdateImage1] = useState<boolean>(false);
  const [showUpdateImage2, setShowUpdateImage2] = useState<boolean>(false);
  const [showUpdateImage3, setShowUpdateImage3] = useState<boolean>(false);
  const [showUpdateImage4, setShowUpdateImage4] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const fileInputRef1 = useRef<any>(null);
  const fileInputRef2 = useRef<any>(null);
  const fileInputRef3 = useRef<any>(null);
  const fileInputRef4 = useRef<any>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get("edit-productId");
    if (productId && Number(productId) === getProductId) {
      setIsModalOpen(true); // Nếu có edit-postId và nó trùng với postId của post hiện tại, mở modal
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getDetailProduct(getProductId);
      setProducts(result);
      setProductInfo({
        name: result.name,
        description: result.description,
        price: result.price,
        quantity_stock: result.quantity_stock,
      });
    };

    fetchProduct();
  }, [getProductId]);

  const fetchVendors = async () => {
    const result = await getAllVendors();
    return setVendors(result);
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

  const handleOk = async () => {
    const result = await updateProduct(getProductId, productInfo);
    if (result) {
      handleFunctionOk();
      setIsModalOpen(false); // Close the modal
      navigate("/admin/manage-products/");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Update ảnh
  // Ảnh 1:
  let fileUploaded1 = false;
  const handleFileChange1 = (event: any) => {
    if (fileUploaded1 === true) {
      setShowUpdateImage1(false);
      return event.target.value === "";
    } else {
      if (event.target.files.length > 0) {
        setImage1(event.target.files[0]);
        setShowUpdateImage1(true);
      }
    }
  };
  const resetInputImage1 = () => {
    if (image1) {
      setImage1(null);
      if (fileInputRef1.current) {
        fileInputRef1.current.value = "";
      }
    }
  };

  const handleUpdateImage1 = async () => {
    if (image1 && image1.type.includes("image")) {
      const formData: any = new FormData();
      formData.append("image_url", image1);
      formData.append("_method", "PATCH");
      const productId = products.id;
      const imageId = products.product_images[0].id;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      messageApi.open({
        type: "loading",
        content: "Updating...",
        duration: 0,
      });
      const result = await updateProductImage(
        productId,
        imageId,
        formData,
        config
      );
      if (result) {
        messageApi.destroy();
        const getData = await getDetailProduct(getProductId);
        setProducts(getData);
        setImage1("");
        resetInputImage1();
        setShowUpdateImage1(false);
        navigate("/admin/manage-products/");
        handleFunctionOk();
        fileUploaded1 = true;
      }
    } else {
      notification.warning({
        message: `Image is empty or File type is not image)`,
      });
    }
  };
  // --------------------------------------

  // Ảnh 2:
  let fileUploaded2 = false;
  const handleFileChange2 = (event: any) => {
    if (fileUploaded2 === true) {
      setShowUpdateImage2(false);
      return event.target.value === "";
    } else {
      if (event.target.files.length > 0) {
        setImage2(event.target.files[0]);
        setShowUpdateImage2(true);
      }
    }
  };

  const resetInputImage2 = () => {
    if (image2) {
      setImage2(null);
      if (fileInputRef2.current) {
        fileInputRef2.current.value = "";
      }
    }
  };

  const handleUpdateImage2 = async () => {
    if (image2 && image2.type.includes("image")) {
      const formData: any = new FormData();
      formData.append("image_url", image2);
      formData.append("_method", "PATCH");
      const productId = products.id;
      const imageId = products.product_images[1].id;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      messageApi.open({
        type: "loading",
        content: "Updating...",
        duration: 0,
      });
      const result = await updateProductImage(
        productId,
        imageId,
        formData,
        config
      );
      if (result) {
        messageApi.destroy();
        const getData = await getDetailProduct(getProductId);
        setProducts(getData);
        setImage2("");
        resetInputImage2();
        setShowUpdateImage2(false);
        navigate("/admin/manage-products/");
        handleFunctionOk();
        fileUploaded2 = true;
      }
    } else {
      notification.warning({
        message: `Image is empty or File type is not image)`,
      });
    }
  };
  // --------------------------------------

  // Ảnh 3:
  let fileUploaded3 = false;
  const handleFileChange3 = (event: any) => {
    if (fileUploaded3 === true) {
      setShowUpdateImage3(false);
      return event.target.value === "";
    } else {
      if (event.target.files.length > 0) {
        setImage3(event.target.files[0]);
        setShowUpdateImage3(true);
      }
    }
  };

  const resetInputImage3 = () => {
    if (image3) {
      setImage3(null);
      if (fileInputRef3.current) {
        fileInputRef3.current.value = "";
      }
    }
  };

  const handleUpdateImage3 = async () => {
    if (image3 && image3.type.includes("image")) {
      const formData: any = new FormData();
      formData.append("image_url", image3);
      formData.append("_method", "PATCH");
      const productId = products.id;
      const imageId = products.product_images[2].id;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      messageApi.open({
        type: "loading",
        content: "Updating...",
        duration: 0,
      });
      const result = await updateProductImage(
        productId,
        imageId,
        formData,
        config
      );
      if (result) {
        messageApi.destroy();
        const getData = await getDetailProduct(getProductId);
        setProducts(getData);
        setImage3("");
        resetInputImage3();
        setShowUpdateImage3(false);
        navigate("/admin/manage-products/");
        handleFunctionOk();
        fileUploaded3 = true;
      }
    } else {
      notification.warning({
        message: `Image is empty or File type is not image)`,
      });
    }
  };

  // Ảnh 4:
  let fileUploaded4 = false;
  const handleFileChange4 = (event: any) => {
    if (fileUploaded4 === true) {
      setShowUpdateImage4(false);
      return event.target.value === "";
    } else {
      if (event.target.files.length > 0) {
        setImage4(event.target.files[0]);
        setShowUpdateImage4(true);
      }
    }
  };

  const resetInputImage4 = () => {
    if (image4) {
      setImage4(null);
      if (fileInputRef4.current) {
        fileInputRef4.current.value = "";
      }
    }
  };

  const handleUpdateImage4 = async () => {
    if (image4 && image4.type.includes("image")) {
      const formData: any = new FormData();
      formData.append("image_url", image4);
      formData.append("_method", "PATCH");
      const productId = products.id;
      const imageId = products.product_images[3].id;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      messageApi.open({
        type: "loading",
        content: "Updating...",
        duration: 0,
      });
      const result = await updateProductImage(
        productId,
        imageId,
        formData,
        config
      );
      if (result) {
        messageApi.destroy();
        const getData = await getDetailProduct(getProductId);
        setProducts(getData);
        setImage4("");
        resetInputImage4();
        setShowUpdateImage4(false);
        navigate("/admin/manage-products/");
        handleFunctionOk();
        fileUploaded4 = true;
      }
    } else {
      notification.warning({
        message: `Image is empty or File type is not image)`,
      });
    }
  };

  // Set Thumbnail
  const changeThumbnail = async (productId: any, imageId: any) => {
    messageApi.open({
      type: "loading",
      content: "Loading...",
      duration: 0,
    });

    const result = await updateThumbnail(productId, imageId);
    if (result) {
      messageApi.destroy();
      const getData = await getDetailProduct(getProductId);
      setProducts(getData);
      handleFunctionOk();
    }
  };

  const editorConfig = {
    height: "600px",
    width: "600px",
  };

  return (
    <>
      {contextHolder}
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
              <div className={styles["image-container"]}>
                <img
                  src={products && products.product_images[0].image_url}
                  alt=""
                />
                <button
                  className={styles["set-thumbnail-btn"]}
                  onClick={() =>
                    changeThumbnail(products.id, products.product_images[0]?.id)
                  }
                >
                  Set Thumbnail (1)
                </button>
              </div>
              <div className={styles["image-container"]}>
                <img
                  src={products && products.product_images[1]?.image_url}
                  alt=""
                />
                <button
                  className={styles["set-thumbnail-btn"]}
                  onClick={() =>
                    changeThumbnail(products.id, products.product_images[1]?.id)
                  }
                >
                  Set Thumbnail (2)
                </button>
              </div>
              <div className={styles["image-container"]}>
                <img
                  src={products && products.product_images[2]?.image_url}
                  alt=""
                />
                <button
                  className={styles["set-thumbnail-btn"]}
                  onClick={() =>
                    changeThumbnail(products.id, products.product_images[2]?.id)
                  }
                >
                  Set Thumbnail (3)
                </button>
              </div>
              <div className={styles["image-container"]}>
                <img
                  src={products && products.product_images[3]?.image_url}
                  alt=""
                />
                <button
                  className={styles["set-thumbnail-btn"]}
                  onClick={() =>
                    changeThumbnail(products.id, products.product_images[3]?.id)
                  }
                >
                  Set Thumbnail (4)
                </button>
              </div>
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
                  defaultValue={products?.name}
                  onChange={(event) =>
                    setProductInfo({
                      ...productInfo,
                      name: event.target.value,
                    })
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
                <div className={styles["upload-image-form"]}>
                  <input
                    type="file"
                    name="image-01"
                    onChange={handleFileChange1}
                    id={`image-${products.product_images[0].id}`}
                    ref={fileInputRef1}
                  />
                  <button
                    onClick={handleUpdateImage1}
                    style={{
                      display: showUpdateImage1 ? "inline-block" : "none",
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Image 2
                </label>
                <div className={styles["upload-image-form"]}>
                  <input
                    type="file"
                    name="image-02"
                    onChange={handleFileChange2}
                    id={`image-${products.product_images[1].id}`}
                    ref={fileInputRef2}
                  />
                  <button
                    onClick={handleUpdateImage2}
                    style={{
                      display: showUpdateImage2 ? "inline-block" : "none",
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Image 3
                </label>
                <div className={styles["upload-image-form"]}>
                  <input
                    type="file"
                    name="image-03"
                    onChange={handleFileChange3}
                    id={`image-${products.product_images[2].id}`}
                    ref={fileInputRef3}
                  />
                  <button
                    onClick={handleUpdateImage3}
                    style={{
                      display: showUpdateImage3 ? "inline-block" : "none",
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Image 4
                </label>
                <div className={styles["upload-image-form"]}>
                  <input
                    type="file"
                    name="image-04"
                    onChange={handleFileChange4}
                    id={`image-${products.product_images[3].id}`}
                    ref={fileInputRef4}
                  />
                  <button
                    onClick={handleUpdateImage4}
                    style={{
                      display: showUpdateImage4 ? "inline-block" : "none",
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DetailButtonProduct;

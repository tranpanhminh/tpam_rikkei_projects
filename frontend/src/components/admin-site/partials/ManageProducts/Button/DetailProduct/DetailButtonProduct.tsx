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
  const [image1, setImage1] = useState<any>(null);
  const [image2, setImage2] = useState<string>("");
  const [image3, setImage3] = useState<string>("");
  const [image4, setImage4] = useState<string>("");
  const [showUpdateImage1, setShowUpdateImage1] = useState<boolean>(false);
  const [showUpdateImage2, setShowUpdateImage2] = useState<boolean>(false);
  const [showUpdateImage3, setShowUpdateImage3] = useState<boolean>(false);
  const [showUpdateImage4, setShowUpdateImage4] = useState<boolean>(false);

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
  // Ảnh 1:
  let fileUploaded1 = false;
  const handleFileChange1 = (event: any) => {
    if (fileUploaded1 === true) {
      console.log(event.target.value, "222");
      setShowUpdateImage1(false);
      return event.target.value === "";
    } else {
      if (event.target.files.length > 0) {
        setImage1(event.target.files[0]);
        setShowUpdateImage1(true);
      }
    }
  };

  const handleUpdateImage1 = () => {
    if (image1) {
      const formData: any = new FormData();
      formData.append("image_url", image1);
      formData.append("_method", "PATCH");
      const productId = products.id;
      const imageId = products.image_url[0].id;
      // console.log(formData, "FORM DATA");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .patch(
          `${productsAPI}/${productId}/update-image/${imageId}`,
          formData,
          config
        )
        .then((response) => {
          // Đặt giá trị của input type file về rỗng
          const fileInput: any = document.querySelector(`#image-${imageId}`);
          if (fileInput) {
            fileInput.value = ""; // Xóa giá trị đã chọn
          }
          notification.success({
            message: `Image Updated`,
          });
          axios
            .get(`${productsAPI}/detail/${getProductId}`)
            .then((response) => {
              setProducts(response.data);
            })
            .catch((error) => {
              console.log(error.message);
            });
          setImage1("");
          setShowUpdateImage1(false);
          navigate("/admin/manage-products/");
          handleFunctionOk();
          fileUploaded1 = true;
        })
        .catch((error) => {
          console.log(error, "++++++");
        });
    } else {
      notification.warning({
        message: `Please Upload Image`,
      });
    }
  };

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

  const handleUpdateImage2 = () => {
    if (image2) {
      const formData: any = new FormData();
      formData.append("image_url", image2);
      formData.append("_method", "PATCH");
      const productId = products.id;
      const imageId = products.image_url[1].id;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .patch(
          `${productsAPI}/${productId}/update-image/${imageId}`,
          formData,
          config
        )
        .then((response) => {
          // Đặt giá trị của input type file về rỗng
          const fileInput: any = document.querySelector(`#image-${imageId}`);
          if (fileInput) {
            fileInput.value = ""; // Xóa giá trị đã chọn
          }
          notification.success({
            message: `Image Updated`,
          });
          axios
            .get(`${productsAPI}/detail/${getProductId}`)
            .then((response) => {
              setProducts(response.data);
            })
            .catch((error) => {
              console.log(error.message);
            });
          setImage2("");
          setShowUpdateImage2(false);
          navigate("/admin/manage-products/");
          handleFunctionOk();
          fileUploaded2 = true;
        })
        .catch((error) => {
          console.log(error, "++++++");
        });
    } else {
      notification.warning({
        message: `Please Upload Image`,
      });
    }
  };

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

  const handleUpdateImage3 = () => {
    if (image3) {
      const formData: any = new FormData();
      formData.append("image_url", image3);
      formData.append("_method", "PATCH");
      const productId = products.id;
      const imageId = products.image_url[2].id;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .patch(
          `${productsAPI}/${productId}/update-image/${imageId}`,
          formData,
          config
        )
        .then((response) => {
          // Đặt giá trị của input type file về rỗng
          const fileInput: any = document.querySelector(`#image-${imageId}`);
          if (fileInput) {
            fileInput.value = ""; // Xóa giá trị đã chọn
          }
          notification.success({
            message: `Image Updated`,
          });
          axios
            .get(`${productsAPI}/detail/${getProductId}`)
            .then((response) => {
              setProducts(response.data);
            })
            .catch((error) => {
              console.log(error.message);
            });
          setImage3("");
          setShowUpdateImage3(false);
          navigate("/admin/manage-products/");
          handleFunctionOk();
          fileUploaded3 = true;
        })
        .catch((error) => {
          console.log(error, "++++++");
        });
    } else {
      notification.warning({
        message: `Please Upload Image`,
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

  const handleUpdateImage4 = () => {
    if (image4) {
      const formData: any = new FormData();
      formData.append("image_url", image4);
      formData.append("_method", "PATCH");
      const productId = products.id;
      const imageId = products.image_url[3].id;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .patch(
          `${productsAPI}/${productId}/update-image/${imageId}`,
          formData,
          config
        )
        .then((response) => {
          // Đặt giá trị của input type file về rỗng
          const fileInput: any = document.querySelector(`#image-${imageId}`);
          if (fileInput) {
            fileInput.value = ""; // Xóa giá trị đã chọn
          }
          notification.success({
            message: `Image Updated`,
          });
          axios
            .get(`${productsAPI}/detail/${getProductId}`)
            .then((response) => {
              setProducts(response.data);
            })
            .catch((error) => {
              console.log(error.message);
            });
          setImage4("");
          setShowUpdateImage4(false);
          navigate("/admin/manage-products/");
          handleFunctionOk();
          fileUploaded4 = true;
        })
        .catch((error) => {
          console.log(error, "++++++");
        });
    } else {
      notification.warning({
        message: `Please Upload Image`,
      });
    }
  };

  // Set Thumbnail
  const changeThumbnail = (productId: any, imageId: any) => {
    axios
      .patch(`${productsAPI}/${productId}/update-thumbnail/${imageId}}`)
      .then((response) => {
        notification.success({
          message: `Thumbnail Updated`,
        });
        axios
          .get(`${productsAPI}/detail/${getProductId}`)
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
        handleFunctionOk();
      })
      .catch((error) => {
        console.log(error);
      });
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
              <div className={styles["image-container"]}>
                <img src={products && products.image_url[0].image_url} alt="" />
                <button
                  className={styles["set-thumbnail-btn"]}
                  onClick={() =>
                    changeThumbnail(products.id, products.image_url[0]?.id)
                  }
                >
                  Set Thumbnail
                </button>
              </div>
              <div className={styles["image-container"]}>
                <img src={products && products.image_url[1].image_url} alt="" />
                <button
                  className={styles["set-thumbnail-btn"]}
                  onClick={() =>
                    changeThumbnail(products.id, products.image_url[1]?.id)
                  }
                >
                  Set Thumbnail
                </button>
              </div>
              <div className={styles["image-container"]}>
                <img src={products && products.image_url[2].image_url} alt="" />
                <button
                  className={styles["set-thumbnail-btn"]}
                  onClick={() =>
                    changeThumbnail(products.id, products.image_url[2]?.id)
                  }
                >
                  Set Thumbnail
                </button>
              </div>
              <div className={styles["image-container"]}>
                <img src={products && products.image_url[3].image_url} alt="" />
                <button
                  className={styles["set-thumbnail-btn"]}
                  onClick={() =>
                    changeThumbnail(products.id, products.image_url[3]?.id)
                  }
                >
                  Set Thumbnail
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
                    id={`image-${products.image_url[0].id}`}
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
                    id={`image-${products.image_url[1].id}`}
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
                    id={`image-${products.image_url[2].id}`}
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
                    id={`image-${products.image_url[3].id}`}
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

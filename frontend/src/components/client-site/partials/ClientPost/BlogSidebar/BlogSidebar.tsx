import { useEffect, useState } from "react";
import styles from "../BlogPost.module.css";
import { NavLink } from "react-router-dom";
import ClientSearch from "../../ClientSearch/ClientSearch";
import { getAllProducts } from "../../../../../api/products.api";
import { getAllServices } from "../../../../../api/services.api";

// --------------------------------------------------

function BlogSidebar() {
  const [products, setProducts] = useState<any>([]);
  const [services, setServices] = useState<any>([]);

  const fetchProducts = async () => {
    const result = await getAllProducts();
    return setProducts(result);
  };

  const fetchServices = async () => {
    const result = await getAllServices();
    return setServices(result);
  };

  useEffect(() => {
    fetchProducts();
    fetchServices();
  }, []);

  function stripHTMLTags(html: any) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }

  return (
    <div className={styles["blog-sidebar"]}>
      <ClientSearch />
      <div className={styles["sidebar-featured-product"]}>
        <h3 className={styles["sidebar-featured-product-headline"]}>
          Featured Products
        </h3>
        {products?.slice(0, 3).map((product: any) => {
          return (
            <div className={styles["sidebar-featured-product-item"]}>
              <NavLink to={`/products/${product.id}`}>
                <img src={product.thumbnail_url} alt="" />
              </NavLink>

              <NavLink to={`/products/${product.id}`}>
                <p className={styles["sidebar-featured-product-name"]}>
                  {product.name.length > 30 && stripHTMLTags(product.name).slice(0, 60) + "..."}
                </p>
              </NavLink>
            </div>
          );
        })}
      </div>

      <div className={styles["sidebar-featured-product"]}>
        <h3 className={styles["sidebar-featured-product-headline"]}>
          Featured Services
        </h3>
        {services?.slice(0, 3).map((service: any) => {
          return (
            <div className={styles["sidebar-featured-product-item"]}>
              <NavLink to={`/services/${service.id}`}>
                <img src={service.service_image} alt="" />
              </NavLink>

              <NavLink to={`/services/${service.id}`}>
                <p className={styles["sidebar-featured-product-name"]}>
                  {service.name}
                </p>
              </NavLink>
            </div>
          );
        })}
      </div>

      <div className={styles["sidebar-featured-product"]}>
        <h3 className={styles["sidebar-featured-product-headline"]}>Banner</h3>
        <img
          className={styles["sidebar-banner-image"]}
          src="https://rabbunny.com/wp-content/uploads/2023/11/9843fa52-e875-4557-86e2-c92a06787e27_640.jpeg"
          alt=""
        />
      </div>
    </div>
  );
}

export default BlogSidebar;

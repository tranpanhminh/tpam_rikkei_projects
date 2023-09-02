import React from "react";
import styles from "../ClientPost/BlogPost.module.css";
import { NavLink } from "react-router-dom";

function BlogPostBreadcrumb() {
  return (
    <>
      <div className={styles["breadcrumb-blogs-info"]}>
        <h2 className={styles["category-title"]}>Blogs</h2>
        <div className={styles["breadcrumb-page"]}>
          <NavLink to="/">Home</NavLink>
          <span> / </span>
          <NavLink to="/blogs">Blogs</NavLink>
        </div>
      </div>
    </>
  );
}

export default BlogPostBreadcrumb;

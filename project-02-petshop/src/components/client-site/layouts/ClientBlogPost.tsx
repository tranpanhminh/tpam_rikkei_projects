import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import NotificationSale from "../partials/NotificationSale/Notification";
import BlogPostBreadcrumb from "../partials/ClientPost/BlogCategoryBreadcrumb";
import BlogSidebar from "./../partials/ClientPost/BlogSidebar/BlogSidebar";
import styles from "../partials/ClientPost/BlogPost.module.css";
import BlogPost from "../partials/ClientPost/BlogPost/BlogPost";
function ClientBlogPost() {
  return (
    <>
      {/* Homepage */}
      <ClientHeaderPC />
      <div className="main">
        <ClientBanner />
        <BlogPostBreadcrumb />
        <div className={styles["wrap-blog"]}>
          <BlogPost />
          <BlogSidebar />
        </div>
      </div>
      <ClientFooter />
      <NotificationSale />
    </>
  );
}

export default ClientBlogPost;

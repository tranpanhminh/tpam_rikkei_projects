import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import NotificationSale from "../partials/NotificationSale/Notification";
import BlogPost from "./../partials/ClientPost/BlogPost";
import BlogPostBreadcrumb from "../partials/ClientPost/BlogPostBreadcrumb";
function ClientBlogPost() {
  return (
    <>
      {/* Homepage */}
      <ClientHeaderPC />
      <div className="main">
        <ClientBanner />
        <BlogPostBreadcrumb />
        <BlogPost />
      </div>
      <ClientFooter />
      <NotificationSale />
    </>
  );
}

export default ClientBlogPost;

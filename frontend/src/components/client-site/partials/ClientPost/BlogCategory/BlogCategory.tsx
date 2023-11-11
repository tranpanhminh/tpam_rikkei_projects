import { useEffect, useState } from "react";
import styles from "../BlogPost.module.css";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getAllPosts } from "../../../../../api/posts.api";
import ReactPaginate from "react-paginate";

// --------------------------------------------------

function BlogCategory() {
  const [posts, setPosts] = useState<any>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const fetchPosts = async () => {
    const result = await getAllPosts();
    setPosts(result);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Pagination
  const itemsPerPage = Number(searchParams.get("limit")) || 5;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(posts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(posts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, posts]);

  const handlePageClick = (event: any) => {
    const newPage = event.selected + 1;
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    navigate(`/blogs/?page=${newPage}&limit=${itemsPerPage}`);
  };

  function stripHTMLTags(html: any) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }
  return (
    <div className={styles["list-blogs"]}>
      {currentItems?.map((post: any) => {
        if (post.post_statuses.name === "Published") {
          return (
            <>
              <div className={styles["post-item"]}>
                <NavLink to={`/blogs/${post.id}`}>
                  <div className={styles["post-thumbnail-item"]}>
                    <img
                      src={post.thumbnail_url}
                      alt=""
                      className={styles["img-thumbnail-item"]}
                    />
                  </div>
                </NavLink>

                <div className={styles["post-item-content"]}>
                  <NavLink to={`/blogs/${post.id}`}>
                    <h2 className={styles["post-item-title"]}>
                      {post.title}
                      {/* {Array.from(post.post_title).slice(0, 50).join("")} */}
                    </h2>
                  </NavLink>
                  <span className={styles["post-item-description"]}>
                    {/* {React.createElement("div", {
                        dangerouslySetInnerHTML: { __html: post?.post_content },
                      })} */}
                    {post?.content.length > 200 ? (
                      <div>{stripHTMLTags(post?.content.slice(0, 200))}...</div>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post?.content,
                        }}
                      />
                    )}
                  </span>
                  <div>
                    <NavLink to={`/blogs/${post.id}`}>
                      <Button variant="primary">Read More</Button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        }
      })}

      <div className={styles["pagination-form"]}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageLinkClassName="page-number"
          previousLinkClassName="page-number"
          nextLinkClassName="page-number"
          activeLinkClassName={styles["active"]}
        />
      </div>
    </div>
  );
}

export default BlogCategory;

import React, { useEffect, useState } from "react";
import styles from "../ClientSpecialPage/SpecialPage.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
// import "../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";

function SpecialPage() {
  const { slug } = useParams();
  const [pages, setPages] = useState<any>({});

  const fetchPages = () => {
    axios
      .get(`http://localhost:7373/pages/${slug}`)
      .then((response) => {
        setPages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPages();
  }, [slug]);

  return (
    <>
      <div className={styles["contact-us-banner"]}>
        <h1>{pages?.page_title}</h1>
      </div>
      <div className={styles["main-page-content"]}>
        {React.createElement("div", {
          dangerouslySetInnerHTML: { __html: pages?.page_content },
        })}
      </div>
    </>
  );
}

export default SpecialPage;

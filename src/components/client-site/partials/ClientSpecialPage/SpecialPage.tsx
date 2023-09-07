import React, { useEffect, useState } from "react";
import styles from "../ClientSpecialPage/SpecialPage.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
// import "../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";

function SpecialPage() {
  const { pageName } = useParams();
  const [pages, setPages] = useState<any>([]);
  const fetchPages = () => {
    axios
      .get(`http://localhost:7373/pages/`)
      .then((response) => {
        setPages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPages();
  }, [pageName]);

  document.title = `${pages ? `${pages?.page_title} | PetShop` : "Loading..."}`;

  let pageInfo = pages?.find((item: any) => {
    return item.page_title.toLowerCase().replace(/ /g, "-") === pageName;
  });

  return (
    <>
      <div className={styles["contact-us-banner"]}>
        <h1>{pageInfo?.page_title}</h1>
      </div>
      <div className={styles["main-page-content"]}>
        {React.createElement("div", {
          dangerouslySetInnerHTML: { __html: pageInfo?.page_content },
        })}
      </div>
    </>
  );
}

export default SpecialPage;

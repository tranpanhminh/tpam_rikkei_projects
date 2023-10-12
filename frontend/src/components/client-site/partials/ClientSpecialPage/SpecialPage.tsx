import React, { useEffect, useState } from "react";
import styles from "../ClientSpecialPage/SpecialPage.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
// import "../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
// Import API
// 1, Posts API
const pagesAPI = process.env.REACT_APP_API_PAGES;

// --------------------------------------------------

function SpecialPage() {
  const { pageName } = useParams();
  const [pages, setPages] = useState<any>([]);
  const fetchPages = () => {
    axios
      .get(`${pagesAPI}`)
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

  let pageInfo = pages?.find((item: any) => {
    return item.title.toLowerCase().replace(/ /g, "-") === pageName;
  });

  document.title = `${
    pageInfo ? `${pageInfo?.title} | PetShop` : "Loading..."
  }`;

  return (
    <>
      <div className={styles["contact-us-banner"]}>
        <h1>{pageInfo?.title}</h1>
      </div>
      <div className={styles["main-page-content"]}>
        {React.createElement("div", {
          dangerouslySetInnerHTML: { __html: pageInfo?.content },
        })}
      </div>
    </>
  );
}

export default SpecialPage;

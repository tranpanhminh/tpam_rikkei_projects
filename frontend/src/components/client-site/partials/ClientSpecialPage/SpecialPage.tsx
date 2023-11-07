import React, { useEffect, useState } from "react";
import styles from "../ClientSpecialPage/SpecialPage.module.css";
import { useParams } from "react-router-dom";
import { getAllPages } from "../../../../api/pages.api";

// --------------------------------------------------

function SpecialPage() {
  const { pageName } = useParams();
  const [pages, setPages] = useState<any>([]);
  const fetchPages = async () => {
    const result = await getAllPages();
    return setPages(result);
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

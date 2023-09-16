import React from "react";
import styles from "../NotFoundPage/Page404.module.css";
import { NavLink } from "react-router-dom";

function Page404() {
  return (
    <>
      <section className={styles.page_404}>
        <div className={`${styles.container} container`}>
          <div className={`${styles.row} row`}>
            <div className={`${styles.col} ${styles["col-sm-12"]}`}>
              <div
                className={`${styles["col-sm-10"]} ${styles["col-sm-offset-1"]} text-center`}
              >
                <div className={styles.four_zero_four_bg}>
                  <h1 className="text-center">404</h1>
                </div>
                <div className={styles.contant_box_404}>
                  <h3 className={`${styles.h2} h2`}>Look like you're lost</h3>
                  <p className={styles.p}>
                    the page you are looking for not available!
                  </p>
                  <NavLink to="/" className={`${styles.link_404} link_404`}>
                    Return Homepage
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page404;

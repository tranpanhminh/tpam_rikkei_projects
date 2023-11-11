import React, { useState } from "react";
import styles from "../../ClientPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { googleLogin, login } from "../../../../api/users.api";

// ----------------------------------------------

function LoginForm() {
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login(dataLogin);
    if (result) {
      navigate("/");
    }
  };

  const handleLoginGoogle = async () => {
    await googleLogin();
  };

  return (
    <div className={styles["outside-form-login"]}>
      <section className={styles["form-login"]}>
        <h3 className={styles["login-title"]}>Login</h3>
        <input
          type="email"
          placeholder="Email"
          id={styles["input-login-email"]}
          required
          value={dataLogin.email}
          onChange={(event) =>
            setDataLogin({ ...dataLogin, email: event.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          id={styles["input-login-password"]}
          required
          value={dataLogin.password}
          onChange={(event) =>
            setDataLogin({ ...dataLogin, password: event.target.value })
          }
        />
        {/* <p className={styles["forgot-password"]}>
          <a href="#" className={styles["forgot-password-text"]}>
            Forgot password?
          </a>
        </p> */}
        <button className={styles["login-button"]} onClick={handleLogin}>
          Login
        </button>
        <img
          onClick={handleLoginGoogle}
          className={styles["login-with-gmail-icon"]}
          src="https://lh3.googleusercontent.com/pw/ADCreHfHDt-s9pSWyzdo1xtxWFofh5Gm0IlDXmzgqY79Vx-x_79SDjjRItikUJV4pLQLWf-aKinPotVQ8pNtgM91stFdm44R9fA6k_kmUkkj117geinvloOxr2vtMj1glL2WXtPHulSuBZpqyQ_rMTXllj2fvHbfTSNqmu3gqHNFymYquH5xN_m6DJFyw1_K_4FXrwJGb4kNI9zQ7m5qAbAmMWC2uQZN32IFYZ5XaFTG507UMFdzJE_yn9-JhFK01baIsbpeST9QgAMKS1arqD-DCpF7b-OHzyV1SCJ3BXl4JI2CZ9xFUElLOqUdaJumBdpWOg79vVYdN9Us13N6k6xOMH-kMh_jG0R5Y008YErAPYcPWOfxwJcvME1YWDAqGz7SbF9z26_QV9FJ26AyNdPZyJXchCApTZRUVuBVf1FyaCpyMcGvvd4vCBObSkcpmQNkE0tfo9wOI46BtMJL_MIN4q53g9HtOV9Of4tpWSJDunm33GzEnjBKG-EGIYjuqmOgyME3BVgyYGFFlu3ytXFplmkfteQQZquym6_zQ1P6wZZXHhM-64MF2bgzvBltqNJAl_2OAJp0xKWYWfHedbrt6dcEUlMRFvNhIZLgbpSgkZbdwOPUncees8SbxfPqCjtJbX1BcdoUky78neHjIiitvkwvteZCCGhdlPlrg5XflB0-L7fgn1gws54K0yH2RpfqNasUxTDUP-QOefU3Q5zVrzEYspmz3AG7swqUQ_az5-eF9JZ5EwIBOb-sI3JQX-KStCN_5MeoRx13bktyIhiRCNhMyI8Nef08hYoSkrzVbAoyzftyN_YtIlGOM4k48bqdrjYlbaebT6vjSULSiPbjkl7FOx8mWjdAIlBNb8b76TW-AljBCA25dE7HXPnscByer_JZKsDy0pbClAF8Wck8MTLUbA=w1112-h282-s-no-gm?authuser=0"
          alt=""
        />
        <p className={styles["signup-sentence"]}>
          Don't have an account?{" "}
          <NavLink to="/signup" className={styles["signup-text"]}>
            Signup
          </NavLink>
        </p>
        <p className={styles["login-sentence"]}>
          <NavLink to="/reset-password" className={styles["login-text"]}>
            Forgot Password
          </NavLink>
        </p>
      </section>
    </div>
  );
}

export default LoginForm;

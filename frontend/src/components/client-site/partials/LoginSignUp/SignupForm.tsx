import { useState } from "react";
import styles from "../../ClientPage.module.css";

import { NavLink, useNavigate } from "react-router-dom";
import { googleLogin, userRegister } from "../../../../api/users.api";

// ----------------------------------------------------------
function SignupForm() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    full_name: "",
    password: "",
    re_password: "",
  });

  const handleSignUp = async () => {
    const result = await userRegister(userInfo);
    if (result) {
      navigate("/login");
    }
  };

  const handleLoginGoogle = async () => {
    const result = await googleLogin();
    console.log(result);
  };

  return (
    <div className={styles["outside-form-login"]}>
      <div className={styles["form-signup"]}>
        <h3 className={styles["signup-title"]}>Signup</h3>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className={styles["input-email"]}
          title="Please enter a valid email format."
          value={userInfo.email}
          onChange={(event) =>
            setUserInfo({ ...userInfo, email: event.target.value })
          }
        />
        <div className="email-notify"></div>
        <input
          type="text"
          placeholder="Full Name"
          className={styles["input-fullname"]}
          pattern="^[a-zA-Z\s]*$"
          value={userInfo.full_name}
          onChange={(event) =>
            setUserInfo({ ...userInfo, full_name: event.target.value })
          }
        />
        <div className={styles["fullname-notify"]}></div>
        <input
          type="password"
          placeholder="Password"
          className={styles["input-password"]}
          value={userInfo.password}
          onChange={(event) =>
            setUserInfo({ ...userInfo, password: event.target.value })
          }
        />
        <div className={styles["password-notify"]}></div>
        <input
          type="password"
          placeholder="Confirm Password"
          className={styles["input-repassword"]}
          value={userInfo.re_password}
          onChange={(event) =>
            setUserInfo({ ...userInfo, re_password: event.target.value })
          }
        />
        <div className={styles["repassword-notify"]}></div>
        <button className={styles["signup-button"]} onClick={handleSignUp}>
          Signup
        </button>
        <img
          onClick={handleLoginGoogle}
          className={styles["login-with-gmail-icon"]}
          src="https://lh3.googleusercontent.com/pw/ADCreHfHDt-s9pSWyzdo1xtxWFofh5Gm0IlDXmzgqY79Vx-x_79SDjjRItikUJV4pLQLWf-aKinPotVQ8pNtgM91stFdm44R9fA6k_kmUkkj117geinvloOxr2vtMj1glL2WXtPHulSuBZpqyQ_rMTXllj2fvHbfTSNqmu3gqHNFymYquH5xN_m6DJFyw1_K_4FXrwJGb4kNI9zQ7m5qAbAmMWC2uQZN32IFYZ5XaFTG507UMFdzJE_yn9-JhFK01baIsbpeST9QgAMKS1arqD-DCpF7b-OHzyV1SCJ3BXl4JI2CZ9xFUElLOqUdaJumBdpWOg79vVYdN9Us13N6k6xOMH-kMh_jG0R5Y008YErAPYcPWOfxwJcvME1YWDAqGz7SbF9z26_QV9FJ26AyNdPZyJXchCApTZRUVuBVf1FyaCpyMcGvvd4vCBObSkcpmQNkE0tfo9wOI46BtMJL_MIN4q53g9HtOV9Of4tpWSJDunm33GzEnjBKG-EGIYjuqmOgyME3BVgyYGFFlu3ytXFplmkfteQQZquym6_zQ1P6wZZXHhM-64MF2bgzvBltqNJAl_2OAJp0xKWYWfHedbrt6dcEUlMRFvNhIZLgbpSgkZbdwOPUncees8SbxfPqCjtJbX1BcdoUky78neHjIiitvkwvteZCCGhdlPlrg5XflB0-L7fgn1gws54K0yH2RpfqNasUxTDUP-QOefU3Q5zVrzEYspmz3AG7swqUQ_az5-eF9JZ5EwIBOb-sI3JQX-KStCN_5MeoRx13bktyIhiRCNhMyI8Nef08hYoSkrzVbAoyzftyN_YtIlGOM4k48bqdrjYlbaebT6vjSULSiPbjkl7FOx8mWjdAIlBNb8b76TW-AljBCA25dE7HXPnscByer_JZKsDy0pbClAF8Wck8MTLUbA=w1112-h282-s-no-gm?authuser=0"
          alt=""
        />
        <p className={styles["login-sentence"]}>
          Already have an account?{" "}
          <NavLink to="/login" className={styles["login-text"]}>
            Login
          </NavLink>
        </p>
        <p className={styles["login-sentence"]}>
          <NavLink to="/reset-password" className={styles["login-text"]}>
            Forgot Password
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;

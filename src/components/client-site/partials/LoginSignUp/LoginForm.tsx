import React from "react";

function LoginForm() {
  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <div className="outside-form-login">
      <section className="form-login">
        <h3 className="login-title">Login</h3>
        <input
          type="email"
          placeholder="Email"
          id="input-login-email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="input-login-password"
        />
        <p className="forgot-password">
          <a href="#" className="forgot-password-text">
            Forgot password?
          </a>
        </p>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <p className="signup-sentence">
          Don't have an account?{" "}
          <a href="./signup-page.html" className="signup-text">
            Signup
          </a>
        </p>
      </section>
    </div>
  );
}

export default LoginForm;

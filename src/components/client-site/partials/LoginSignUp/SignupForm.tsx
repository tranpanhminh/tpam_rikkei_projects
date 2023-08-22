import React from "react";

function SignupForm() {
  const handleSignUp = () => {
    // Handle signup logic here
  };

  const handlePreventForm = (event: React.FormEvent) => {
    event.preventDefault();
    // Optionally handle other form submission logic here
  };

  return (
    <div className="outside-form-signup">
      <form className="form-signup" onSubmit={handlePreventForm}>
        <h3 className="signup-title">Signup</h3>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="input-email"
          title="Please enter a valid email format."
        />
        <div className="email-notify"></div>
        <input
          type="text"
          placeholder="Full Name"
          className="input-fullname"
          pattern="^[a-zA-Z\s]*$"
        />
        <div className="fullname-notify"></div>
        <input
          type="password"
          placeholder="Password"
          className="input-password"
        />
        <div className="password-notify"></div>
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-repassword"
        />
        <div className="repassword-notify"></div>
        <button className="signup-button" onClick={handleSignUp}>
          Signup
        </button>
        <p className="login-sentence">
          Already have an account?{" "}
          <a href="./login-page.html" className="login-text">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;

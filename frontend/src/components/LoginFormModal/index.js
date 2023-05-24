import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import DemoUser from "../Navigation/DemoUser";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  // const [backendErrors, setBackendErrors] = useState([]);
  const { closeModal } = useModal();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleInputErrors = () => {
    const errorsObj = {};
    if (credential.length < 4) {
      errorsObj.credential =
        "Username and Email must be more than 4 characters";
    }
    if (password.length < 6) {
      errorsObj.password = "Password must be more than 6 characters";
    }

    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [credential, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      dispatch(sessionActions.login({ credential, password }))
        .then(() => closeModal())
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors({ credential: data.errors[0] });
        });
    }
    setHasSubmitted(true);
  };

  return (
    <div className="log-in-modal-container">
      <h1 className="modal-heading">Log In</h1>
      <form onSubmit={handleSubmit} className="sign-up-modal-form-container">
        {hasSubmitted && errors.credential && (
          <div className="errors">{errors.credential}</div>
        )}
        {hasSubmitted && errors.password && (
          <div className="errors">{errors.password}</div>
        )}
        <label>
          <input
            type="text"
            value={credential}
            className="sign-up-input"
            placeholder=" Username or email"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder=" Password"
            className="sign-up-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="sign-up-button-modal"
          disabled={hasSubmitted && Object.values(errors).length > 0}
        >
          Log In
        </button>
      <div className="demo-user-button-container">
        <DemoUser />
      </div>
      </form>
    </div>
  );
}

export default LoginFormModal;

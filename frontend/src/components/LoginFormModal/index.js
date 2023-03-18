import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState([]);
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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <p>
          {backendErrors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </p>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        {hasSubmitted && errors.credential && (
          <p className="errors">{errors.credential}</p>
        )}
        <p></p>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {hasSubmitted && errors.password && (
          <p className="errors">{errors.password}</p>
        )}
        <p></p>
        <button
          type="submit"
          className="modal-form-log-in-button"
          disabled={hasSubmitted && Object.values(errors).length > 0}
        >
          Log In
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;

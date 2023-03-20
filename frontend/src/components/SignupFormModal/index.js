import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();

  const handleInputErrors = () => {
    const errorsObj = {};
    if (email.length < 4) {
      errorsObj.email = "Email must be more than 4 characters";
    }
    if (username.length < 4) {
      errorsObj.username = "Username must be more than 4 characters";
    }
    if (firstName.length === 0) {
      errorsObj.firstName = "First name is required ";
    }
    if (lastName.length === 0) {
      errorsObj.lastName = "Last name is required ";
    }
    if (password.length < 6) {
      errorsObj.password = "Password must be more than 6 characters";
    }
    if (password !== confirmPassword) {
      errorsObj.match = "Password must match confirm password";
    }

    setErrors(errorsObj);
  };
  useEffect(() => {
    handleInputErrors();
  }, [email, username, firstName, lastName, password, confirmPassword]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (password === confirmPassword) {
  //     setErrors([]);
  //     return
  //       .then(closeModal)
  //       .catch(async (res) => {
  //         const data = await res.json();
  //         if (data && data.errors) {
  //           setErrors(Object.values(data.errors));
  //         }
  //       });
  //   }
  //   return setErrors([
  //     "Confirm Password field must be the same as the Password field",
  //   ]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(() => closeModal())
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors({ email: data.errors[0] });
        });
    }
    setHasSubmitted(true);
  };

  return (
    <>
      <h1 className="modal-heading">Sign Up</h1>
      {hasSubmitted && errors.email && (
        <div className="errors">{errors.email}</div>
      )}
      {hasSubmitted && errors.username && (
        <div className="errors">{errors.username}</div>
      )}
      {hasSubmitted && errors.firstName && (
        <div className="errors">{errors.firstName}</div>
      )}
      {hasSubmitted && errors.lastName && (
        <div className="errors">{errors.lastName}</div>
      )}
      {hasSubmitted && errors.password && (
        <div className="errors">{errors.password}</div>
      )}
      {hasSubmitted && errors.confirmPassword && (
        <div className="errors">{errors.confirmPassword}</div>
      )}
      {hasSubmitted && errors.match && (
        <div className="errors">{errors.match}</div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Email"
            className="input-length-standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <p></p>
        <label>
          <input
            type="text"
            placeholder=" Username"
            className="input-length-standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <p></p>

        <label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            className="input-length-standard"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <p></p>

        <label>
          <input
            type="text"
            className="input-length-standard"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <p></p>

        <label>
          <input
            type="password"
            className="input-length-standard"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <p></p>

        <label>
          <input
            type="password"
            className="input-length-standard"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <p></p>
        <button
          className="sign-up-button-modal"
          type="submit"
          disabled={hasSubmitted && Object.values(errors).length > 0}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;

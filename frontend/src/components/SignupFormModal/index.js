import React, { useState } from "react";
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
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(Object.values(data.errors));
          }
        });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <>
      <h1 className="modal-heading">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
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
        <button className="sign-up-button-modal" type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;

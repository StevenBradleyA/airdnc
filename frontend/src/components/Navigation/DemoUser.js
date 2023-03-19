import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useModal } from "../../context/Modal";

const DemoUser = () => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
  const onClick = () => {
    dispatch(login({ credential: "demo@user.io", password: "password" }))
    .then(() => closeModal())

  };

  return <button onClick={onClick} className="demo-user-button">Demo User</button>;
};

export default DemoUser;

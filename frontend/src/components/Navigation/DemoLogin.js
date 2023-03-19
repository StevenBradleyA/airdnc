import { useDispatch } from "react-redux";
import { login } from "../../store/session";

const DemoLogin = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(login({ credential: "demo@user.io", password: "password" }));
  };

  return <button onClick={onClick} className="demo-log-in-button">Demo login</button>;
};

export default DemoLogin;
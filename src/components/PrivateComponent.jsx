import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const auth = false;
  return auth ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateComponent;

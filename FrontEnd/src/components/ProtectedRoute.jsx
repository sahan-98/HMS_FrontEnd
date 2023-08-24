import { useSelector } from "react-redux";
import { showSystemAlert } from "../app/services/alertServices";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children, loginPath }) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.login.userId);
  useEffect(() => {
    if (!userId) {
      showSystemAlert("Please login to continue", "warning");
      navigate(loginPath);
    }
  }, [userId, children, navigate, loginPath]);

  if (userId) return children;
};

export default ProtectedRoute;

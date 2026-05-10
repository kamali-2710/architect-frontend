import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user"); // clear storage
    setUser(null); // reset state
    navigate("/login", { replace: true }); // redirect
  }, [navigate, setUser]);

  return null;
};

export default Logout;
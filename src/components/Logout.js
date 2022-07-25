import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = ({ setIsLogged, setUser }) => {
  let navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("user");
    setIsLogged(false);
    navigate("/login");
  }, []);
};

export default Logout;

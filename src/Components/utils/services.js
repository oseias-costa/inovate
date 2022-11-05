import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

export const LogoutSessao = () => {
    const navigate = useNavigate()

    signOut(auth).catch((error) => {
      console.log(error);
    });
    return navigate("/Login");
  };

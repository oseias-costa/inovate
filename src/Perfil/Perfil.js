import { useContext } from "react";
import { AuthContext } from "../context/UserAuthContext";

export const Perfil = () => {
  const { currentUser } = useContext(AuthContext);
  const response = JSON.stringify(currentUser);
  const convertedResponse = { ...JSON.parse(response) };
  console.log("lastLoginAt:", convertedResponse.lastLoginAt);
  return (
    <div>
      <h1>Perfil</h1>
      <p>{convertedResponse.email}</p>
    </div>
  );
};

import { useEffect, useState } from "react";
import { doSilentRefresh, silentRefreshLoop } from "../utils/token";
import { Navigate } from "react-router-dom";

const LoadingWrapper = ({ authorization, saveAuthorization, children }) => {
  const [isLoading, setIsLoading] = useState(true);

  console.log(authorization);
  useEffect(() => {
    async function tryRefreshToken() {
      if (!isLoading) return;

      if (authorization) {
        return setIsLoading(false);
      }

      console.log("========trying to refresh Token!========");

      try {
        const accessToken = await doSilentRefresh();
        const authorization = `Bearer ${accessToken}`;
        saveAuthorization(authorization);
        setIsLoading(false);

        silentRefreshLoop(accessToken, (newAccessToken) => {
          const authorization = `Bearer ${newAccessToken}`;
          saveAuthorization(authorization);
        });
      } catch (error) {
        console.log("Fehler im LoadingWrapper", error);
        setIsLoading(false);
      }
    }
    tryRefreshToken();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (authorization) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default LoadingWrapper;

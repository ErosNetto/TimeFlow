import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Verifica se o usuário está autenticado (logado)
export const useAuth = () => {
  const { user } = useSelector((state) => state.authUser);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }

    setLoading(false);
  }, [user]);

  return { auth, loading };
};

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {AxiosError, AxiosResponse} from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import {LoginData, RegisterData, User} from "../types";
import axios from "axios";
import {destroyToken, getToken, setToken} from "../utils/tokens";
import {setRequestAuthorizationHeader} from "../utils/requests";

export interface AuthContextType {
  user: User;
  loading: boolean;
  error?: AxiosError<any>;
  login: (params: LoginData) => void;
  register: (params: RegisterData) => void;
  logout: () => void;
  whoami: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({children}: { children: ReactNode; }): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<AxiosError<any> | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const token = getToken();

    if (token) {
      setRequestAuthorizationHeader(token);
      whoami();
    } else {
      setLoadingInitial(false);
      logout();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function whoami(): void {
    axios.get('/auth/whoami')
      .then((response: AxiosResponse) => {
        setUser(response.data as User)
      })
      .catch((_error) => {
        logout();
        navigate('/auth/login')
      })
      .finally(() => setLoadingInitial(false));
  }

  function login(params: LoginData): void {
    setLoading(true);

    axios.post('/auth/login', { ...params })
      .then((response) => {
        const token = response.data.access_token;
        setToken(token);
        setRequestAuthorizationHeader(token);

        whoami();
        navigate('/')
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  function register(params: RegisterData) {
    setLoading(true);

    axios.post('/auth/register', { ...params })
      .then(() => {
        navigate('/auth/login')
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  function logout() {
    setUser(undefined);
    destroyToken();

    navigate('/')
  }

  const memoizedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      logout,
      whoami,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoizedValue as AuthContextType}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export default function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

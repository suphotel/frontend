import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/home";
import Register from "../pages/auth/register";
import {AuthProvider} from "../hooks/useAuth";
import Login from "../pages/auth/login";

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/auth/login"} element={<Login />} />
          <Route path={"/auth/register"} element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import Home from "../pages/home";
import Register from "../pages/auth/register";
import useAuth, {AuthProvider} from "../hooks/useAuth";
import Login from "../pages/auth/login";
import Profile from "../pages/profile";
import {Navbar} from "../components/layouts/navbar";
import {Role} from "../types";
import Dashboard from "../pages/dashboard";

function AppLayout() {
  return (
    <Navbar />
  )
}

function RequireAuth({children}: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={"/auth/login"} state={{from: location}} replace />;
  }

  return children;
}

function RequireAdmin({children}: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();

  if (user?.role !== Role.ADMIN) {
    return <Navigate to={"/"} state={{from: location}} replace />;
  }

  return children;
}

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={"/"} element={
            <>
              <AppLayout />
              <Home />
            </>
          } />

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <>
                  <AppLayout />
                  <Profile />
                </>
              </RequireAuth>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <RequireAdmin>
                  <>
                    <AppLayout />
                    <Dashboard />
                  </>
                </RequireAdmin>
              </RequireAuth>
            }
          />

          <Route path={"/auth/login"} element={<Login />} />
          <Route path={"/auth/register"} element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
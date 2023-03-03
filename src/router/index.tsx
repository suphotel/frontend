import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/home";
import Register from "../pages/auth/register";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/auth/register"} element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
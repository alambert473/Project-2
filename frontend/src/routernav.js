import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import SignUp from './signup';
import SignIn from "./signin";
import App from './App';

const router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </BrowserRouter>
      <Outlet />
    </div>
  );
};

export default router;
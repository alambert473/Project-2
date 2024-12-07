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
        </Routes>
      </BrowserRouter>
      <Outlet />
    </div>
  );
};

export default router;
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import MainTable from "../pages/MainTable";
import SignIn from "../pages/SignIn";
import OneTable from "../pages/OneTable";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute component={MainTable} />} />
        <Route path="/table/:id" element={<OneTable />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
const ProtectedRoute = ({ component: Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return <Component />;
};

export default AppRouter;

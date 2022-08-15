import React from "react";
import { Routes, Route } from "react-router-dom";
import AddFormpage from "../pages/AddFormpage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DetailPage from "../pages/DetailPage";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from"../pages/ProfilePage";

const GlobalRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/detail/:id" element={<DetailPage />}></Route>
        <Route path="/add" element={<AddFormpage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route element={<ProtectedRoute />}>
        <Route path='/user-profile' element={<ProfilePage  />} />
        </Route>
      </Routes>
    </>
  );
};

export default GlobalRouter;

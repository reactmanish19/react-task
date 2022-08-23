import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoPage from "./nopage/NoPage";
import Users from "./users/Users";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

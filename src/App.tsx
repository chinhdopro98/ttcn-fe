import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import MainApp from "./components/layout/index";
import MainAdmin from "./components/layout/index2";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRouter from "./router/PrivateRouter";
import PublicRouter from "./router/PublicRouter";
import LoginAdmin from "./pages/LoginAdmin";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Navigate to="/app" replace />} />
        <Route element={<PrivateRouter />}>
          <Route path="app/*" element={<MainApp />} />
          <Route path="admin/*" element={<MainAdmin />} />
        </Route>
        <Route element={<PublicRouter />}>
          <Route path="/login" element={<Login />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

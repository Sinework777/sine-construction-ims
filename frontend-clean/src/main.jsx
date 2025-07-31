import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import './config/debugFirebaseEnv';
import initSuperAdmin from './firebase/initSuperAdmin';
import { RBACProvider } from './context/RBACContext';


initSuperAdmin();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RBACProvider>
        <App />
      </RBACProvider>
    </BrowserRouter>
  </React.StrictMode>
);

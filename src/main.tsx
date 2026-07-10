import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    <AppRoutes />
  </BrowserRouter>
);
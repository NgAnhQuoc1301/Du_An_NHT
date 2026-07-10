import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLibraryPage from "../pages/Dashboards/DashboardLibraryPage";
import HomePage from "../pages/Home/HomePage";
import SolutionsPage from "../pages/Solutions/SolutionsPage";
import SolutionDetailPage from "../pages/SolutionDetail/SolutionDetailPage";
import ContactPage from "../pages/Contact/ContactPage";
import DashboardDetailPage from "../pages/Dashboards/DashboardDetailPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/:id" element={<SolutionDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/dashboards" element={<DashboardLibraryPage />} />
        <Route path="/dashboards/:slug" element={<DashboardDetailPage />} />
      </Route>
    </Routes>
  );
}
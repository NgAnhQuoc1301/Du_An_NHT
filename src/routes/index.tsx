import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PageLoader from "../components/common/PageLoader";

// Lazy load all pages for code splitting
const HomePage = React.lazy(() => import("../pages/Home/HomePage"));
const SolutionsPage = React.lazy(() => import("../pages/Solutions/SolutionsPage"));
const SolutionDetailPage = React.lazy(() => import("../pages/SolutionDetail/SolutionDetailPage"));
const ContactPage = React.lazy(() => import("../pages/Contact/ContactPage"));
const DashboardLibraryPage = React.lazy(() => import("../pages/Dashboards/DashboardLibraryPage"));
const DashboardDetailPage = React.lazy(() => import("../pages/Dashboards/DashboardDetailPage"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route 
          path="/" 
          element={
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          } 
        />
        <Route 
          path="/solutions" 
          element={
            <Suspense fallback={<PageLoader />}>
              <SolutionsPage />
            </Suspense>
          } 
        />
        <Route 
          path="/solutions/:id" 
          element={
            <Suspense fallback={<PageLoader />}>
              <SolutionDetailPage />
            </Suspense>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <Suspense fallback={<PageLoader />}>
              <ContactPage />
            </Suspense>
          } 
        />
        <Route 
          path="/dashboards" 
          element={
            <Suspense fallback={<PageLoader />}>
              <DashboardLibraryPage />
            </Suspense>
          } 
        />
        <Route 
          path="/dashboards/:slug" 
          element={
            <Suspense fallback={<PageLoader />}>
              <DashboardDetailPage />
            </Suspense>
          } 
        />
      </Route>
    </Routes>
  );
}
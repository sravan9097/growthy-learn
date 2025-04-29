
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import CoursesPage from "./pages/CoursesPage";
import MyLearningsPage from "./pages/MyLearningsPage";
import MyMenteesPage from "./pages/MyMenteesPage";
import TILDashboardPage from "./pages/TILDashboardPage";
import ReflectPage from "./pages/ReflectPage";
import GrowthJourneyPage from "./pages/GrowthJourneyPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import ModulePage from "./pages/ModulePage";
import NotFound from "./pages/NotFound";
import CreateOnePagerPage from "./pages/CreateOnePagerPage";
import OnePagerDetailPage from "./pages/OnePagerDetailPage";
import OnePagerListPage from "./pages/OnePagerListPage";
import AllOnePagersPage from "./pages/AllOnePagersPage";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route path="/module/:courseId/:moduleId" element={<ModulePage />} />
            <Route path="/my-learnings" element={<MyLearningsPage />} />
            <Route path="/my-mentees" element={<MyMenteesPage />} />
            <Route path="/til-dashboard" element={<TILDashboardPage />} />
            <Route path="/reflect" element={<ReflectPage />} />
            <Route path="/growth-journey" element={<GrowthJourneyPage />} />
            <Route path="/one-pager" element={<OnePagerListPage />} />
            <Route path="/create-one-pager" element={<CreateOnePagerPage />} />
            <Route path="/one-pager/:id" element={<OnePagerDetailPage />} />
            <Route path="/all-one-pagers" element={<AllOnePagersPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import MyLearningsPage from "./pages/MyLearningsPage";
import MyMenteesPage from "./pages/MyMenteesPage";
import TILDashboardPage from "./pages/TILDashboardPage";
import ReflectPage from "./pages/ReflectPage";
import GrowthJourneyPage from "./pages/GrowthJourneyPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import NotFound from "./pages/NotFound";




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/my-learnings" element={<MyLearningsPage />} />
          <Route path="/my-mentees" element={<MyMenteesPage />} />
          <Route path="/til-dashboard" element={<TILDashboardPage />} />
          <Route path="/reflect" element={<ReflectPage />} />
          <Route path="/growth-journey" element={<GrowthJourneyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

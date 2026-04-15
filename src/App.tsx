import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";

const About = lazy(() => import("./pages/About"));
const Packages = lazy(() => import("./pages/Packages"));
const Vehicles = lazy(() => import("./pages/Vehicles"));
const Services = lazy(() => import("./pages/Services"));
const Booking = lazy(() => import("./pages/Booking"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const CancellationPolicy = lazy(() => import("./pages/CancellationPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="loading-screen">
    <div className="loading-spinner" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

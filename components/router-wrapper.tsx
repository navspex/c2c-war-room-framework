"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./landing-page";
import { Dashboard } from "./dashboard";

export function RouterWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

"use client";

import { useState } from "react";
import Layout from "./components";
import { Route } from "./types";

export default function DashboardMockup() {
  const [currentRoute, setCurrentRoute] = useState<Route>("overview");

  return (
    <div className="relative">
      <Layout currentRoute={currentRoute} onRouteChange={setCurrentRoute} />
    </div>
  );
}

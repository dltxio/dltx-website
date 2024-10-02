import { lazy } from "react";
import { AppRoutes } from "./types/app";

const Home = lazy(() => import("./pages/Home"));
const Capability = lazy(() => import("./pages/Capability"));
const Manifesto = lazy(() => import("./pages/Manifesto"));
const Insights = lazy(() => import("./pages/Insights"));
const InsightsTemplate = lazy(() => import("./pages/InsightsTemplate"));
const Contact = lazy(() => import("./pages/Contact"));

export const Routing: AppRoutes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/capability",
    element: <Capability />
  },
  {
    path: "/manifesto",
    element: <Manifesto />
  },
  {
    path: "/insights",
    element: <Insights />
  },
  {
    path: "/insights/:slug",
    element: <InsightsTemplate />
  },
  {
    path: "/contact",
    element: <Contact />
  },
];
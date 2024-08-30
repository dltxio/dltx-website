import { AppRoutes } from "./types/app";
import Home from "./pages/Home";
import Capability from "./pages/Capability";
import Manifesto from "./pages/Manifesto";

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
];

export { default as NotFound } from "./pages/NotFound";

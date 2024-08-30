import { AppRoutes } from "./types/app";
import Home from "./pages/Home";
import Capability from "./pages/Capability";

export const Routing: AppRoutes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/capability",
    element: <Capability />
  },
];

export { default as NotFound } from "./pages/NotFound";

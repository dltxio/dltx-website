import { AppRoutes } from "./types/app";
import Home from "./pages/Home";
import Capability from "./pages/Capability";
import Manifesto from "./pages/Manifesto";
import Contact from "./pages/Contact";

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
    path: "/contact",
    element: <Contact />
  },
];

export { default as NotFound } from "./pages/NotFound";

import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Routing } from "./Routing";
import Transition from "./pages/Transition";
import NotFound from "./pages/NotFound";

const Navigation: React.FC = () => (
    <Suspense fallback={<Transition />}>
        <Routes>
            {Routing.map(({ path, element, props }) => (
                <Route key={path} path={path} element={element} {...props} />
            ))}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
);

export default Navigation;

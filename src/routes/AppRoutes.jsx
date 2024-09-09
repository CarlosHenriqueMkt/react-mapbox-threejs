import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Dubai from "../pages/Dubai";
import FacilityView from "../components/FacilityView";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<DubaiWithUI />} />
			<Route path="/dubai/*" element={<DubaiWithUI />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

const DubaiWithUI = () => {
	const location = useLocation();

	useEffect(() => {
		const facilityIdMatch = location.pathname.match(/^\/dubai\/[^/]+$/);

		if (facilityIdMatch) {
			const lastReloadedPath = sessionStorage.getItem("lastReloadedPath");
			if (lastReloadedPath !== location.pathname) {
				sessionStorage.setItem("lastReloadedPath", location.pathname);
				window.location.reload();
			}
		} else {
			sessionStorage.removeItem("lastReloadedPath");
		}
	}, [location.pathname]);

	return (
		<>
			<Routes>
				<Route path="/" element={<Dubai />} />
				<Route path="/:facilityId" element={<FacilityView />} />
			</Routes>
		</>
	);
};

export default AppRoutes;

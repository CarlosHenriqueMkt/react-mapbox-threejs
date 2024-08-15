import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "../pages/Login";
import NotFound from "../pages/NotFound";
import Dubai from "../pages/DubaiCity";
import FacilityView from "../components/FacilityView";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
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
			// Recupera a última rota que foi recarregada
			const lastReloadedPath = sessionStorage.getItem("lastReloadedPath");

			// Verifica se a rota atual é diferente da última recarregada
			if (lastReloadedPath !== location.pathname) {
				// Armazena a rota atual
				sessionStorage.setItem("lastReloadedPath", location.pathname);
				window.location.reload();
			}
		} else {
			// Remove a informação do sessionStorage ao sair da rota específica
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

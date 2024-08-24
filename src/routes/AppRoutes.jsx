import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "../pages/Login";
import NotFound from "../pages/NotFound";
import Dubai from "../pages/Dubai";
import FacilityView from "../components/FacilityView";
import { getAccessToken, getRefreshToken } from "../api/authService"; // Importe as funções para obter os tokens

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route
				path="/dubai/*"
				element={<ProtectedRoute element={<DubaiWithUI />} />}
			/>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

// Componente que verifica as credenciais
const ProtectedRoute = ({ element }) => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// Verifica se há um access token e refresh token armazenados
		const accessToken = getAccessToken();
		const refreshToken = getRefreshToken();
		if (!accessToken || !refreshToken) {
			// Redireciona para a página de login se não houver credenciais
			navigate("/", { state: { from: location } });
		}
	}, [navigate, location]);

	return element;
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

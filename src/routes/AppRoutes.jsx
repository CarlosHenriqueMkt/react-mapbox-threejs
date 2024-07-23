// AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login";
import NotFound from "../pages/NotFound";
import Dubai from "../pages/DubaiCity";
import Scene1 from "../pages/SceneOne";
import Scene2 from "../pages/SceneTwo";
import CityUI from "../components/CityUI";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/dubai/*" element={<DubaiWithUI />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

const DubaiWithUI = () => (
	<>
		<CityUI />
		<Routes>
			<Route path="/" element={<Dubai />} />
			<Route path="/scene1" element={<Scene1 />} />
			<Route path="/scene2" element={<Scene2 />} />
			{/* Adicione mais rotas conforme necessário */}
		</Routes>
	</>
);

export default AppRoutes;

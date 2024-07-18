import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Login";
import VXBoard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Dubai from "../pages/DubaiCity";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/dashboard/*" element={<VXBoard />} />
			<Route path="/dubai" element={<Dubai />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;

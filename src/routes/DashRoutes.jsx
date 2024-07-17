import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Scene1Overlay from "../components/OverlaySceneOne";
import Scene2Overlay from "../components/OverlaySceneTwo";
import Scene1 from "../pages/SceneOne";
import Scene2 from "../pages/SceneTwo";
import Renderer from "../components/Renderer";

export default function DashRoutes({ setOpenDrawerId }) {
	const location = useLocation();

	const renderOverlay = () => {
		switch (location.pathname) {
			case "/dashboard":
				return <Scene1Overlay />;
			case "/dashboard/scene2":
				return <Scene2Overlay />;
			default:
				return null;
		}
	};

	return (
		<>
			<Renderer setOpenDrawerId={setOpenDrawerId}>
				<Routes>
					<Route path="/" element={<Navigate to="scene1" />} />
					<Route
						path="scene1"
						element={<Scene1 setOpenDrawerId={setOpenDrawerId} />}
					/>
					<Route
						path="scene2"
						element={<Scene2 setOpenDrawerId={setOpenDrawerId} />}
					/>
				</Routes>
			</Renderer>
			{renderOverlay()}
		</>
	);
}

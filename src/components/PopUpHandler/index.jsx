import React, { useState, useEffect, useRef } from "react";
import { buildings } from "../../data/buildings"; // Importa o array buildings
import { Box } from "@mui/material";
import PopupAlert from "../PopupAlert";

export default function PopupHandler() {
	// Extrair os alertas dos buildings e criar um array único de alertas
	const allAlerts = buildings.flatMap((building) => building.alerts);

	const [alerts, setAlerts] = useState(allAlerts.slice(0, 3)); // Pega apenas os 3 primeiros alertas
	const [isVisible, setIsVisible] = useState(false); // Estado para controle de visibilidade
	const containerRef = useRef(null);

	useEffect(() => {
		// Simulação de carregamento de conteúdo e atraso para mostrar o popup
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 5000); // 5 segundos de atraso

		// Limpeza do timer ao desmontar o componente
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (containerRef.current) {
			const { scrollHeight, clientHeight } = containerRef.current;
			containerRef.current.scrollTop = scrollHeight - clientHeight;
		}
	}, [alerts]);

	return (
		<Box
			ref={containerRef}
			sx={{
				position: "fixed",
				left: 10,
				bottom: 0,
				width: "100%",
				maxWidth: 450,
				maxHeight: 700,
				overflowY: "auto",
				padding: 2,
				zIndex: 1,
				display: "flex",
				flexDirection: "column-reverse",
				gap: 2,
				opacity: isVisible ? 1 : 0,
				transition: "opacity 0.3s ease-in-out", // Animação de opacidade
				"&::-webkit-scrollbar": {
					width: "1px",
					backgroundColor: "transparent",
				},
				"&::-webkit-scrollbar-thumb": {
					backgroundColor: "transparent",
				},
				"&::-webkit-scrollbar-track": {
					backgroundColor: "transparent",
				},
			}}
		>
			{alerts.map((alert) => (
				<PopupAlert key={alert.id} alert={alert} />
			))}
		</Box>
	);
}

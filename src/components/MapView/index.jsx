import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import mapboxglSupported from "@mapbox/mapbox-gl-supported";
import { Box } from "@mui/material";
import CityFacilityDrawer from "../CityFacilityDrawer";
import { buildings } from "../../data/buildings"; // Certifique-se de ajustar o caminho correto

export default function DubaiCityView({ moveCameraToCoordinates }) {
	const mapContainerRef = useRef();
	const mapRef = useRef();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [facilityData, setFacilityData] = useState(null);

	useEffect(() => {
		if (!moveCameraToCoordinates || !mapRef.current) {
			console.error(
				"moveCameraToCoordinates is not defined or mapRef is null"
			);
			return;
		}

		const initializeMoveCamera = () => {
			if (mapRef.current && moveCameraToCoordinates) {
				console.log("Initializing moveCameraToCoordinates");
				moveCameraToCoordinates.current = (coordinates) => {
					console.log("Moving camera to:", coordinates);
					mapRef.current.flyTo({
						center: coordinates,
						zoom: 18,
						essential: true,
					});
				};
			}
		};

		// Use requestAnimationFrame para garantir que o DOM esteja completamente pronto
		const rafId = requestAnimationFrame(initializeMoveCamera);

		return () => cancelAnimationFrame(rafId);
	}, [moveCameraToCoordinates]);

	// Inicializar o mapa
	useEffect(() => {
		if (!mapboxglSupported.supported()) {
			alert(
				"Seu navegador não suporta WebGL. Por favor, use um navegador que suporte WebGL para visualizar o mapa."
			);
			return;
		}

		mapboxgl.accessToken =
			"pk.eyJ1IjoidW5pZmktc29sdXRpb25zIiwiYSI6ImNseXBuMDh4ZDBudnYyaW9qZWJwZWR1OGcifQ.J5QN12t-DF9QsCefLyjepQ"; // Substitua pelo seu token de acesso

		mapRef.current = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: "mapbox://styles/unifi-solutions/cm04hfydg00sj01qq1cy4b1dr",
			center: [55.274376, 25.197197],
			zoom: 16,
			pitch: 60,
			bearing: -24,
			minZoom: 15.5,
			maxZoom: 18,
			antialias: false,
		});

		console.log("Adding markers");
		addInteractivePoints(mapRef.current);

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
			}
		};
	}, []);

	const addInteractivePoints = (map) => {
		buildings.forEach((building) => {
			console.log(
				"Adding marker for building:",
				building.name,
				"at coordinates:",
				building.coordinates
			);

			const marker = new mapboxgl.Marker()
				.setLngLat(building.coordinates)
				.addTo(map);

			marker.getElement().addEventListener("click", () => {
				setFacilityData(building);
				setDrawerOpen(true);
			});
		});
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	return (
		<React.Fragment>
			<Box
				ref={mapContainerRef}
				sx={{
					position: "fixed",
					top: 0,
					bottom: 0,
					width: "100%",
					height: "100%",
				}}
			/>
			<CityFacilityDrawer
				open={drawerOpen}
				onClose={handleDrawerClose}
				facilityData={facilityData}
			/>
		</React.Fragment>
	);
}

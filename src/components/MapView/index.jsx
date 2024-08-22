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

	// Função para salvar os markers no cache
	const cacheMarkers = (markers) => {
		localStorage.setItem("cachedMarkers", JSON.stringify(markers));
	};

	// Função para carregar os markers do cache
	const loadMarkersFromCache = () => {
		const cachedMarkers = localStorage.getItem("cachedMarkers");
		return cachedMarkers ? JSON.parse(cachedMarkers) : null;
	};

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
			minZoom: 10,
			maxZoom: 18,
			antialias: false,
		});

		const cachedMarkers = loadMarkersFromCache();

		if (cachedMarkers) {
			// Se os markers estiverem no cache, use-os
			addInteractivePoints(mapRef.current, cachedMarkers);
		} else {
			// Caso contrário, adicione e cacheie os markers
			addInteractivePoints(mapRef.current, buildings);
			cacheMarkers(buildings);
		}

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
			}
		};
	}, []);

	useEffect(() => {
		if (!moveCameraToCoordinates || !mapRef.current) {
			console.error(
				"moveCameraToCoordinates is not defined or mapRef is null"
			);
			return;
		}

		const initializeMoveCamera = () => {
			if (mapRef.current && moveCameraToCoordinates) {
				moveCameraToCoordinates.current = (coordinates) => {
					mapRef.current.flyTo({
						center: coordinates,
						zoom: 18,
						essential: true,
					});
				};
			}
		};

		const rafId = requestAnimationFrame(initializeMoveCamera);

		return () => cancelAnimationFrame(rafId);
	}, [moveCameraToCoordinates]);

	const addInteractivePoints = (map, markersData) => {
		markersData.forEach((building) => {
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

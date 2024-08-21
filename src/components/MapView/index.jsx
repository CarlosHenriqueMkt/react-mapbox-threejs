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

	// Salvar o estado do mapa no localStorage
	const saveMapState = (map) => {
		const center = map.getCenter();
		const zoom = map.getZoom();
		const bearing = map.getBearing();
		const pitch = map.getPitch();
		localStorage.setItem(
			"mapState",
			JSON.stringify({ center, zoom, bearing, pitch })
		);
	};

	// Salvar a referência do mapa para movimentação posterior
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
			style: "mapbox://styles/unifi-solutions/cm033x3cf00ns01qqdyh75ied",
			center: [55.274376, 25.197197],
			zoom: 16,
			pitch: 60,
			bearing: -24,
			antialias: true,
		});

		mapRef.current.on("load", () => {
			const savedState = localStorage.getItem("mapState");
			if (savedState) {
				const { center, zoom, bearing, pitch } = JSON.parse(savedState);
				mapRef.current.setCenter(center);
				mapRef.current.setZoom(zoom);
				mapRef.current.setBearing(bearing);
				mapRef.current.setPitch(pitch);
			}

			if (!mapRef.current.getLayer("add-3d-buildings")) {
				const layers = mapRef.current.getStyle().layers;
				const labelLayerId = layers.find(
					(layer) =>
						layer.type === "symbol" && layer.layout["text-field"]
				).id;
				mapRef.current.addLayer(
					{
						id: "add-3d-buildings",
						source: "composite",
						"source-layer": "building",
						filter: ["==", "extrude", "true"],
						type: "fill-extrusion",
						minzoom: 15,
						paint: {
							"fill-extrusion-color": "#FFF",
							"fill-extrusion-height": [
								"interpolate",
								["linear"],
								["zoom"],
								15,
								0,
								15.05,
								["get", "height"],
							],
							"fill-extrusion-base": [
								"interpolate",
								["linear"],
								["zoom"],
								15,
								0,
								15.05,
								["get", "min_height"],
							],
							"fill-extrusion-opacity": 1,
						},
					},
					labelLayerId
				);
			}

			// Adiciona os marcadores e interação com o drawer
			addInteractivePoints(mapRef.current);

			// Add event listeners to save map state
			mapRef.current.on("moveend", () => saveMapState(mapRef.current));
			mapRef.current.on("zoomend", () => saveMapState(mapRef.current));
			mapRef.current.on("rotateend", () => saveMapState(mapRef.current));
			mapRef.current.on("pitchend", () => saveMapState(mapRef.current));
		});

		// Limpeza dos event listeners quando o componente for desmontado
		return () => {
			if (mapRef.current) {
				mapRef.current.off("moveend", saveMapState);
				mapRef.current.off("zoomend", saveMapState);
				mapRef.current.off("rotateend", saveMapState);
				mapRef.current.off("pitchend", saveMapState);
			}
		};
	}, []);

	// Adicionar os marcadores usando as coordenadas do array buildings
	const addInteractivePoints = (map) => {
		buildings.forEach((building) => {
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

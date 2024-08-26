import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import mapboxglSupported from "@mapbox/mapbox-gl-supported";
import { Box } from "@mui/material";
import ApiFacilityDrawer from "../ApiFacilityDrawer";
import BuildingFacilityDrawer from "../BuildingFacilityDrawer";
import { buildings } from "../../data/buildings";
import { fetchMarkerDataFromAPI } from "../../api/fetchMarkerDataFromAPI";

export default function DubaiCityView({ moveCameraToCoordinates }) {
	const mapContainerRef = useRef();
	const mapRef = useRef();
	const [drawerOpen, setDrawerOpen] = useState(false); // Controla se algum Drawer está aberto
	const [apiDrawerOpen, setApiDrawerOpen] = useState(false); // Controla qual Drawer está aberto
	const [selectedFacilityData, setSelectedFacilityData] = useState(null); // Armazena os dados selecionados
	const [markersData, setMarkersData] = useState(null);

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
		const initializeMapAndMarkers = async () => {
			if (!mapboxglSupported.supported()) {
				alert(
					"Seu navegador não suporta WebGL. Por favor, use um navegador que suporte WebGL para visualizar o mapa."
				);
				return;
			}

			// Busque os dados da API
			const apiMarker = await fetchMarkerDataFromAPI();
			if (!apiMarker) {
				console.error("API marker is required but was not fetched.");
				return;
			}

			const allMarkers = [...buildings, apiMarker];
			setMarkersData(allMarkers);

			// Cacheie os marcadores
			cacheMarkers(allMarkers);

			// Inicialize o mapa após garantir que o marcador da API foi obtido
			mapboxgl.accessToken =
				"pk.eyJ1IjoidW5pZmktc29sdXRpb25zIiwiYSI6ImNseXBuMDh4ZDBudnYyaW9qZWJwZWR1OGcifQ.J5QN12t-DF9QsCefLyjepQ";

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

			// Adicione os marcadores ao mapa
			addInteractivePoints(mapRef.current, allMarkers);
		};

		const cachedMarkers = loadMarkersFromCache();
		if (cachedMarkers) {
			setMarkersData(cachedMarkers);
			initializeMapAndMarkers();
		} else {
			initializeMapAndMarkers();
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
		markersData.forEach((marker) => {
			const markerElement = new mapboxgl.Marker({ color: "purple" })
				.setLngLat(marker.coordinates)
				.addTo(map);

			markerElement.getElement().addEventListener("click", () => {
				if (marker.qrcode) {
					// Se é um dado da API
					if (
						apiDrawerOpen &&
						selectedFacilityData?.id === marker.id
					) {
						setDrawerOpen(false); // Fecha se o mesmo marker da API for clicado
					} else {
						setSelectedFacilityData(marker);
						setApiDrawerOpen(true);
						setDrawerOpen(true); // Abre o Drawer da API
					}
				} else {
					// Se é um dado de buildings
					if (
						!apiDrawerOpen &&
						selectedFacilityData?.id === marker.id
					) {
						setDrawerOpen(false); // Fecha se o mesmo marker de buildings for clicado
					} else {
						setSelectedFacilityData(marker);
						setApiDrawerOpen(false);
						setDrawerOpen(true); // Abre o Drawer de buildings
					}
				}
			});
		});
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	if (!markersData) {
		return <div>Loading...</div>;
	}

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
			{drawerOpen && apiDrawerOpen ? (
				<ApiFacilityDrawer
					open={drawerOpen}
					onClose={handleDrawerClose}
					facilityData={selectedFacilityData}
				/>
			) : (
				<BuildingFacilityDrawer
					open={drawerOpen}
					onClose={handleDrawerClose}
					facilityData={selectedFacilityData}
				/>
			)}
		</React.Fragment>
	);
}

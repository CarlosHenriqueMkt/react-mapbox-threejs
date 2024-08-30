import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import mapboxglSupported from "@mapbox/mapbox-gl-supported";
import { Box, CircularProgress } from "@mui/material";
import ApiFacilityDrawer from "../ApiFacilityDrawer";
import BuildingFacilityDrawer from "../BuildingFacilityDrawer";
import { buildings } from "../../data/buildings";
import { fetchMarkerDataFromAPI } from "../../api/fetchMarkerDataFromAPI";
import CityHeader from "../CityHeader";

export default function DubaiCityView() {
	const mapContainerRef = useRef();
	const mapRef = useRef();
	const moveCameraRef = useRef(null);
	const [drawerType, setDrawerType] = useState(null);
	const [selectedFacilityData, setSelectedFacilityData] = useState(null);
	const [markersData, setMarkersData] = useState(null);

	let moveCameraToCoordinates = moveCameraRef;

	const cacheMarkers = (markers) => {
		localStorage.setItem("cachedMarkers", JSON.stringify(markers));
	};

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

			const apiMarker = await fetchMarkerDataFromAPI();
			if (!apiMarker) {
				console.error("API marker is required but was not fetched.");
				return;
			}

			const allMarkers = [...buildings, apiMarker];
			setMarkersData(allMarkers);
			cacheMarkers(allMarkers);

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

			if (allMarkers) {
				addInteractivePoints(mapRef.current, allMarkers);
			}

			if (moveCameraToCoordinates) {
				moveCameraToCoordinates.current = (coordinates) => {
					mapRef.current.flyTo({
						center: coordinates,
						zoom: 24,
						essential: true,
					});
				};
			}
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
	}, [moveCameraToCoordinates]);

	const addInteractivePoints = (map, markersData) => {
		markersData.forEach((marker) => {
			const markerElement = new mapboxgl.Marker({
				color: "rgba(121, 50, 255, 1)",
			})
				.setLngLat(marker.coordinates)
				.addTo(map);

			const popup = new mapboxgl.Popup({ offset: 25 }).setText(
				marker.name
			);

			markerElement.getElement().addEventListener("click", () => {
				markerElement.setPopup(popup).togglePopup();
				map.flyTo({
					center: marker.coordinates,
					zoom: 18,
					essential: true,
				});

				if (marker.qrcode) {
					if (
						selectedFacilityData?.id === marker.id &&
						drawerType === "api"
					) {
						setDrawerType(null);
					} else {
						setSelectedFacilityData(marker);
						setDrawerType("api");
					}
				} else {
					if (
						selectedFacilityData?.id === marker.id &&
						drawerType === "building"
					) {
						setDrawerType(null);
					} else {
						setSelectedFacilityData(marker);
						setDrawerType("building");
					}
				}
			});
		});
	};

	const handleDrawerClose = () => {
		setDrawerType(null);
	};

	const setPopup = (marker) => {
		// Função para exibir o popup
		const popup = new mapboxgl.Popup({ offset: 25 }).setText(marker.name);
		const markerElement = new mapboxgl.Marker()
			.setLngLat(marker.coordinates)
			.addTo(mapRef.current);

		markerElement.setPopup(popup).togglePopup();
	};

	if (!markersData) {
		return (
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					width: "100vw",
					height: "100vh",
					gap: "8px",
				}}
			>
				Loading...
				<CircularProgress fontSize="24px" />
			</Box>
		);
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
			<Box
				width="100vw"
				display="flex"
				flexDirection="column"
				position="absolute"
				zIndex="999"
			>
				<CityHeader
					moveCameraToCoordinates={moveCameraToCoordinates}
					setPopup={setPopup} // Passe a função para CityHeader
				/>
			</Box>
			{drawerType === "api" && (
				<ApiFacilityDrawer
					open={!!drawerType}
					onClose={handleDrawerClose}
					facilityData={selectedFacilityData}
				/>
			)}
			{drawerType === "building" && (
				<BuildingFacilityDrawer
					open={!!drawerType}
					onClose={handleDrawerClose}
					facilityData={selectedFacilityData}
				/>
			)}
		</React.Fragment>
	);
}

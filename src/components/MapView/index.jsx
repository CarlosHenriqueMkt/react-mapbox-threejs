import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import CityFacilityDrawer from "../CityFacilityDrawer";
import { fetchFacilities } from "../../api/fetchFacilities";
import CityHeader from "../CityHeader";
import mapboxgl from "../../utils/mapbox";
import { addInteractivePoints } from "../../utils/interactivePoints";

export default function DubaiCityView() {
	const mapContainerRef = useRef(null);
	const mapRef = useRef(null);
	const moveCameraRef = useRef(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [selectedFacilityData, setSelectedFacilityData] = useState(null);
	const [markersData, setMarkersData] = useState(null);

	useEffect(() => {
		const fetchFacilitiesData = async () => {
			const apiFacilities = await fetchFacilities();
			if (!apiFacilities) return;

			const processedFacilities = apiFacilities.map((facility) => ({
				...facility,
				coordinates: facility.location
					? [facility.location.longitude, facility.location.latitude]
					: [0, 0],
			}));

			setMarkersData(processedFacilities);
		};

		fetchFacilitiesData();
	}, []);

	useEffect(() => {
		if (mapContainerRef.current && markersData && !mapRef.current) {
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

			addInteractivePoints(
				mapRef.current,
				markersData,
				handleMarkerClick
			);

			moveCameraRef.current = (coordinates) => {
				if (coordinates) {
					mapRef.current.flyTo({
						center: coordinates,
						zoom: 24,
						essential: true,
					});
				}
			};
		}
	}, [markersData]);

	const handleMarkerClick = (marker) => {
		if (selectedFacilityData?.id === marker.id) {
			setDrawerOpen(!drawerOpen);
		} else {
			setSelectedFacilityData(marker);
			setDrawerOpen(true);
		}
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
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
					moveCameraToCoordinates={moveCameraRef}
					setDrawerOpen={setDrawerOpen}
					setSelectedFacilityData={setSelectedFacilityData}
					markersData={markersData}
					handleMarkerClick={handleMarkerClick}
				/>
			</Box>
			<CityFacilityDrawer
				open={drawerOpen}
				onClose={handleDrawerClose}
				facilityData={selectedFacilityData}
			/>
		</React.Fragment>
	);
}

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import mapboxglSupported from "@mapbox/mapbox-gl-supported";
import "mapbox-gl/dist/mapbox-gl.css";
import { pointsData } from "../../data/mapbox";

export default function Dubai() {
	const mapContainerRef = useRef();
	const mapRef = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		if (!mapboxglSupported.supported()) {
			alert(
				"Your browser does not support WebGL. Please use a browser that supports WebGL to view the map."
			);
			return;
		}

		mapboxgl.accessToken =
			"pk.eyJ1IjoidW5pZmktc29sdXRpb25zIiwiYSI6ImNseXBuMDh4ZDBudnYyaW9qZWJwZWR1OGcifQ.J5QN12t-DF9QsCefLyjepQ";

		mapRef.current = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: "mapbox://styles/mapbox/light-v11",
			center: [55.274376, 25.197197],
			zoom: 15.5,
			pitch: 45,
			bearing: -17.6,
			antialias: true,
		});

		mapRef.current.on("load", () => {
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
							"fill-extrusion-color": "#aaa",
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
							"fill-extrusion-opacity": 0.6,
						},
					},
					labelLayerId
				);
			}
			addInteractivePoints(mapRef.current);
		});
	}, []);

	const addInteractivePoints = (map) => {
		pointsData.forEach((point) => {
			const marker = new mapboxgl.Marker()
				.setLngLat(point.coordinates)
				.addTo(map);

			marker.getElement().addEventListener("click", () => {
				navigate(`/dubai/${point.path}`);
			});
		});
	};

	return (
		<div
			style={{
				position: "relative",
			}}
		>
			<div
				ref={mapContainerRef}
				style={{
					position: "fixed",
					top: 0,
					bottom: 0,
					width: "100%",
				}}
			></div>
		</div>
	);
}

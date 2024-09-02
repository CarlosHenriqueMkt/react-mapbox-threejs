// utils/mapUtils.js
import mapboxgl from "./mapbox";

export const addInteractivePoints = (map, markersData, handleMarkerClick) => {
	markersData.forEach((marker) => {
		const markerElement = new mapboxgl.Marker({
			color: "rgba(121, 50, 255, 1)",
		})
			.setLngLat(marker.coordinates)
			.addTo(map);

		const popup = new mapboxgl.Popup({ offset: 25 }).setText(marker.name);

		markerElement.getElement().addEventListener("click", () => {
			markerElement.setPopup(popup).togglePopup();
			map.flyTo({
				center: marker.coordinates,
				zoom: 18,
				essential: true,
			});

			handleMarkerClick(marker);
		});
	});
};

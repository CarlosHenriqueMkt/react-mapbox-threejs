import { proxy } from "valtio";

const floorState = proxy({
	hoveredFloor: "",
	selectedFloor: null,
	selectedFloorPosition: [0, 0, 0],
	panel: null,
	qualitySettings: "balanced",
	renderMode: "default",
});

export { floorState };

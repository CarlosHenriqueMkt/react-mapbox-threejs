import React, { useLayoutEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { floorState } from "../../../store/floorState";

export default function ToolTip() {
	const { hoveredFloor, selectedFloor } = useSnapshot(floorState);
	const [mousePos, setMousePos] = useState({});

	function handleMouseMove(e) {
		setMousePos({ x: e.offsetX, y: e.offsetY });
	}

	useLayoutEffect(() => {
		const containerElement = document.getElementById("container");

		if (containerElement) {
			containerElement.addEventListener("mousemove", handleMouseMove);

			return () => {
				containerElement.removeEventListener(
					"mousemove",
					handleMouseMove
				);
			};
		}
	}, []);

	return (
		<>
			<div
				className={`tool-tip ${!selectedFloor ? "visible" : ""}`}
				style={{ top: `${mousePos.y}px`, left: `${mousePos.x}px` }}
			>
				<p>{hoveredFloor}</p>
				<small>Click for more details</small>
			</div>
		</>
	);
}

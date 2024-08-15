import { useEffect, useRef, useState } from "react";
import FloorSelector from "./FloorSelector";

export default function FloorSelectorObjects() {
	const [grabbing, setGrabbing] = useState(false);
	const mousePositionRef = useRef({ x: 0, y: 0 });
	const [hasMouseMoved, setHasMouseMoved] = useState(false);

	const handleMouseDown = (event) => {
		setGrabbing(true);
		document.getElementById("container").style.cursor = "grabbing";
		mousePositionRef.current = { x: event.clientX, y: event.clientY };
		setHasMouseMoved(false);

		document
			.getElementById("container")
			.addEventListener("mousemove", handleMouseMove);
	};

	const handleMouseMove = (event) => {
		const moved =
			Math.abs(event.clientX - mousePositionRef.current.x) > 10 ||
			Math.abs(event.clientY - mousePositionRef.current.y) > 10;
		setHasMouseMoved(moved);
	};

	const handleMouseUp = (event) => {
		setTimeout(() => {
			setGrabbing(false);
		}, 150);

		const moved =
			Math.abs(event.clientX - mousePositionRef.current.x) > 10 ||
			Math.abs(event.clientY - mousePositionRef.current.y) > 10;
		setHasMouseMoved(moved);

		document.getElementById("container").style.cursor = "grab";

		document
			.getElementById("container")
			.removeEventListener("mousemove", handleMouseMove);
	};

	useEffect(() => {
		const container = document.getElementById("container");

		if (container) {
			container.addEventListener("mousedown", handleMouseDown);
			container.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			if (container) {
				container.removeEventListener("mousedown", handleMouseDown);
				container.removeEventListener("mouseup", handleMouseUp);
				container.removeEventListener("mousemove", handleMouseMove);
			}
		};
	}, []);

	return (
		<>
			<FloorSelector
				position={[0, 0.6, 0]}
				scale={0.5}
				floor={"Ground Floor"}
				grabbing={grabbing}
				setGrabbing={setGrabbing}
				groundFloor
				hasMouseMoved={hasMouseMoved}
			/>
			<FloorSelector
				position={[0, 2.3, 0]}
				scale={0.5}
				floor={"First Floor"}
				grabbing={grabbing}
				setGrabbing={setGrabbing}
				groundFloor
				hasMouseMoved={hasMouseMoved}
			/>
			<FloorSelector
				position={[0, 4, 0]}
				scale={0.5}
				floor={"Second Floor"}
				grabbing={grabbing}
				setGrabbing={setGrabbing}
				groundFloor
				hasMouseMoved={hasMouseMoved}
			/>
			<FloorSelector
				position={[0, 5.7, 0]}
				scale={0.5}
				floor={"Third Floor"}
				grabbing={grabbing}
				setGrabbing={setGrabbing}
				groundFloor
				hasMouseMoved={hasMouseMoved}
			/>
			<FloorSelector
				position={[0, 7.4, 0]}
				scale={0.5}
				floor={"Fourth Floor"}
				grabbing={grabbing}
				setGrabbing={setGrabbing}
				groundFloor
				hasMouseMoved={hasMouseMoved}
			/>
		</>
	);
}

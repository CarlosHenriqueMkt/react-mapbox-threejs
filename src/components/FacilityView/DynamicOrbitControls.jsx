import { OrbitControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { floorState } from "../../store/floorState";
import { useEffect, useRef } from "react";

export default function DynamicOrbitControls() {
	const { selectedFloor, selectedFloorPosition } = useSnapshot(floorState);
	const orbitControlsRef = useRef();

	useEffect(() => {
		if (selectedFloor) {
			orbitControlsRef.current.target.set(...selectedFloorPosition);
		} else {
			orbitControlsRef.current.target.set(0, 5, 0);
		}
		orbitControlsRef.current.update();
	}, [selectedFloor]);

	return (
		<OrbitControls
			enablePan={false}
			target={[0, 5, 0]}
			dampingFactor={0.15}
			autoRotateSpeed={0.4}
			zoomSpeed={0.4}
			maxDistance={35}
			minDistance={18}
			ref={orbitControlsRef}
			maxPolarAngle={Math.PI / 2}
		/>
	);
}

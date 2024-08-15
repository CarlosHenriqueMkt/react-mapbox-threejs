import React, { useEffect, useCallback, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { floorState } from "../../../store/floorState";
import * as THREE from "three";

export default function FloorSelector(props) {
	const { grabbing, floor, hasMouseMoved } = props;
	const { nodes } = useGLTF("/models/floor-selector.glb");

	const floorDetails = document.querySelector(".tool-tip");

	const ref = useRef();
	const [hovered, hover] = useState(false);

	useEffect(() => {
		if (hovered && !grabbing) {
			floorDetails.classList.add("visible");
			floorState.hoveredFloor = floor;
			document.getElementById("container").style.cursor = "pointer";
		} else {
			floorDetails.classList.remove("visible");
			document.getElementById("container").style.cursor = "grab";
		}
	}, [hovered, grabbing]);

	const handlePointerUp = () => {
		if (!hasMouseMoved) {
			floorState.selectedFloor = floor;
			floorState.selectedFloorPosition = props.position;
			document.getElementById("container").style.cursor = "grab";
		}
	};

	return (
		<group {...props} dispose={null}>
			<mesh
				ref={ref}
				visible={hovered && !grabbing}
				onPointerUp={(event) => (
					event.stopPropagation(),
					setTimeout(() => {
						handlePointerUp();
					}, 160)
				)}
				onPointerEnter={(event) => (
					event.stopPropagation(),
					setTimeout(() => {
						hover(true);
					}, 1)
				)}
				onPointerOut={(event) => (
					event.stopPropagation(), hover(false)
				)}
				geometry={nodes.floorSelector.geometry}
				position={[-0.232, 1.8, -1.432]}
			>
				<meshStandardMaterial
					side={THREE.FrontSide}
					color={"black"}
					transparent={true}
					opacity={hovered && !grabbing ? 0.9 : 0}
				/>
			</mesh>
		</group>
	);
}

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { FrontSide, MeshBasicMaterial, NormalBlending } from "three";
import { useMemo } from "react";

export default function GroundAreas(props) {
	const { nodes, materials } = useGLTF("/models/ground_areas.glb");
	const meshesRef = useRef([]);

	useEffect(() => {
		meshesRef.current.forEach((mesh) => {
			if (mesh) mesh.visible = props.visibleAreas.includes(mesh.name);
		});
	}, []);

	const material = useMemo(
		() => new MeshBasicMaterial({ color: "#8a2b46" }),
		[]
	);

	return (
		<group {...props} dispose={null}>
			{Object.keys(nodes).map((key, index) => (
				<mesh
					key={key}
					ref={(el) => (meshesRef.current[index] = el)}
					name={key}
					geometry={nodes[key].geometry}
					material={material}
					position={nodes[key].position}
					rotation={nodes[key].rotation}
				/>
			))}
		</group>
	);
}

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshBasicMaterial } from "three";
import { useMemo } from "react";

export default function GroundAreas({ onMeshClick, visibleAreas, ...props }) {
	const { nodes } = useGLTF("/models/ground_areas.glb");
	const meshesRef = useRef([]);

	useEffect(() => {
		meshesRef.current.forEach((mesh) => {
			if (mesh) mesh.visible = visibleAreas.includes(mesh.name);
		});
	}, [visibleAreas]);

	const materialRed = useMemo(
		() => new MeshBasicMaterial({ color: "#8a2b46" }), // Vermelho
		[]
	);

	const handleMeshClick = (mesh) => {
		// Verifica se o mesh está na lista de visibleAreas antes de ativar o Drawer
		if (visibleAreas.includes(mesh.name)) {
			onMeshClick({ name: mesh.name });
		}
	};

	return (
		<group {...props} dispose={null}>
			{Object.keys(nodes).map((key, index) => (
				<mesh
					key={key}
					ref={(el) => (meshesRef.current[index] = el)}
					name={key}
					geometry={nodes[key].geometry}
					material={materialRed} // Define o material vermelho
					position={nodes[key].position}
					rotation={nodes[key].rotation}
					onClick={(event) => handleMeshClick(event.object)} // Passa o mesh clicado para a função
				/>
			))}
		</group>
	);
}

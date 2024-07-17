import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Renderer({ setOpenDrawerId, children }) {
	return (
		<Canvas>
			<OrbitControls enableZoom={false} />
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			{children}
		</Canvas>
	);
}

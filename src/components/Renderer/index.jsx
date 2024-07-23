import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box } from "@mui/material";

export default function Renderer({ setOpenDrawerId, children }) {
	return (
		<Box
			sx={{
				width: "100vw",
				height: "100vh",
			}}
		>
			<Canvas
				camera={{
					position: [0, 5, 5],
					fov: 30,
					near: 1,
					far: 1000,
				}}
			>
				<OrbitControls enableZoom={false} />
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				{children}
			</Canvas>
		</Box>
	);
}

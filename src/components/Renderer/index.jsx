import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { Perf } from "r3f-perf";
import { useSnapshot } from "valtio";
import { floorState } from "../../store/floorState.js";
import { AgXToneMapping } from "three";
import { Box } from "@mui/material";

export default function Renderer({ children, props }) {
	const { qualitySettings } = useSnapshot(floorState);

	function getDpr() {
		switch (qualitySettings) {
			case "performance":
				return 0.5;
			case "balanced":
				return 1;
			case "maximum":
				return 1.5;
			default:
				return 1;
		}
	}
	return (
		<Box
			id="container"
			sx={{
				width: "100vw",
				height: "100vh",
			}}
		>
			<Canvas
				gl={{
					powerPreference: "high-performance",
					alpha: false,
					antialias: qualitySettings === "performance" ? false : true,
					stencil: false,
					toneMapping: AgXToneMapping,
					toneMappingExposure: 1,
				}}
				className="main-canvas"
				shadows={qualitySettings === "performance" ? false : true}
				dpr={getDpr()}
				camera={{
					fov: 55,
					near: 0.1,
					far: 1000,
					position: [18, 8, 35],
				}}
				performance={{ min: 0.5 }}
			>
				<Suspense>{children}</Suspense>
				{/* <Perf position="top-left" /> */}
			</Canvas>
		</Box>
	);
}

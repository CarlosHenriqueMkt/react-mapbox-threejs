import { Circle, Environment, useTexture } from "@react-three/drei";
import { floorState } from "../../store/floorState";
import { useSnapshot } from "valtio";

export default function EnvironmentAndLights() {
	const { renderMode } = useSnapshot(floorState);
	const floorTexture = useTexture("/ground_texture.png");
	return (
		<>
			<color attach="background" args={["#222"]} />
			{/* <fog attach='fog' color='#222' near={23} far={50} /> */}
			<ambientLight intensity={1.5} color={"purple"} />
			<directionalLight
				castShadow
				position={[20, 25, 15]}
				intensity={5}
				color={"#ffffff"}
				shadow-mapSize={512}
				shadow-bias={-0.001}
				shadow-normalBias={0.1}
				shadow-camera-near={0}
				shadow-camera-far={60}
				shadow-camera-left={-20}
				shadow-camera-right={20}
				shadow-camera-top={20}
				shadow-camera-bottom={-20}
			/>
			<Environment
				background={renderMode === "realistic" ? true : false}
				files={"/industrial.jpg"}
				environmentIntensity={0.8}
				backgroundIntensity={0.6}
			/>

			<Circle
				rotation={[-Math.PI / 2, 0, 0]}
				args={[100, 64]}
				position={[0, -0.1, 0]}
				receiveShadow
				renderOrder={-1}
			>
				<meshPhysicalMaterial
					color={renderMode === "realistic" ? "#54636e" : "#000000"}
					alphaMap={floorTexture}
					roughness={1}
					metalness={0.8}
					transparent
					envMapIntensity={0}
				/>
			</Circle>
		</>
	);
}

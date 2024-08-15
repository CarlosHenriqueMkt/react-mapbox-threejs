import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Floor3(props) {
	const { nodes, materials } = useGLTF("/models/floor3_o2.glb");
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallARSEIN_-_018026"].geometry}
				material={materials["Fundermax 0798 Tambora"]}
				position={[-22.886, 6.7, 6.224]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.IfcBuildingElementProxySisekäsipuu003.geometry}
				material={materials["Glass - Satin"]}
				position={[1.573, 12.283, -10.406]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallARSEIN_-_018045"].geometry}
				material={materials["Fundermax 0386 Blues"]}
				position={[30.744, 6.7, 8.841]}
				rotation={[0, 1.57, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.IfcWallStandardCaseAR035.geometry}
				material={materials["Kipsplaat - veekindel"]}
				position={[-11.53, 10.05, -4.9]}
				rotation={[0, 1.57, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARVS-02018"].geometry}
				material={materials["Raudbetoon - Konstruktsioon"]}
				position={[-31.232, 10.05, -1.16]}
			/>
			<group position={[-28.432, 10.05, -0.558]} rotation={[0, -1.57, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187231177"].geometry}
					material={materials["Paint - Anthracite"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187231177_1"].geometry}
					material={materials["Membraan - vihmakindel katus"]}
				/>
			</group>
			<group position={[-26.028, 10.55, -9.387]} rotation={[0, -1.57, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187233524"].geometry}
					material={materials["Metall - Tsink"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187233524_1"].geometry}
					material={materials["Paint - Glossy White"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187233524_2"].geometry}
					material={materials["Paint - Roheline"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187233524_3"].geometry}
					material={materials["Klaas - Kirgas (Fast)"]}
				/>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARSS-03049"].geometry}
				material={materials.KERGPLOKK}
				position={[-21.83, 10.05, -4.355]}
				rotation={[0, 1.57, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcStairFlightARSS_-_035003"].geometry}
				material={materials.Betoon}
				position={[3.371, 10.05, -7.042]}
				rotation={[-Math.PI, 0, -Math.PI]}
			/>
		</group>
	);
}

useGLTF.preload("/models/floor3_o2.glb");

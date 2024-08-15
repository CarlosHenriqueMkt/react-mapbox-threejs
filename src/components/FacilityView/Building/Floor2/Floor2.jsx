import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Floor2(props) {
	const { nodes, materials } = useGLTF("/models/floor2_o2.glb");
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallARSEIN_-_018014"].geometry}
				material={materials["Fundermax 0798 Tambora"]}
				position={[-22.886, 3.35, 6.224]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.IfcBuildingElementProxySisekäsipuu002.geometry}
				material={materials["Glass - Satin"]}
				position={[1.573, 8.933, -10.406]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallARSEIN_-_018044"].geometry}
				material={materials["Fundermax 0386 Blues"]}
				position={[30.744, 3.35, 8.841]}
				rotation={[0, 1.57, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARVS-02011"].geometry}
				material={materials["Raudbetoon - Konstruktsioon"]}
				position={[27.97, 6.7, -4.13]}
				rotation={[-Math.PI, 0, -Math.PI]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARSS-03035"].geometry}
				material={materials.KERGPLOKK}
				position={[-20.03, 6.7, -4.354]}
				rotation={[0, 1.57, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.IfcWallStandardCaseAR021.geometry}
				material={materials["Kipsplaat - veekindel"]}
				position={[-11.53, 6.7, -4.9]}
				rotation={[0, 1.57, 0]}
			/>
			<group position={[23.568, 6.7, -0.533]} rotation={[0, -1.57, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187175157"].geometry}
					material={materials["Paint - Anthracite"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187175157_1"].geometry}
					material={materials["Membraan - vihmakindel katus"]}
				/>
			</group>
			<group position={[-26.028, 7.2, -9.387]} rotation={[0, -1.57, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187178099"].geometry}
					material={materials["Metall - Tsink"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187178099_1"].geometry}
					material={materials["Paint - Glossy White"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187178099_2"].geometry}
					material={materials["Paint - Roheline"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187178099_3"].geometry}
					material={materials["Klaas - Kirgas (Fast)"]}
				/>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcStairFlightARSS_-_035002"].geometry}
				material={materials.Betoon}
				position={[3.371, 6.7, -7.042]}
				rotation={[-Math.PI, 0, -Math.PI]}
			/>
		</group>
	);
}

useGLTF.preload("/models/floor2_o2.glb");

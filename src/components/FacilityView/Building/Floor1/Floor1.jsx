import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Floor1(props) {
	const { nodes, materials } = useGLTF("/models/floor1_o2.glb");
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallARSEIN_-_018010"].geometry}
				material={materials["Fundermax 0798 Tambora"]}
				position={[-33.286, 0, 6.219]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.IfcBuildingElementProxySisekäsipuu001.geometry}
				material={materials["Glass - Satin"]}
				position={[1.573, 5.583, -10.406]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallARSEIN_-_018043"].geometry}
				material={materials["Fundermax 0386 Blues"]}
				position={[30.744, 0, 8.841]}
				rotation={[0, 1.57, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARSS-04024"].geometry}
				material={materials["Kipsplaat - veekindel"]}
				position={[-31.233, 3.35, 1.17]}
			/>
			<group position={[-7.136, 3.85, 6.352]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187110146"].geometry}
					material={materials["Metall - Tsink"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187110146_1"].geometry}
					material={materials["Paint - Glossy White"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187110146_2"].geometry}
					material={materials["Paint - Roheline"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187110146_3"].geometry}
					material={materials["Klaas - Kirgas (Fast)"]}
				/>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARVS-01012"].geometry}
				material={materials["Raudbetoon - Konstruktsioon"]}
				position={[-10.536, 3.35, 6.351]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARSS-03021"].geometry}
				material={materials.KERGPLOKK}
				position={[-20.03, 3.35, -4.354]}
				rotation={[0, 1.57, 0]}
			/>
			<group position={[-7.309, 3.35, -6.298]} rotation={[0, -1.57, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187116196"].geometry}
					material={materials["Paint - Anthracite"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187116196_1"].geometry}
					material={materials["Membraan - vihmakindel katus"]}
				/>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcStairFlightARSS_-_035001"].geometry}
				material={materials.Betoon}
				position={[3.371, 3.35, -7.042]}
				rotation={[-Math.PI, 0, -Math.PI]}
			/>
		</group>
	);
}

useGLTF.preload("/models/floor1_o2.glb");

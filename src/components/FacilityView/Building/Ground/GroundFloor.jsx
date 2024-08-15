import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import GroundAreas from "./GroundAreas";

export default function Ground(props) {
	const { nodes, materials } = useGLTF("/models/ground_o2.glb");

	materials["Klaas - Kirgas (Fast)"].transparent = false;
	materials["Klaas - Kirgas (Fast)"].roughness = 0;
	return (
		<group {...props} dispose={null}>
			<GroundAreas visibleAreas={["IfcSpace101", "IfcSpace2-1"]} />

			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcRampARKATUS_-_001"].geometry}
				material={materials.Betoon}
				position={[10.773, -0.728, -10.899]}
				rotation={[0, 1.57, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcSlabARPP-01"].geometry}
				material={materials["Raudbetoon - Konstruktsioon"]}
				position={[-3.045, -1.25, -4.346]}
				rotation={[0, 0.509, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARSS-02"].geometry}
				material={materials.KERGPLOKK}
				position={[-29.682, 0, -0.709]}
				rotation={[-Math.PI, 0, -Math.PI]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcDoorARUKS_-_012"].geometry}
				material={materials["Membraan - vihmakindel katus"]}
				position={[-0.13, 0, -5.009]}
				rotation={[0, 1.57, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcSlabARPÕRAND_-_001"].geometry}
				material={materials["Pavement - Concrete 03 22"]}
				position={[-0.086, -0.02, 6.816]}
				rotation={[0, 0.509, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcBeamARTALA_-_001"].geometry}
				material={materials["Paint - Roheline"]}
				position={[4.764, 3.15, 7.905]}
				rotation={[0, 1.57, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARSS-04"].geometry}
				material={materials["Kipsplaat - veekindel"]}
				position={[-20.929, 0, -5.955]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.IfcRailingVäliskäsipuu.geometry}
				material={materials["Paint - Anthracite 21"]}
				position={[31.43, -1.203, -4.091]}
				rotation={[-Math.PI, 0, -Math.PI]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcSlabARPÕRAND_-_013"].geometry}
				material={materials["Fundermax 0386 Blues"]}
				position={[5.073, 3.35, -10.901]}
				rotation={[0, 0.509, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcRoofARKATUS_-_002001"].geometry}
				material={materials["Fundermax 0798 Tambora"]}
				position={[23.631, 2.5, -6.302]}
				rotation={[0, 1.57, 0]}
			/>
			<group position={[-25.036, 0.5, 6.343]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["18717542"].geometry}
					material={materials["Metall - Tsink"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["18717542_1"].geometry}
					material={materials["Paint - Glossy White"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["18717542_2"].geometry}
					material={materials["Klaas - Kirgas (Fast)"]}
				/>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.IfcBuildingElementProxySisekäsipuu.geometry}
				material={materials["Glass - Satin"]}
				position={[1.573, 2.233, -10.406]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARVS-01011"].geometry}
				material={materials["Brick - White Natural"]}
				position={[-5.327, 0, -10.447]}
				rotation={[-Math.PI, 0, -Math.PI]}
			/>
		</group>
	);
}

useGLTF.preload("/models/ground_o2.glb");

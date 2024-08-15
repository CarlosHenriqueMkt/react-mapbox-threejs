import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Facade(props) {
	const { nodes, materials } = useGLTF("/models/facade_o2.glb");
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcRampARKATUS_-_001004"].geometry}
				material={materials.Betoon}
				position={[10.773, -0.728, -10.899]}
				rotation={[0, 1.57, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcSlabARPÕRAND_-_001005"].geometry}
				material={materials["Pavement - Concrete 03 22"]}
				position={[-0.086, -0.02, 6.816]}
				rotation={[0, 0.509, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcBeamARTALA_-_001002"].geometry}
				material={materials["Paint - Roheline"]}
				position={[4.764, 3.15, 7.905]}
				rotation={[0, 1.57, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.IfcRailingVäliskäsipuu014.geometry}
				material={materials["Paint - Anthracite 21"]}
				position={[31.43, -1.203, -4.091]}
				rotation={[-Math.PI, 0, -Math.PI]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcSlabARPÕRAND_-_013004"].geometry}
				material={materials["Fundermax 0386 Blues"]}
				position={[5.073, 3.35, -10.901]}
				rotation={[0, 0.509, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcRoofARKATUS_-_002078"].geometry}
				material={materials["Fundermax 0798 Tambora"]}
				position={[23.631, 2.5, -6.302]}
				rotation={[0, 1.57, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARVS-02024"].geometry}
				material={materials["Raudbetoon - Konstruktsioon"]}
				position={[-28.231, 0, -4.158]}
			/>
			<group position={[-25.036, 0.5, 6.343]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["18717542001"].geometry}
					material={materials["Metall - Tsink"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["18717542001_1"].geometry}
					material={materials["Paint - Glossy White"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["18717542001_2"].geometry}
					material={materials["Klaas - Kirgas (Fast)"]}
				/>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.IfcBuildingElementProxySisekäsipuu024.geometry}
				material={materials["Glass - Satin"]}
				position={[1.573, 2.233, -10.406]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARVS-01067"].geometry}
				material={materials["Brick - White Natural"]}
				position={[-5.327, 0, -10.447]}
				rotation={[-Math.PI, 0, -Math.PI]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcRailingARPiire_-_001174"].geometry}
				material={materials["Glass - Blue"]}
				position={[-26.508, 6.7, -4.157]}
				rotation={[0, 1.018, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.IfcBuildingElementPartComponent_5002.geometry}
				material={materials["Waterproofing - Bituminous Felt 21"]}
				position={[-3.244, 17.3, -6.931]}
			/>
		</group>
	);
}

useGLTF.preload("/models/facade_o2.glb");

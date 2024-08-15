import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Floor4(props) {
	const { nodes, materials } = useGLTF("/models/floor4_o2.glb");
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallARSEIN_-_018031"].geometry}
				material={materials["Fundermax 0798 Tambora"]}
				position={[13.514, 10.05, 6.242]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallARSEIN_-_018046"].geometry}
				material={materials["Fundermax 0386 Blues"]}
				position={[30.744, 10.05, 8.841]}
				rotation={[0, 1.57, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARSS-01103"].geometry}
				material={materials["Raudbetoon - Konstruktsioon"]}
				position={[-3.045, 13.4, -4.346]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARSS-01105"].geometry}
				material={materials["Soojustus - vill kõva"]}
				position={[-0.23, 16.999, -4.344]}
				rotation={[-Math.PI, 0, -Math.PI]}
			/>
			<group position={[27.969, 13.4, -2.26]} rotation={[0, 1.57, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187281202"].geometry}
					material={materials["Metall - Tsink"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187281202_1"].geometry}
					material={materials["Paint - Roheline"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187281202_2"].geometry}
					material={materials["Klaas - Kirgas (Fast)"]}
				/>
			</group>
			<group position={[7.367, 13.4, 0.459]} rotation={[0, 1.57, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187281723"].geometry}
					material={materials["Paint - Anthracite"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["187281723_1"].geometry}
					material={materials["Membraan - vihmakindel katus"]}
				/>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARSS-03063"].geometry}
				material={materials.KERGPLOKK}
				position={[-20.03, 13.4, -4.754]}
				rotation={[-Math.PI, 0, -Math.PI]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes["IfcWallStandardCaseARSS-04132"].geometry}
				material={materials["Kipsplaat - veekindel"]}
				position={[-20.929, 13.4, -5.955]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.IfcWindowARA238.geometry}
				material={materials["Paint - Glossy White"]}
				position={[-26.029, 13.9, -6.787]}
				rotation={[0, -1.57, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.IfcRailingSisekäsipuu030.geometry}
				material={materials["Glass - Satin"]}
				position={[1.571, 13.4, -7.043]}
				rotation={[-Math.PI, 0, -Math.PI]}
			/>
		</group>
	);
}

useGLTF.preload("/models/floor4_o2.glb");

import React from "react";
import { useSnapshot } from "valtio";
import FloorSelector from "../FloorSelector/FloorSelector";
import Floor1 from "./Floor1/Floor1";
import Floor2 from "./Floor2/Floor2";
import Floor3 from "./Floor3/Floor3";
import Floor4 from "./Floor4/Floor4";
import Ground from "./Ground/GroundFloor";
import Facade from "./Facade/Facade";
import { floorState } from "../../../store/floorState";
import FloorSelectorObjects from "../FloorSelector/FloorSelectorGroup";

export default function Building({ onMeshClick, ...props }) {
	const { selectedFloor } = useSnapshot(floorState);

	const floorComponents = {
		"Ground Floor": <Ground onMeshClick={onMeshClick} />,
		"First Floor": <Floor1 />,
		"Second Floor": <Floor2 />,
		"Third Floor": <Floor3 />,
		"Fourth Floor": <Floor4 />,
	};

	return (
		<>
			<group {...props}>
				{selectedFloor ? floorComponents[selectedFloor] : <Facade />}
			</group>
			{!selectedFloor && (
				<group>
					<FloorSelectorObjects />
				</group>
			)}
		</>
	);
}

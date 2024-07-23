import React from "react";
import GroundFloor from "../../components/models/GroundFloor";
import Renderer from "../../components/Renderer";

export default function Scene1(
	{
		/* setOpenDrawerId */
	}
) {
	return (
		<>
			<Renderer>
				<GroundFloor /* setOpenDrawerId={setOpenDrawerId} */ />
			</Renderer>
		</>
	);
}

import React from "react";

export default function Scene2Overlay() {
	return (
		<div className="overlay">
			<label htmlFor="material-select">
				Choose a material for Scene 2:
			</label>
			<select id="material-select">
				<option value="materialA">Material A</option>
				<option value="materialB">Material B</option>
				<option value="materialC">Material C</option>
			</select>
		</div>
	);
}

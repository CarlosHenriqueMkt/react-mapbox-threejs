import React from "react";

export default function Scene1Overlay() {
	return (
		<div className="overlay">
			<label htmlFor="material-select">
				Choose a material for Scene 1:
			</label>
			<select id="material-select">
				<option value="material1">Material 1</option>
				<option value="material2">Material 2</option>
				<option value="material3">Material 3</option>
			</select>
		</div>
	);
}

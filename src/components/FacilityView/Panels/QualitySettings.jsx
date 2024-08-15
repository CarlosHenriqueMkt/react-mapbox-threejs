import { useSnapshot } from "valtio";
import "./styles.css";
import { floorState } from "../../../store/floorState.js";
import { useEffect } from "react";

export default function QualitySettings() {
	const panelName = "quality";
	const snap = useSnapshot(floorState);

	function onClose() {
		floorState.panel = null;
	}

	function handleChange(value) {
		// Limpar as configurações salvas no localStorage
		localStorage.removeItem("qualitySettings");
		localStorage.removeItem("renderMode");

		// Atualizar o estado e salvar a nova configuração
		floorState.qualitySettings = value;
		localStorage.setItem("qualitySettings", value);

		// Forçar o reload da página
		window.location.reload();
	}

	function handleRenderModeChange(value) {
		// Limpar as configurações salvas no localStorage
		localStorage.removeItem("qualitySettings");
		localStorage.removeItem("renderMode");

		// Atualizar o estado e salvar a nova configuração
		floorState.renderMode = value;
		localStorage.setItem("renderMode", value);

		// Forçar o reload da página
		window.location.reload();
	}

	useEffect(() => {
		if (localStorage.getItem("renderMode")) {
			floorState.renderMode = localStorage.getItem("renderMode");
		}
		if (localStorage.getItem("qualitySettings")) {
			floorState.qualitySettings =
				localStorage.getItem("qualitySettings");
		}
	}, []);

	return (
		<>
			{snap.panel === panelName && (
				<>
					<div className="panel quality">
						<button
							className="close-button-panel close-quality"
							onClick={onClose}
						>
							<img src="/close.svg" width={20} height={20} />
						</button>

						<div className="quality-options">
							<h2>Quality settings</h2>
							<div>
								<label>
									<input
										type="radio"
										name="quality"
										value="performance"
										checked={
											snap.qualitySettings ===
											"performance"
										}
										onChange={() =>
											handleChange("performance")
										}
									/>
									Performance (Requires restart)
								</label>
							</div>
							<div>
								<label>
									<input
										type="radio"
										name="quality"
										value="balanced"
										checked={
											snap.qualitySettings === "balanced"
										}
										onChange={() =>
											handleChange("balanced")
										}
									/>
									Balanced
								</label>
							</div>
							<div>
								<label>
									<input
										type="radio"
										name="quality"
										value="maximum"
										checked={
											snap.qualitySettings === "maximum"
										}
										onChange={() => handleChange("maximum")}
									/>
									Maximum - Better graphics
								</label>
							</div>
						</div>

						<div className="quality-options">
							<h2>Render Mode</h2>
							<div>
								<label>
									<input
										type="radio"
										name="rendermode"
										value="default"
										checked={snap.renderMode === "default"}
										onChange={() =>
											handleRenderModeChange("default")
										}
									/>
									Default
								</label>
							</div>
							<div>
								<label>
									<input
										type="radio"
										name="rendermode"
										value="realistic"
										checked={
											snap.renderMode === "realistic"
										}
										onChange={() =>
											handleRenderModeChange("realistic")
										}
									/>
									Realistic
								</label>
							</div>
							<div>
								<label>
									<input
										type="radio"
										name="rendermode"
										value="sketch"
										checked={snap.renderMode === "sketch"}
										onChange={() =>
											handleRenderModeChange("sketch")
										}
									/>
									Technical Sketch (only on max quality)
								</label>
							</div>
						</div>
					</div>
					<div className="background-quality"></div>
				</>
			)}
		</>
	);
}

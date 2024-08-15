import { useSnapshot } from "valtio";
import { floorState } from "../../../store/floorState";

import "./styles.css";

export default function Header() {
	const { selectedFloor } = useSnapshot(floorState);

	function getTitle(selectedFloor) {
		return selectedFloor
			? `${selectedFloor} details`
			: "Select a floor to see details";
	}

	return (
		<header>
			<p className="selected-floor-title">{getTitle(selectedFloor)}</p>
			<>
				{selectedFloor && (
					<button
						onClick={() => (floorState.selectedFloor = null)}
						className="button-close"
					>
						Back to facade
					</button>
				)}
				<button
					onClick={() => {
						floorState.panel = "quality";
					}}
					className="button-header"
				>
					<img src="/config.svg" alt="header" height={26} />
				</button>
			</>
		</header>
	);
}

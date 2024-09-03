import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import Renderer from "../../Renderer";
import Experience from "../Experience";
import Overlay from "../Overlay/Overlay";
import { Loader } from "@react-three/drei";
import { Leva } from "leva";
import FacilityAlarmDrawer from "../../FacilityAlarmDrawer";
import AlarmDrawerHandler from "../../AlarmDrawerHandler";

export default function FacilityScene() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [selectedAlarm, setSelectedAlarm] = useState(null);

	const handleMeshClick = (alarmData) => {
		const mockAlarmData = {
			status: "Active",
			name: `Alarm for ${alarmData.name}`,
			address: "15 Al Zahriya Street, Dibba Al-Hisn",
			id: `#10058`,
			createdAt: "5 April, 23:06:23",
			acknowledgeAt: "10 April, 23:06:23",
			closedAt: "20 April, 23:06:23",
			reading: "90 LPM",
			assetName: "Asset Name",
			assetType: "Asset Type",
			workOrderReference: "WO #D123",
			deviceName: "Device Name",
			deviceId: "Device ID",
			deviceType: "Device Type",
		};

		setSelectedAlarm(mockAlarmData);
		setDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	const memoizedBuildingScene = useMemo(() => {
		return (
			<Renderer>
				<Experience onMeshClick={handleMeshClick} />
			</Renderer>
		);
	}, []);

	return (
		<Box overflow="hidden">
			{memoizedBuildingScene}
			<Overlay />
			<Loader />
			<Leva hidden />
			<AlarmDrawerHandler open={drawerOpen}>
				{selectedAlarm && (
					<FacilityAlarmDrawer
						onClose={handleDrawerClose}
						alarm={selectedAlarm}
					/>
				)}
			</AlarmDrawerHandler>
		</Box>
	);
}

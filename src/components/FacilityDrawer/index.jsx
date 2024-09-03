import React from "react";
import {
	Box,
	Typography,
	useTheme,
	Link,
	CircularProgress,
} from "@mui/material";
import InfoCard from "../InfoCard";
import AirQualityIndicator from "../AirQualityIndicator";
import MaintenanceCard from "../MaintenanceCard";
import HazardDetectionCard from "../HazardDetectionCard";

export default function FacilityDrawer({ open, onClose, facilityDrawerData }) {
	const theme = useTheme();

	if (!facilityDrawerData) {
		return null;
	}

	const {
		name = "Al-Hoda Tower",
		address = "15 Al Zahriya Street, Dibba Al-Hisn",
		addressLink = "",
		subtitle = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		manuals = "",
		emergencyContacts = "",
		humidity = "40%",
		temperature = "27 °C",
		workOrdersTotal = 0,
		statusCounts = {},
		slaMet = 0,
	} = facilityDrawerData;

	return (
		<Box
			sx={{
				position: "fixed",
				top: "22%",
				right: open ? "16px" : "-600px",
				width: 600,
				height: "fit-content",
				transition: "right 0.3s ease",
				backgroundColor: "white",
				boxShadow: 3,
				p: 2,
				borderRadius: 2,
				zIndex: 999,
			}}
		>
			<Box sx={{ position: "relative", height: "100%" }}>
				<Box
					sx={{
						backgroundColor: "rgba(121, 50, 255, 0.1)",
						padding: theme.spacing(2),
						borderRadius: "8px",
						marginBottom: "16px",
					}}
				>
					<Typography
						variant="h2"
						sx={{ fontSize: "16px", fontWeight: "700", mb: 1 }}
					>
						{name}
					</Typography>
					<Link
						variant="body2"
						href={addressLink}
						sx={{ color: "rgba(121, 50, 255, 1)" }}
					>
						{address}
					</Link>
					<Typography
						variant="body2"
						sx={{ mb: 2, color: "text.secondary" }}
					>
						{subtitle}
					</Typography>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: theme.spacing(2),
							"& .divider": {
								width: "1px",
								height: "24px",
								backgroundColor: theme.palette.divider,
							},
							"& .link": {
								color: "rgba(0,0,0,1)",
								textDecoration: "none",
								fontSize: "14px",
								display: "flex",
								alignItems: "center",
								gap: 0.5,
								"&:hover": {
									color: theme.palette.primary.main,
								},
							},
						}}
					>
						<Link className="link" href={manuals}>
							Manuals
							<Box component="img" src="/icon/manuals.svg" />
						</Link>
						<Box className="divider" />
						<Link className="link" href={emergencyContacts}>
							Emergency Contacts
							<Box component="img" src="/icon/manuals.svg" />
						</Link>
					</Box>
				</Box>
				<Box
					sx={{
						backgroundColor: "rgba(121, 50, 255, 0.1)",
						padding: theme.spacing(2),
						borderRadius: "8px",
						marginBottom: "16px",
					}}
				>
					<Typography
						variant="h2"
						sx={{ fontSize: "16px", fontWeight: "700", mb: 1 }}
					>
						Readings
					</Typography>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: theme.spacing(2),
							"& .divider": {
								width: "1px",
								height: "24px",
								backgroundColor: theme.palette.divider,
							},
							"& .informations": {
								color: "rgba(78, 76, 79, 1)",
								textDecoration: "none",
								fontSize: "12px",
								display: "flex",
								alignItems: "center",
								gap: 0.5,
							},
						}}
					>
						<Link className="informations" href="">
							<Box component="img" src="/icon/humidity.svg" />
							Humidity
							<Box
								sx={{
									backgroundColor: "rgba(35, 119, 209, 0.2)",
									color: "rgba(35, 119, 209, 1)",
									padding: "4px 6px",
									borderRadius: "4px",
								}}
							>
								{humidity}
							</Box>
						</Link>
						<Box className="divider" />
						<Link className="informations" href="">
							<Box component="img" src="/icon/temperature.svg" />
							Temperature
							<Box
								sx={{
									backgroundColor: "rgba(238, 147, 0, 0.2)",
									color: "rgba(238, 147, 0, 1)",
									padding: "4px 6px",
									borderRadius: "4px",
								}}
							>
								{temperature}
							</Box>
						</Link>
					</Box>
				</Box>
				<Box
					sx={{
						mb: 2,
						maxHeight: 410,
						paddingRight: "10px",
						overflow: "auto",
						"&::-webkit-scrollbar": {
							width: "8px",
						},
						"&::-webkit-scrollbar-track": {
							backgroundColor: theme.palette.background.default,
							borderRadius: "8px",
						},
						"&::-webkit-scrollbar-thumb": {
							backgroundColor: theme.palette.primary.main,
							borderRadius: "8px",
						},
						"&::-webkit-scrollbar-thumb:hover": {
							backgroundColor: theme.palette.primary.dark,
						},
					}}
				>
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: "repeat(3, 1fr)",
							gap: 2,
							mb: 2,
						}}
					>
						<InfoCard title="Alarms" value="12" color="purple" />
						<InfoCard
							title="Work Orders"
							value={workOrdersTotal}
							color="purple"
						/>
						<InfoCard
							title="Active WOs"
							value={statusCounts["In Progress"] || 0}
							color="green"
						/>
						<InfoCard
							title="Closed WOs"
							value={statusCounts["Closed"] || 0}
							color="blue"
						/>
						<InfoCard
							title="SLA Met"
							value={slaMet}
							color="green"
						/>
						<InfoCard title="People" value="20" color="purple" />
						<InfoCard
							title="Space Repeated Calls"
							value="75"
							color="purple"
						/>
						<InfoCard
							title="Equipament Repeated Calls"
							value="10"
							color="blue"
						/>
						<InfoCard title="Devices" value="102" color="purple" />
						<InfoCard
							title="Online Devices"
							value="210"
							color="green"
						/>
						<InfoCard
							title="Offline Devices"
							value="1000"
							color="red"
						/>
					</Box>
					<Box marginBlock={2}>
						<AirQualityIndicator value={50} />
					</Box>
					<Box marginBlock={2}>
						<MaintenanceCard />
					</Box>
					<Box marginBlock={2}>
						<HazardDetectionCard />
					</Box>
					<Box
						component="img"
						src="/energy_consumption.svg"
						sx={{
							width: "100%",
						}}
					/>
					<Box
						component="img"
						src="/water_consumption.svg"
						sx={{
							width: "100%",
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
}

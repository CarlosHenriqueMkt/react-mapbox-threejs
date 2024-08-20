import React from "react";
import { Box, Typography, useTheme, Link } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

export default function FacilityDrawer({ open, facilityDrawerData }) {
	const theme = useTheme();
	const {
		id,
		name,
		address,
		addressLink,
		subtitle,
		manuals,
		emergencyContacts,
		humidity,
		temperature,
		airQuality,
		costOfMaintenance,
		costOfMaterial,
		costOfLabor,
		hazardDetection,
		energyConsumption,
		waterConsumption,
		route,
		alerts,
		orders,
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
			{facilityDrawerData && (
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
								},
							}}
						>
							<Link className="link" href="">
								Manuals
								<Box component="img" src="/icon/manuals.svg" />
							</Link>
							<Box className="divider" />
							<Link className="link" href="">
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
										backgroundColor:
											"rgba(35, 119, 209, 0.2)",
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
								<Box
									component="img"
									src="/icon/temperature.svg"
								/>
								Temperature
								<Box
									sx={{
										backgroundColor:
											"rgba(238, 147, 0, 0.2)",
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
								backgroundColor:
									theme.palette.background.default,
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
							{orders.map((item, index) => (
								<InfoCard
									key={index}
									title={item.title}
									value={item.value}
									color={item.color}
								/>
							))}
						</Box>
						<Box
							component="img"
							src="/chart.png"
							sx={{
								width: "100%",
								height: "425px",
							}}
						/>
						<Box
							component="img"
							src="/chart.png"
							sx={{
								width: "100%",
								height: "425px",
							}}
						/>
					</Box>
				</Box>
			)}
		</Box>
	);
}

const InfoCard = ({ title, value, color }) => {
	const getBackgroundColor = (color) => {
		switch (color) {
			case "blue":
				return "rgba(0, 0, 255, 0.1)";
			case "purple":
				return "rgba(128, 0, 128, 0.1)";
			case "green":
				return "rgba(0, 128, 0, 0.1)";
			default:
				return "rgba(0, 0, 0, 0.1)";
		}
	};

	return (
		<Box
			sx={{
				p: 2,
				backgroundColor: getBackgroundColor(color),
				borderRadius: 2,
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<Typography
				variant="body1"
				sx={{ fontSize: "9px", color: "#969696" }}
			>
				{title}
			</Typography>
			<Typography
				variant="body1"
				sx={{ fontSize: "18px", fontWeight: "700", color }}
			>
				{value}
			</Typography>
			<CircleIcon sx={{ color: color, fontSize: "8px" }} />
		</Box>
	);
};

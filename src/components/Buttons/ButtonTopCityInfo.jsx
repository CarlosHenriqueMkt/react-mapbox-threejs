import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	useTheme,
	styled,
	Button,
	CircularProgress,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

// Mock data para substituir a resposta das APIs
const mockCityStatus = {
	total: 100,
	data: {
		"In Progress": 45,
		Closed: 55,
		Alarms: 2,
	},
};

const mockSlaBreach = {
	slaBreach: {
		total: 5,
	},
};

const DropdownBox = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: "8px",
	backgroundColor: "transparent",
	overflow: "hidden",
	transition: "all 0.5s ease-in-out",
	height: 600,
	"&.closed": {
		height: 0,
	},
}));

export default function ButtonTopCityInfo() {
	const theme = useTheme();
	const [open, setOpen] = useState(true); // Dropdown starts open by default
	const [menuItems, setMenuItems] = useState([
		{ text: "Alarms", value: null, color: "#2377D1" },
		{ text: "Work Orders", value: null, color: "#7932FF" },
		{ text: "Active WOs", value: null, color: "#79B473" },
		{ text: "Closed WOs", value: null, color: "#969696" },
		{ text: "SLA Breach", value: null, color: "#2377D1" },
	]);

	useEffect(() => {
		// Substituindo chamadas de API por dados mockados
		const cityStatus = mockCityStatus;
		const slaBreach = mockSlaBreach;

		if (cityStatus && slaBreach) {
			setMenuItems((prevItems) => [
				{ ...prevItems[0], value: cityStatus.data["Alarms"] }, // Alarms (mantém valor nulo)
				{ ...prevItems[1], value: cityStatus.total }, // Work Orders
				{
					...prevItems[2],
					value: cityStatus.data["In Progress"],
				}, // Active WOs
				{ ...prevItems[3], value: cityStatus.data["Closed"] }, // Closed WOs
				{ ...prevItems[4], value: slaBreach.slaBreach.total }, // SLA Breach
			]);
		}
	}, []);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-end",
				gap: 2,
				position: "absolute",
				top: 120,
				right: 20,
				backgroundColor: "transparent",
				overflow: "hidden",
			}}
		>
			<Button
				onClick={handleClick}
				sx={{
					width: "66px",
					height: "66px",
					borderRadius: "18px",
					border: open
						? `1px solid ${theme.palette.primary.main}`
						: "none",
					backgroundColor: open
						? theme.palette.primary.light
						: theme.palette.background.main,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					"&:hover": {
						backgroundColor: theme.palette.primary.light,
					},
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: theme.palette.primary.light,
						borderRadius: "6px",
						width: "52px",
						height: "52px",
					}}
				>
					<Box
						component="img"
						src="/icon/chart.svg"
						alt="map icon"
						style={{ width: "24px", height: "24px" }}
					/>
				</Box>
			</Button>
			<DropdownBox className={!open ? "closed" : ""}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: theme.spacing(2),
						padding: theme.spacing(1),
						borderRadius: "8px",
						boxShadow: 3,
						backgroundColor: theme.palette.background.main,
					}}
				>
					{menuItems.map((item, index) => (
						<Box
							key={index}
							sx={{
								backgroundColor: theme.palette.primary.light,
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								justifyContent: "space-between",
								borderRadius: "8px",
								padding: theme.spacing(1),
							}}
						>
							<Typography
								variant="h2"
								sx={{
									color: theme.palette.text.medium,
									fontSize: "12px",
									fontWeight: 700,
								}}
							>
								{item.text}
							</Typography>
							<Box
								sx={{
									color: theme.palette.text.black,
									borderRadius: "8px",
								}}
							>
								<Typography
									variant="body1"
									sx={{ fontWeight: 700 }}
								>
									{item.value !== null ? (
										item.value
									) : (
										<CircularProgress
											size={20}
											sx={{ color: item.color }}
										/>
									)}
								</Typography>
							</Box>
							<CircleIcon
								sx={{
									color: item.color,
									fontSize: "8px",
								}}
							/>
						</Box>
					))}
				</Box>
			</DropdownBox>
		</Box>
	);
}

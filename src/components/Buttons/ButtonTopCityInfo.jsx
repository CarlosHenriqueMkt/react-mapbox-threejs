import React, { useState } from "react";
import { Box, Typography, useTheme, styled, Button } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

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

const menuItems = [
	{ text: "Alarms", value: 1500, color: "#2377D1" },
	{ text: "Work Orders", value: 47, color: "#7932FF" },
	{ text: "Active WOs", value: 10, color: "#79B473" },
	{ text: "Closed WOs", value: 37, color: "#969696" },
	{ text: "SLA Met", value: "70%", color: "#2377D1" },
];

export default function ButtonTopCityInfo() {
	const theme = useTheme();
	const [open, setOpen] = useState(true); // Dropdown starts open by default

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
									{item.value}
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

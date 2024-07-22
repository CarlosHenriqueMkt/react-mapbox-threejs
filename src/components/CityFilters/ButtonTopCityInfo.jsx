import React, { useState } from "react";
import { Box, Typography, useTheme, styled, Button } from "@mui/material";

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
	{ text: "Alarms", value: 150 },
	{ text: "Work Orders", value: 47 },
	{ text: "Active WOs", value: 10 },
	{ text: "Closed WOs", value: 37 },
	{ text: "SLA Met", value: "70%" },
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
				{menuItems.map((item, index) => (
					<Box
						key={index}
						sx={{
							display: "flex",
							width: "240px",
							justifyContent: "space-between",
							alignItems: "center",
							padding: "8px 16px",
							margin: "4px 0",
							borderRadius: "8px",
							boxShadow: 3,
							backgroundColor: theme.palette.background.main,
						}}
					>
						<Typography variant="body1" sx={{ fontWeight: 700 }}>
							{item.text}
						</Typography>
						<Box
							sx={{
								color: theme.palette.primary.main,
								backgroundColor: theme.palette.primary.light,
								padding: "8px 16px",
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
					</Box>
				))}
			</DropdownBox>
		</Box>
	);
}

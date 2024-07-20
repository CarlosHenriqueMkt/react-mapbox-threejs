import React, { useState } from "react";
import {
	MenuItem,
	ListItemIcon,
	ListItemText,
	Box,
	useTheme,
	IconButton,
	Typography,
} from "@mui/material";
import {
	Menu as MenuIcon,
	Settings as SettingsIcon,
	Notifications as NotificationsIcon,
	Assignment as AssignmentIcon,
	Monitor as MonitorIcon,
	Headset as HeadsetIcon,
} from "@mui/icons-material";
import { styled } from "@mui/system";

const menuItems = [
	{ text: "3D Viewer", icon: <SettingsIcon /> },
	{ text: "Facilities", icon: <AssignmentIcon /> },
	{ text: "Alarms", icon: <NotificationsIcon /> },
	{ text: "Work Orders", icon: <AssignmentIcon /> },
	{ text: "Energy Monitoring", icon: <MonitorIcon /> },
	{ text: "Support", icon: <HeadsetIcon /> },
];

const DropdownBox = styled(Box)(({ theme, open }) => ({
	height: open ? "50vh" : "0",
	overflow: "hidden",
	transition: "height 0.5s ease",
	backgroundColor: theme.palette.background.paper,
}));

export default function Viewer() {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState({});

	const handleClick = () => {
		setOpen(!open);
	};

	const handleSelect = (index) => {
		setSelected((prevSelected) => ({
			...prevSelected,
			[index]: !prevSelected[index],
		}));
	};

	return (
		<Box
			sx={{
				position: "absolute",
				top: 120,
				left: 35,
				width: "350px",
				boxShadow: 3,
				borderRadius: "8px",
				backgroundColor: theme.palette.background.paper,
				overflow: "hidden",
			}}
		>
			<Box
				onClick={handleClick}
				sx={{
					height: "100%",
					display: "flex",
					alignItems: "center",
					padding: theme.spacing(1),
					cursor: "pointer",
					backgroundColor: "transparent",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#F4F2FF",
						width: "40px",
						height: "40px",
						borderRadius: "50%",
						border: open
							? `1px solid ${theme.palette.primary.main}`
							: "transparent",

						transition: "border .5s ease-in-out",
					}}
				>
					<MenuIcon />
				</Box>
				<Typography variant="body1" sx={{ ml: 1 }}>
					3D Viewer
				</Typography>
			</Box>
			<DropdownBox open={open}>
				{menuItems.map((item, index) => (
					<MenuItem
						key={item.text}
						onClick={() => handleSelect(index)}
						selected={selected[index]}
						style={{
							backgroundColor: selected[index]
								? theme.palette.primary.main
								: "inherit",
							color: selected[index] ? "white" : "inherit",
						}}
					>
						<ListItemIcon
							style={{
								color: selected[index] ? "white" : "inherit",
							}}
						>
							{item.icon}
						</ListItemIcon>
						<ListItemText primary={item.text} />
					</MenuItem>
				))}
			</DropdownBox>
		</Box>
	);
}

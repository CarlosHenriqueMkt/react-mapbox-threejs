import React, { useEffect, useState } from "react";
import {
	MenuItem,
	ListItemIcon,
	ListItemText,
	Box,
	useTheme,
	IconButton,
	Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import DropdownBox from "../../styledComponents/Dropdown";
import DropdownBoxContainer from "../../styledComponents/Dropdown";
import { useLocation } from "react-router-dom";

const menuItems = [
	{
		text: "3D Viewer",
		icon: "/icon/view.svg",
		iconSelected: "/icon/view-white.svg",
		onClick: () => console.log("3D Viewer clicked"), //cb function of the item
	},
	{
		text: "Facilities",
		icon: "/icon/building.svg",
		iconSelected: "/icon/building-white.svg",
		onClick: () => console.log("Facilities clicked"),
	},
	{
		text: "Alarms",
		icon: "/icon/alarm.svg",
		iconSelected: "/icon/alarm-white.svg",
		onClick: () => console.log("Alarms clicked"),
	},
	{
		text: "Work Orders",
		icon: "/icon/clipboard-text.svg",
		iconSelected: "/icon/clipboard-text-white.svg",
		onClick: () => console.log("Work Orders clicked"),
	},
	{
		text: "Energy Monitoring",
		icon: "/icon/energy.svg",
		iconSelected: "/icon/energy-white.svg",
		onClick: () => console.log("Energy Monitoring clicked"),
	},
	{
		text: "Support",
		icon: "/icon/support.svg",
		iconSelected: "/icon/support-white.svg",
		onClick: () => console.log("Support clicked"),
	},
];

export default function Viewer() {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState({});
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/dubai") {
			setSelected({});
			setOpen(false);
		}
	}, [location.pathname]);

	const handleClick = () => {
		setOpen(!open);
	};

	const handleSelect = (index, onClick) => {
		setSelected((prevSelected) => ({
			...prevSelected,
			[index]: !prevSelected[index],
		}));
		onClick(); // Call the specific function for each item
	};

	return (
		<Box
			sx={{
				position: "absolute",
				top: 120,
				left: 35,
				width: "274px",
				paddingInline: "16px",
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
					paddingBlock: "13px",
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
				<Typography variant="body1" sx={{ ml: 1, fontWeight: 700 }}>
					3D Viewer
				</Typography>
			</Box>
			<DropdownBoxContainer open={open}>
				{menuItems.map((item, index) => (
					<MenuItem
						key={item.text}
						onClick={() => handleSelect(index, item.onClick)}
						selected={selected[index]}
						style={{
							backgroundColor: selected[index]
								? theme.palette.primary.main
								: "inherit",
							color: selected[index] ? "white" : "inherit",
							borderRadius: "8px",
							padding: "12px",
						}}
					>
						<ListItemIcon
							style={{
								color: selected[index] ? "white" : "inherit",
							}}
						>
							<Box
								component="img"
								src={
									selected[index]
										? item.iconSelected
										: item.icon
								}
								style={{ width: 24, height: 24 }}
							/>
						</ListItemIcon>
						<ListItemText primary={item.text} />
					</MenuItem>
				))}
			</DropdownBoxContainer>
		</Box>
	);
}

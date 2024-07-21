// UseCases.js
import React, { useState, useEffect } from "react";
import {
	MenuItem,
	ListItemIcon,
	ListItemText,
	Box,
	useTheme,
	Typography,
	Collapse,
	TextField,
	InputAdornment,
	Button,
	Checkbox,
} from "@mui/material";
import {
	Search as SearchIcon,
	ArrowForwardIos as ArrowForwardIosIcon,
	ArrowDropDown as ArrowDropDownIcon,
	ArrowRight as ArrowRightIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import DropdownBoxContainer from "../../styledComponents/Dropdown";

const items = [
	{
		text: "Alarms",
		subItems: [
			{
				name: "Critical Alarms",
				action: () => console.log("Critical Alarms"),
			},
		],
	},
	{
		text: "Work Orders",
		subItems: [
			{ name: "Active WOs", action: () => console.log("Active WOs") },
			{
				name: "SLA Countdown",
				action: () => console.log("SLA Countdown"),
			},
			{ name: "SLA Breached", action: () => console.log("SLA Breached") },
		],
	},
	{
		text: "Equipment",
		subItems: [
			{
				name: "All Equipment",
				action: () => console.log("All Equipment"),
			},
			{
				name: "Warranty Expiry",
				action: () => console.log("Warranty Expiry"),
			},
			{
				name: "Equipment Life Expectancy Remaining",
				action: () =>
					console.log("Equipment Life Expectancy Remaining"),
			},
		],
	},
	{
		text: "Maintenance",
		subItems: [
			{
				name: "Space Repeated Calls",
				action: () => console.log("Space Repeated Calls"),
			},
			{
				name: "Equipment Repeated Calls",
				action: () => console.log("Equipment Repeated Calls"),
			},
		],
	},
	{
		text: "Occupancy",
		subItems: [
			{
				name: "Heat Map",
				action: () => console.log("Occupancy Heat Map"),
			},
		],
	},
	{
		text: "Hazard Heat Map",
		subItems: [
			{ name: "Water Leak", action: () => console.log("Water Leak") },
			{ name: "Fire", action: () => console.log("Fire") },
			{ name: "Smoke", action: () => console.log("Smoke") },
		],
	},
	{
		text: "Air Quality",
		subItems: [
			{
				name: "Heat Map",
				action: () => console.log("Air Quality Heat Map"),
			},
		],
	},
	{
		text: "IoT Devices",
		subItems: [
			{ name: "All", action: () => console.log("All IoT Devices") },
			{
				name: "Offline",
				action: () => console.log("Offline IoT Devices"),
			},
		],
	},
	{
		text: "Energy Consumption",
		subItems: [
			{
				name: "Heat Map",
				action: () => console.log("Energy Consumption Heat Map"),
			},
		],
	},
	{
		text: "Water Consumption",
		subItems: [
			{
				name: "Heat Map",
				action: () => console.log("Water Consumption Heat Map"),
			},
		],
	},
];

export default function UseCases() {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [expanded, setExpanded] = useState({});
	const [search, setSearch] = useState("");
	const location = useLocation();
	const [title, setTitle] = useState("Use Cases");

	useEffect(() => {
		if (location.pathname === "/dubai") {
			setTitle("Use Cases");
			setOpen(false);
			setExpanded({});
		} else if (location.pathname.match(/\/dubai\/[^/]+$/)) {
			setTitle("Solutions & Scenarios");
		} else {
			setTitle("Use Cases");
		}
	}, [location]);

	const handleExpand = (key) => {
		setExpanded((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const renderSubItems = (subItems, level = 2) => {
		return subItems.map((subItem, index) => (
			<Box
				key={index}
				sx={{
					display: "flex",
					alignItems: "center",
					pl: `${level * 16}px`,
				}}
			>
				<Checkbox onClick={subItem.action} />
				<Button
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
						color: theme.palette.text.secondary,
					}}
					onClick={subItem.action}
				>
					{subItem.name}
				</Button>
			</Box>
		));
	};

	const renderItems = (items) => {
		return items
			.filter((item) =>
				item.text.toLowerCase().includes(search.toLowerCase())
			)
			.map((item, index) => (
				<Box key={index} sx={{ paddingBlock: 2 }}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1,
							cursor: "pointer",
							paddingInline: 1,
							backgroundColor: "#F4F2FF",
							borderTopRightRadius: "8px",
							borderTopLeftRadius: "8px",
							borderBottomRightRadius: expanded[item.text]
								? 0
								: "8px",
							borderBottomLeftRadius: expanded[item.text]
								? 0
								: "8px",
							color: expanded[item.text]
								? theme.palette.primary.main
								: "inherit",
						}}
					>
						<Button
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 1,
								width: "100%",
								color: "inherit",
								textTransform: "none",
								"&::first-letter": {
									textTransform: "uppercase",
								},
								textAlign: "left",
							}}
							onClick={() => handleExpand(item.text)}
						>
							{expanded[item.text] ? (
								<ArrowDropDownIcon />
							) : (
								<ArrowRightIcon />
							)}
							<ListItemIcon sx={{ minWidth: "unset" }}>
								<Box
									component="img"
									src="/icon/building.svg"
									width={16}
									height={18}
								/>
							</ListItemIcon>
							<ListItemText primary={item.text} />
						</Button>
					</Box>
					<Collapse
						in={expanded[item.text]}
						sx={{
							backgroundColor: "#F4F2FF",
							borderBottomRightRadius: "8px",
							borderBottomLeftRadius: "8px",
						}}
					>
						{renderSubItems(item.subItems)}
					</Collapse>
				</Box>
			));
	};

	return (
		<Box
			sx={{
				position: "absolute",
				top: 120,
				left: 742,
				width: "350px",
				paddingInline: "16px",
				paddingBottom: open ? "16px" : 0,
				boxShadow: 3,
				borderRadius: "8px",
				backgroundColor: theme.palette.background.paper,
				overflow: "hidden",
			}}
		>
			<Box
				onClick={() => setOpen(!open)}
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
						width: "40px",
						height: "40px",
						transition: "transform 0.3s ease",
						transform: open ? "rotate(90deg)" : "rotate(0deg)",
						color: open ? theme.palette.primary.main : "inherit",
					}}
				>
					<ArrowForwardIosIcon />
				</Box>
				<Typography
					variant="body1"
					sx={{
						ml: 1,
						color: open ? theme.palette.primary.main : "inherit",
						fontWeight: 700,
					}}
				>
					{title}
				</Typography>
			</Box>
			<DropdownBoxContainer open={open}>
				<Box sx={{ padding: theme.spacing(2) }}>
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Search"
						value={search}
						onChange={handleSearchChange}
						sx={{ paddingBottom: 2 }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
					{renderItems(items)}
				</Box>
			</DropdownBoxContainer>
		</Box>
	);
}

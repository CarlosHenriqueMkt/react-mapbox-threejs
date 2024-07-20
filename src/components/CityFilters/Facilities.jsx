// Facilities.js
import React, { useState } from "react";
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
} from "@mui/material";
import {
	Search as SearchIcon,
	ArrowForwardIos as ArrowForwardIosIcon,
	ArrowDropDown as ArrowDropDownIcon,
	ArrowRight as ArrowRightIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DropdownBox from "../../styledComponents/Dropdown";
import DropdownBoxContainer from "../../styledComponents/Dropdown";

const facilities = [
	{
		text: "Facility Name 1",
		path: "/dubai/scene1",
		locations: [
			{
				text: "Locations 1",
				spaces: [
					{
						text: "Space 1",
						subSpaces: [
							{
								text: "SubSpace 1",
								items: [
									{
										name: "Swimming pool",
										action: () =>
											console.log("Swimming pool action"),
									},
									{
										name: "Tank",
										action: () =>
											console.log("Tank action"),
									},
								],
							},
							{
								text: "SubSpace 2",
								items: [
									{
										name: "Gym",
										action: () => console.log("Gym action"),
									},
									{
										name: "Sauna",
										action: () =>
											console.log("Sauna action"),
									},
								],
							},
						],
					},
				],
			},
			{ text: "Locations 2", spaces: [] },
			{ text: "Locations 3", spaces: [] },
		],
	},
	{
		text: "Facility Name 2",
		path: "/dubai/facility-name-2",
		locations: [],
	},
	{
		text: "Facility Name 3",
		path: "/dubai/facility-name-3",
		locations: [],
	},
];

const Facilities = () => {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [expanded, setExpanded] = useState({});
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const handleExpand = (key) => {
		setExpanded((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const renderSubSpaceItems = (items, level = 3) => {
		return items.map((item, index) => (
			<Box key={index} sx={{ display: "flex", flexDirection: "column" }}>
				<Button
					sx={{
						pl: `${level * 34}px`,
						width: "100%",
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "flex-start",
						color: theme.palette.text.secondary,
					}}
					onClick={item.action}
				>
					{item.name}
				</Button>
			</Box>
		));
	};

	const renderSubSpaces = (subSpaces, level = 3) => {
		return subSpaces.map((subSpace, index) => (
			<Box key={index}>
				<Box
					sx={{
						cursor: "pointer",
						pl: `${level * 24}px`,
						display: "flex",
						alignItems: "center",
						gap: 1,
						width: "100%",
						textTransform: "none",
						"&::first-letter": {
							textTransform: "uppercase",
						},
						textAlign: "left",
						color: expanded[subSpace.text]
							? theme.palette.primary.main
							: "inherit",
					}}
					onClick={() => handleExpand(subSpace.text)}
				>
					{expanded[subSpace.text] ? (
						<ArrowDropDownIcon />
					) : (
						<ArrowRightIcon />
					)}
					<ListItemIcon sx={{ minWidth: "unset" }}>
						<Box
							component="img"
							src="/icon/door.svg"
							width={16}
							height={18}
						/>
					</ListItemIcon>
					<ListItemText primary={subSpace.text} />
				</Box>
				<Collapse in={expanded[subSpace.text]}>
					{renderSubSpaceItems(subSpace.items)}
				</Collapse>
			</Box>
		));
	};

	const renderSpaces = (spaces, level = 2) => {
		return spaces.map((space, index) => (
			<Box key={index}>
				<Box
					sx={{
						cursor: "pointer",
						pl: `${level * 16}px`,
						display: "flex",
						alignItems: "center",
						gap: 1,
						width: "100%",
						textTransform: "none",
						"&::first-letter": {
							textTransform: "uppercase",
						},
						textAlign: "left",
						color: expanded[space.text]
							? theme.palette.primary.main
							: "inherit",
					}}
					onClick={() => handleExpand(space.text)}
				>
					{expanded[space.text] ? (
						<ArrowDropDownIcon />
					) : (
						<ArrowRightIcon />
					)}
					<ListItemIcon sx={{ minWidth: "unset" }}>
						<Box
							component="img"
							src="/icon/space.svg"
							width={16}
							height={18}
						/>
					</ListItemIcon>
					<ListItemText primary={space.text} />
				</Box>
				<Collapse in={expanded[space.text]}>
					{renderSubSpaces(space.subSpaces, level + 1)}
				</Collapse>
			</Box>
		));
	};

	const renderLocations = (locations, level = 1) => {
		return locations.map((location, index) => (
			<Box key={index} paddingInline={1}>
				<Box
					sx={{
						cursor: "pointer",
						pl: `${level * 8}px`,
						display: "flex",
						alignItems: "center",
						gap: 1,
						width: "100%",
						textTransform: "none",
						"&::first-letter": {
							textTransform: "uppercase",
						},
						textAlign: "left",
						color: expanded[location.text]
							? theme.palette.primary.main
							: "inherit",
					}}
					onClick={() => handleExpand(location.text)}
				>
					{expanded[location.text] ? (
						<ArrowDropDownIcon />
					) : (
						<ArrowRightIcon />
					)}
					<ListItemIcon sx={{ minWidth: "unset" }}>
						<Box
							component="img"
							src="/icon/locations.svg"
							width={16}
							height={18}
						/>
					</ListItemIcon>
					<ListItemText primary={location.text} />
				</Box>
				<Collapse in={expanded[location.text]}>
					{renderSpaces(location.spaces, level + 1)}
				</Collapse>
			</Box>
		));
	};

	const renderFacilities = (facilities) => {
		return facilities
			.filter((facility) =>
				facility.text.toLowerCase().includes(search.toLowerCase())
			)
			.map((facility, index) => (
				<Box key={index} sx={{ padding: 2 }}>
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
							borderBottomRightRadius: expanded[facility.text]
								? 0
								: "8px",
							borderBottomLeftRadius: expanded[facility.text]
								? 0
								: "8px",
							color: expanded[facility.text]
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
							onClick={() => {
								navigate(facility.path);
								handleExpand(facility.text);
							}}
						>
							{expanded[facility.text] ? (
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
							<ListItemText primary={facility.text} />
						</Button>
					</Box>
					<Collapse
						in={expanded[facility.text]}
						sx={{
							backgroundColor: "#F4F2FF",
							borderBottomRightRadius: "8px",
							borderBottomLeftRadius: "8px",
						}}
					>
						{renderLocations(facility.locations)}
					</Collapse>
				</Box>
			));
	};

	return (
		<Box
			sx={{
				position: "absolute",
				top: 120,
				left: 350,
				width: "350px",
				paddingInline: "16px",
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
					}}
				>
					Facilities
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
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				</Box>
				{renderFacilities(facilities)}
			</DropdownBoxContainer>
		</Box>
	);
};

export default Facilities;

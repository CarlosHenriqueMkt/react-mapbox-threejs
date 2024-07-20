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
} from "@mui/material";
import {
	Assignment as AssignmentIcon,
	Search as SearchIcon,
	ArrowForwardIos as ArrowForwardIosIcon,
	ArrowDropDown as ArrowDropDownIcon,
	ArrowRight as ArrowRightIcon,
} from "@mui/icons-material";
import { styled } from "@mui/system";

const facilities = [
	{
		text: "Facility Name 1",
		locations: [
			{
				text: "Locations 1",
				spaces: [
					{
						text: "Space 1",
						subSpaces: [
							{
								text: "SubSpace 1",
								items: ["Swimming pool", "Tank"],
							},
							{ text: "SubSpace 2", items: ["Gym", "Sauna"] },
						],
					},
				],
			},
			{ text: "Locations 2", spaces: [] },
			{ text: "Locations 3", spaces: [] },
		],
	},
	{ text: "Facility Name 2", locations: [] },
	{ text: "Facility Name 3", locations: [] },
];

const DropdownBox = styled(Box)(({ theme, open }) => ({
	height: open ? "50vh" : "0",
	overflow: "auto",
	transition: "height 0.5s ease",
	backgroundColor: theme.palette.background.paper,
}));

const Facilities = () => {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [expanded, setExpanded] = useState({});
	const [search, setSearch] = useState("");

	const handleExpand = (key) => {
		setExpanded((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const renderSubSpaceItems = (items) => {
		return items.map((item, index) => (
			<Typography
				key={index}
				sx={{
					pl: 4,
					color: theme.palette.text.secondary,
				}}
			>
				{item}
			</Typography>
		));
	};

	const renderSubSpaces = (subSpaces, level = 3) => {
		return subSpaces.map((subSpace, index) => (
			<Box key={index}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
						pl: `${level * 8}px`,
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
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
						pl: `${level * 8}px`,
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
			<Box key={index}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
						pl: `${level * 8}px`,
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
							backgroundColor: "purple",
							color: expanded[facility.text]
								? theme.palette.primary.main
								: "inherit",
						}}
						onClick={() => handleExpand(facility.text)}
					>
						{expanded[facility.text] ? (
							<ArrowDropDownIcon />
						) : (
							<ArrowRightIcon />
						)}
						<ListItemIcon sx={{ minWidth: "unset" }}>
							<Box component="img" src="building.svg" />
						</ListItemIcon>
						<ListItemText primary={facility.text} />
					</Box>
					<Collapse
						in={expanded[facility.text]}
						sx={{ backgroundColor: "purple" }}
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
				left: 420,
				width: "350px",
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
			<DropdownBox open={open}>
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
			</DropdownBox>
		</Box>
	);
};

export default Facilities;

import React, { useEffect, useState, useCallback } from "react";
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
import { useLocation } from "react-router-dom";
import DropdownBoxContainer from "../../styledComponents/Dropdown";
import { buildings } from "../../data/buildings"; // Usando o array buildings

export default function Facilities({ open, toggleDropdown, onBuildingSelect }) {
	const theme = useTheme();
	const [expanded, setExpanded] = useState({});
	const [search, setSearch] = useState("");
	const [currentFacility, setCurrentFacility] = useState("Facilities");
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/dubai") {
			setCurrentFacility("Facilities");
			setExpanded({}); // Reset expanded state
		}
	}, [location.pathname]);

	const handleExpand = useCallback((key) => {
		setExpanded((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	}, []);

	const handleSearchChange = useCallback((event) => {
		setSearch(event.target.value);
	}, []);

	const handleFacilityClick = (building) => {
		setCurrentFacility(building.name);

		// Primeiro, mova a câmera e depois expanda a lista
		moveCamera(building.coordinates).then(() => {
			requestAnimationFrame(() => {
				handleExpand(building.name);
			});
		});
	};

	// Função para mover a câmera que retorna uma Promise
	const moveCamera = (coordinates) => {
		return new Promise((resolve) => {
			onBuildingSelect(coordinates);
			// Use um timeout para garantir que a câmera tenha tempo de se mover antes de continuar
			setTimeout(resolve, 300); // Ajuste o tempo conforme necessário
		});
	};

	// Função para renderizar sub-itens (subspaces)
	const renderSubSpaceItems = useCallback(
		(items = ["Lorem SubItem 1", "Lorem SubItem 2"], level = 3) => {
			return items.map((item, index) => (
				<Box
					key={index}
					sx={{ display: "flex", flexDirection: "column" }}
				>
					<Button
						sx={{
							pl: `${level * 24}px`,
							width: "100%",
							display: "flex",
							alignItems: "flex-start",
							justifyContent: "flex-start",
							color: theme.palette.text.secondary,
						}}
					>
						{item}
					</Button>
				</Box>
			));
		},
		[theme.palette.text.secondary]
	);

	// Função para renderizar subespaços
	const renderSubSpaces = useCallback(
		(subSpaces = [{ text: "Lorem SubSpace", items: [] }], level = 3) => {
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
		},
		[
			expanded,
			handleExpand,
			renderSubSpaceItems,
			theme.palette.primary.main,
		]
	);

	// Função para renderizar espaços
	const renderSpaces = useCallback(
		(spaces = [{ text: "Lorem Space", subSpaces: [] }], level = 2) => {
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
						{renderSubSpaces(space.subSpaces)}
					</Collapse>
				</Box>
			));
		},
		[expanded, handleExpand, renderSubSpaces, theme.palette.primary.main]
	);

	// Função para renderizar localizações
	const renderLocations = useCallback(
		(locations = [{ text: "Lorem Location", spaces: [] }], level = 1) => {
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
						{renderSpaces(location.spaces)}
					</Collapse>
				</Box>
			));
		},
		[expanded, handleExpand, renderSpaces, theme.palette.primary.main]
	);

	// Função para renderizar as facilities
	const renderFacilities = useCallback(
		(facilities) => {
			return facilities
				.filter((facility) =>
					facility.name.toLowerCase().includes(search.toLowerCase())
				)
				.map((facility, index) => (
					<Box key={index} sx={{ padding: 1 }}>
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
								borderBottomRightRadius: expanded[facility.name]
									? 0
									: "8px",
								borderBottomLeftRadius: expanded[facility.name]
									? 0
									: "8px",
								color: expanded[facility.name]
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
								onClick={() => handleFacilityClick(facility)}
							>
								{expanded[facility.name] ? (
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
								<ListItemText primary={facility.name} />
							</Button>
						</Box>
						<Collapse
							in={expanded[facility.name]}
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
		},
		[
			expanded,
			handleFacilityClick,
			renderLocations,
			search,
			theme.palette.primary.main,
		]
	);

	return (
		<Box
			sx={{
				paddingInline: "16px",
				borderRadius: "8px",
				overflow: "hidden",
			}}
		>
			<Box
				onClick={toggleDropdown}
				sx={{
					height: "100%",
					display: "flex",
					alignItems: "center",
					gap: "8px",
					paddingBlock: "13px",
					cursor: "pointer",
					backgroundColor: "transparent",
				}}
			>
				<Typography
					variant="body1"
					sx={{
						ml: 1,
						color: open ? theme.palette.primary.main : "inherit",
						fontWeight: 700,
					}}
				>
					{currentFacility}
				</Typography>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "8px",
						width: "40px",
						height: "40px",
						transition: "transform 0.3s ease",
						transform: open ? "rotate(90deg)" : "rotate(0deg)",
						color: open ? theme.palette.primary.main : "inherit",
					}}
				>
					<ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
				</Box>
			</Box>
			<DropdownBoxContainer open={open}>
				<Box sx={{ padding: theme.spacing(1) }}>
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

				{renderFacilities(buildings)}
			</DropdownBoxContainer>
		</Box>
	);
}

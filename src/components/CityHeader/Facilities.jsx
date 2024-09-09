import React, { useState, useCallback } from "react";
import {
	Box,
	useTheme,
	Typography,
	TextField,
	InputAdornment,
	Button,
} from "@mui/material";
import {
	Search as SearchIcon,
	ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import DropdownBoxContainer from "../../styledComponents/Dropdown";

// Mock data
const mockFacilities = [
	{
		id: 1,
		name: "Facility 1",
		location: { latitude: 25.197197, longitude: 55.274376 },
		description: "Description for Facility 1",
	},
	{
		id: 2,
		name: "Facility 2",
		location: { latitude: 25.198197, longitude: 55.275376 },
		description: "Description for Facility 2",
	},
	{
		id: 3,
		name: "Facility 3",
		location: { latitude: 25.199197, longitude: 55.276376 },
		description: "Description for Facility 3",
	},
	{
		id: 4,
		name: "Facility 4",
		location: { latitude: 25.200197, longitude: 55.277376 },
		description: "Description for Facility 4",
	},
];

export default function Facilities({
	open,
	toggleDropdown,
	onBuildingSelect, // Função que move a câmera
	handleMarkerClick,
}) {
	const theme = useTheme();
	const [search, setSearch] = useState("");
	const [activeFacility, setActiveFacility] = useState(null);
	const [currentFacility, setCurrentFacility] = useState("Facilities");

	const handleSearchChange = useCallback((event) => {
		setSearch(event.target.value);
	}, []);

	const handleItemClick = (facility) => {
		setCurrentFacility(facility.name);
		setActiveFacility(facility.name);

		// Chama a função para mover a câmera para a localização da instalação
		if (onBuildingSelect && facility.location) {
			onBuildingSelect([
				facility.location.longitude,
				facility.location.latitude,
			]);
		}

		// Chama a função de clicar no marcador
		if (handleMarkerClick) {
			handleMarkerClick(facility);
		}
	};

	const renderFacilities = useCallback(
		(facilities) => {
			return facilities
				.filter((facility) =>
					facility.name.toLowerCase().includes(search.toLowerCase())
				)
				.map((facility) => (
					<Box key={facility.id} sx={{ padding: 1 }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 1,
								cursor: "pointer",
								padding: theme.spacing(1),
								backgroundColor:
									activeFacility === facility.name
										? "#E0E0E0"
										: "#F4F2FF",
								borderRadius: "8px",
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
								onClick={() => handleItemClick(facility)}
							>
								<Typography variant="body2">
									{facility.name}
								</Typography>
							</Button>
						</Box>
					</Box>
				));
		},
		[activeFacility, search, theme.spacing]
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
				<Box
					sx={{
						overflowY: "auto",
						"&::-webkit-scrollbar": {
							width: "8px",
							paddingBottom: "8px",
						},
						"&::-webkit-scrollbar-track": {
							backgroundColor: "#F4F2FF",
						},
						"&::-webkit-scrollbar-thumb": {
							backgroundColor: "#BEAEFF",
							borderRadius: "8px",
						},
						"&::-webkit-scrollbar-thumb:hover": {
							backgroundColor: theme.palette.primary.dark,
						},
						"&::-webkit-scrollbar-corner": {
							backgroundColor: "#F4F2FF",
						},
					}}
				>
					{renderFacilities(mockFacilities)}
				</Box>
			</DropdownBoxContainer>
		</Box>
	);
}

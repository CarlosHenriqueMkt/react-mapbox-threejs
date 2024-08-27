import React, { useEffect, useState, useCallback } from "react";
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
import { buildings } from "../../data/buildings"; // Usando o array buildings

export default function Facilities({
	open,
	toggleDropdown,
	onBuildingSelect,
	onPopupSet,
}) {
	const theme = useTheme();
	const [search, setSearch] = useState("");
	const [activeFacility, setActiveFacility] = useState(null); // Novo estado para o botão ativo
	const [currentFacility, setCurrentFacility] = useState("Facilities");
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/dubai") {
			setCurrentFacility("Facilities");
			setActiveFacility(null); // Reseta o estado do botão ativo
		}
	}, [location.pathname]);

	const handleSearchChange = useCallback((event) => {
		setSearch(event.target.value);
	}, []);

	const handleFacilityClick = (building) => {
		setCurrentFacility(building.name);
		setActiveFacility(building.name); // Define o botão como ativo

		moveCamera(building.coordinates).then(() => {
			requestAnimationFrame(() => {
				// Lógica adicional se necessário
			});
		});
	};

	const moveCamera = (coordinates) => {
		return new Promise((resolve) => {
			onBuildingSelect(coordinates);
			setTimeout(resolve, 300); // Ajuste o tempo conforme necessário
		});
	};

	const handleItemClick = (coordinates, popupData) => {
		moveCamera(coordinates).then(() => {
			if (onPopupSet) {
				onPopupSet(popupData);
			}
		});
	};

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
								onClick={() =>
									handleItemClick(
										facility.coordinates,
										facility.popupData
									)
								}
							>
								<Typography variant="body2">
									{facility.name}
								</Typography>
							</Button>
						</Box>
					</Box>
				));
		},
		[activeFacility, handleFacilityClick, search, theme.spacing]
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

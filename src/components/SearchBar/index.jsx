import React, { useState, useCallback, useMemo } from "react";
import {
	Box,
	IconButton,
	InputBase,
	List,
	ListItemButton,
	Typography,
	useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";

export default function SearchBar({
	onBuildingSelect,
	markersData,
	setDrawerOpen,
	setSelectedFacilityData,
}) {
	const theme = useTheme();
	const [searchText, setSearchText] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);

	const handleInputChange = useCallback((event) => {
		setSearchText(event.target.value);
	}, []);

	const handleClearSearch = useCallback(() => {
		setSearchText("");
	}, []);

	const handleToggleExpand = useCallback(() => {
		setIsExpanded((prev) => !prev);
	}, []);

	const filteredBuildings = useMemo(() => {
		if (!searchText) return [];
		const lowercasedFilter = searchText.toLowerCase();
		return markersData.filter((facility) =>
			facility.name.toLowerCase().includes(lowercasedFilter)
		);
	}, [searchText, markersData]);

	const handleItemClick = (facility) => {
		// Seleciona a instalação e move a câmera para o local
		onBuildingSelect(facility.coordinates);
		// Define a instalação selecionada e abre o Drawer
		setSelectedFacilityData(facility);
		setDrawerOpen(true);
	};

	return (
		<Box sx={{ position: "relative", width: "100%" }}>
			<Box
				sx={{
					position: "relative",
					width: isExpanded ? "300px" : "40px",
					transition: "width 0.3s ease-in-out",
					marginRight: 2,
					display: "flex",
					alignItems: "center",
					backgroundColor: "#f1f1f1",
					borderRadius: "20px",
					padding: "5px 10px",
				}}
			>
				<IconButton
					onClick={handleToggleExpand}
					sx={{ color: "gray", padding: 0, zIndex: 999 }}
				>
					<SearchIcon />
				</IconButton>
				{isExpanded && (
					<Box
						sx={{
							marginLeft: "10px",
							width: "100%",
							display: "flex",
							alignItems: "center",
						}}
					>
						<InputBase
							placeholder="Search"
							value={searchText}
							onChange={handleInputChange}
							sx={{
								width: "100%",
								paddingLeft: 1,
								paddingRight: 1,
							}}
						/>
						{searchText && (
							<IconButton
								onClick={handleClearSearch}
								sx={{ color: "gray", padding: 0 }}
							>
								<CancelIcon />
							</IconButton>
						)}
					</Box>
				)}
			</Box>
			{filteredBuildings.length > 0 && (
				<Box
					sx={{
						position: "absolute",
						top: "60px",
						left: 0,
						width: "300px",
						maxHeight: 300,
						overflow: "auto",
						backgroundColor: "white",
						boxShadow: 3,
						borderRadius: "8px",
						padding: "10px",
						"&::-webkit-scrollbar": {
							width: "8px",
						},
						"&::-webkit-scrollbar-track": {
							backgroundColor: theme.palette.background.default,
							borderRadius: "8px",
						},
						"&::-webkit-scrollbar-thumb": {
							backgroundColor: theme.palette.primary.main,
							borderRadius: "8px",
						},
						"&::-webkit-scrollbar-thumb:hover": {
							backgroundColor: theme.palette.primary.dark,
						},
					}}
				>
					<List>
						{filteredBuildings.map((facility) => (
							<ListItemButton
								key={facility.id}
								onClick={() => handleItemClick(facility)}
							>
								<Typography variant="body1">
									{facility.name}
								</Typography>
							</ListItemButton>
						))}
					</List>
				</Box>
			)}
		</Box>
	);
}

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
import { buildings } from "../../data/buildings";

export default function SearchBar({ onBuildingSelect }) {
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
		return buildings.filter((building) =>
			building.name.toLowerCase().includes(lowercasedFilter)
		);
	}, [searchText]);

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
						{filteredBuildings.map((building) => (
							<ListItemButton
								key={building.id}
								onClick={() => {
									console.log("Clicked:", building.name);
									onBuildingSelect(building.coordinates);
								}}
							>
								<Typography variant="body1">
									{building.name}
								</Typography>
							</ListItemButton>
						))}
					</List>
				</Box>
			)}
		</Box>
	);
}

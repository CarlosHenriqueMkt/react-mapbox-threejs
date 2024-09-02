import React, { useEffect, useState, useCallback } from "react";
import {
	Box,
	useTheme,
	Typography,
	TextField,
	InputAdornment,
	Button,
	CircularProgress,
} from "@mui/material";
import {
	Search as SearchIcon,
	ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import DropdownBoxContainer from "../../styledComponents/Dropdown";
import { fetchFacilities } from "../../api/fetchFacilities";

export default function Facilities({
	open,
	toggleDropdown,
	onBuildingSelect,
	handleMarkerClick,
}) {
	const theme = useTheme();
	const [search, setSearch] = useState("");
	const [activeFacility, setActiveFacility] = useState(null);
	const [currentFacility, setCurrentFacility] = useState("Facilities");
	const [markersData, setMarkersData] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const location = useLocation();

	const loadMoreFacilities = async () => {
		setLoading(true);
		const newFacilities = await fetchFacilities(page);
		if (newFacilities.length > 0) {
			const processedFacilities = newFacilities.map((facility) => ({
				...facility,
				coordinates: facility.location
					? [facility.location.longitude, facility.location.latitude]
					: [0, 0],
			}));
			setMarkersData((prev) => [...prev, ...processedFacilities]);
			setPage((prevPage) => prevPage + 1);
		} else {
			setHasMore(false);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (location.pathname === "/dubai") {
			setCurrentFacility("Facilities");
			setActiveFacility(null);
		}
	}, [location.pathname]);

	useEffect(() => {
		loadMoreFacilities();
	}, []);

	const handleSearchChange = useCallback((event) => {
		setSearch(event.target.value);
	}, []);

	const handleItemClick = (facility) => {
		setCurrentFacility(facility.name);
		setActiveFacility(facility.name);
		onBuildingSelect(facility.coordinates);

		handleMarkerClick(facility);
	};

	const handleScroll = (event) => {
		const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
		if (scrollHeight - scrollTop === clientHeight && !loading && hasMore) {
			loadMoreFacilities();
		}
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
					onScroll={handleScroll}
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
					{renderFacilities(markersData)}
					{loading && (
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<CircularProgress size={24} />
						</Box>
					)}
				</Box>
			</DropdownBoxContainer>
		</Box>
	);
}

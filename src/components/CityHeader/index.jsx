import React, { useState, useCallback, useMemo } from "react";
import {
	Box,
	IconButton,
	Toolbar,
	Avatar,
	Typography,
	Link,
	Menu,
	MenuItem,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowDropDown, NotificationsOutlined } from "@mui/icons-material";
import SearchBar from "../SearchBar";
import Viewer from "./Viewer";
import Facilities from "./Facilities";
import FacilityDropdown from "../FacilityDropdown";
import SolutionsScenarios from "./SolutionsScenarios";
import ToggleHandler from "../ToggleHandler";

export default function CityHeader({
	moveCameraToCoordinates,
	setPopup,
	drawerOpen,
	markersData,
	handleMarkerClick,
	setDrawerOpen,
	setSelectedFacilityData,
}) {
	const [openDropdown, setOpenDropdown] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();

	const handleToggleDropdown = useCallback((key) => {
		setOpenDropdown((prev) => (prev === key ? null : key));
	}, []);

	// Verificação para determinar se a URL tem um ID específico
	const hasFacilityId = useMemo(() => {
		const match = location.pathname.match(/\/dubai\/([^/]+)$/);
		return match ? match[1] : null;
	}, [location.pathname]);

	const renderButtons = useMemo(() => {
		if (location.pathname.startsWith("/dubai")) {
			return hasFacilityId ? (
				<SolutionsScenarios
					open={openDropdown === "solutions"}
					toggleDropdown={() => handleToggleDropdown("solutions")}
				/>
			) : (
				<ToggleHandler />
			);
		}
		return null;
	}, [location.pathname, openDropdown, handleToggleDropdown, hasFacilityId]);

	const handleBuildingSelect = (coordinates) => {
		if (
			moveCameraToCoordinates &&
			typeof moveCameraToCoordinates.current === "function"
		) {
			moveCameraToCoordinates.current(coordinates);
		} else {
			console.error(
				"moveCameraToCoordinates.current is not defined or is not a function"
			);
			setPopup(coordinates); // Caso não funcione a câmera, apenas exibe o popup
		}
	};

	const handleDropdownClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleDropdownClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		sessionStorage.clear();

		navigate("/");

		handleDropdownClose();
	};

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				alignItem: "center",
				justifyContent: "center",
				padding: 2,
			}}
		>
			<Box
				sx={{
					backgroundColor: "white",
					boxShadow: 3,
					width: "100%",
					height: "80px",
					borderRadius: "16px",
				}}
			>
				<Toolbar
					sx={{
						height: "100%",
						justifyContent: "space-between",
						padding: 2,
					}}
					disableGutters
				>
					<Box display="flex" alignItems="center" gap="16px">
						<Viewer />
						<Link href="/dubai">
							<Box
								component="img"
								src="/logo.png"
								alt="VirtuX Logo"
								sx={{ height: 30, marginRight: 2 }}
							/>
						</Link>

						{/* Renderização condicional de Facilities ou Facility */}
						{hasFacilityId ? (
							<FacilityDropdown
								id={hasFacilityId}
								open={openDropdown === "facilities"}
								toggleDropdown={() =>
									handleToggleDropdown("facilities")
								}
							/>
						) : (
							<Facilities
								open={openDropdown === "facilities"}
								toggleDropdown={() =>
									handleToggleDropdown("facilities")
								}
								onBuildingSelect={handleBuildingSelect}
								drawerOpen={drawerOpen}
								setDrawerOpen={setDrawerOpen}
								setSelectedFacilityData={
									setSelectedFacilityData
								}
								setPopup={setPopup}
								markersData={markersData}
								handleMarkerClick={handleMarkerClick}
							/>
						)}
						{renderButtons}
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 3,
							marginRight: 2,
						}}
					>
						{/* Renderização condicional de SearchBar */}
						{!hasFacilityId && (
							<SearchBar
								markersData={markersData}
								setDrawerOpen={setDrawerOpen}
								setSelectedFacilityData={
									setSelectedFacilityData
								}
								onBuildingSelect={handleBuildingSelect}
							/>
						)}
						<IconButton>
							<NotificationsOutlined />
						</IconButton>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: 1,
								marginLeft: 2,
							}}
						>
							<Avatar
								alt="User Avatar"
								src="/avatar.png"
								sx={{ marginRight: 1 }}
							/>
							<Box
								sx={{
									width: "max-content",
									display: "flex",
									flexDirection: "column",
								}}
							>
								<Typography variant="body2">
									Azunyan U. Wu
								</Typography>
								<Typography
									variant="caption"
									color="textSecondary"
								>
									Basic Member
								</Typography>
							</Box>
							<IconButton onClick={handleDropdownClick}>
								<ArrowDropDown />
							</IconButton>
							<Menu
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={handleDropdownClose}
							>
								<MenuItem onClick={handleLogout}>
									Log Out
								</MenuItem>
							</Menu>
						</Box>
					</Box>
				</Toolbar>
			</Box>
		</Box>
	);
}
